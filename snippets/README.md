## Location of useActionState hook notes

- useActionState() hook notes are inside src/app/snippet/[id]/new/useActionState.md

---

# Caching in Next.js

There are two types of routes in next.js

- Static routes
- Dynamic routes

By default all static routes in next.js are **cached**.

### How to find which route is static and which route is dynamic ?

Run this command

```bash
npm run build
```

Next.js prints a routing table. Example:

```bash
Route (app)                              Size     First Load JS
┌ ● /                                   1.2 kB
├ ○ /about                              0.9 kB
├ λ /api/hello                          0 B
```

Legend:

- ● = Static Route (SSG, full route cached) ✅
- ○ = Static Route with ISR (can revalidate) ✅
- λ/f = Dynamic/Server route (SSR, not cached) ❌

This is the easiest way to know which routes are static.

`Oh, by the way caching only happens in production build`

There are 4 types of caching in Next.js

1. Request Memoization
2. Data cache
3. Full route cache
4. Router cache

All static route follow `Full route cache` caching by default.

---

## **🔹 What is Full Route Caching?**

Full route caching means:

- Next.js **stores the entire HTML output of a route** (the fully rendered page).
- On the next request, instead of re-rendering everything, it **serves the cached HTML.**
- This is mostly applied to static routes (SSG).

There are different caching strategies for the `Full Route Cache` itself (time-based, on-demand, disable).

### 🔹 1. Time-based caching (ISR)

- Also called **Incremental Static Regeneration (ISR)**.
- You cache a page for a fixed amount of time, then regenerate it in the background.
- Sites like cricbuzz use this to update there page after a certain interval of time (let say every 20 second) to get the updated data.

```tsx
// app/page.tsx
export const revalidate = 60; // cache for 60s, then refresh

export default async function Page() {
  const res = await fetch("https://api.example.com/data");
  const data = await res.json();
  return <div>{data.message}</div>;
}
```

`export const revalidate = 0` means do not cache at all. The route is regenerated on every request, just like SSR

### 🔹 2. On-demand caching (revalidation API)

- Instead of waiting for a time window, you can manually purge the cache when your data changes.
- Like when you want to show an updated list when every time something got created or when you delete an item you need to show updated list.
- Useful for blogs, e-commerce, CMS-driven sites.

In summary, on-demand caching means:

**“When this event happens (like new content in CMS, product update, or user action), clear the old cache for this path (or tag) and regenerate it.”**

### 🔹 3. Disable caching (Dynamic Rendering)

- Sometimes you don’t want full route cache at all (e.g., dashboards, user-specific pages).

Options to disable:

1. Force dynamic route

```tsx
export const dynamic = "force-dynamic";
```

This will force a route to act as a dynamic route.

---

## **Now a question arises, `Are dynamic routes not cached at all` since they get updated data ?**

And the answer is:

👉 **Dynamic routes in Next.js are cached only if you use SSG/ISR (or App Router fetch default caching). If you use SSR, they are not cached unless you add caching manually.**

---

# What is `generateStaticParams` and how it works?

It’s a special async function you export inside a dynamic route `(e.g. app/blog/[slug]/page.tsx).`

1. During build time, Next.js calls generateStaticParams() to know which dynamic routes to pre-render.
   - If your database has IDs 1, 2, 3, 4, Next.js will pre-build:

```bash
/snippets/1
/snippets/2
/snippets/3
/snippets/4
```

- These pages are stored in the .next folder and served **as cached static HTML.**

2. If you later create a new snippet with ID 5:

- **SSG only** → Next.js does **not automatically pre-build ID 5**.

- Visiting `/snippets/5` would throw a 404, because it wasn’t part of `generateStaticParams()` at build time.

3. **If you want new IDs to work without rebuilding, you need ISR (Incremental Static Regeneration):**

```ts
export const revalidate = 60; // rebuild in background every 60 seconds
```

- Then, the first visit to /snippets/5 will trigger a background build, and afterwards it will be cached for subsequent visits.

**Key takeaway**

- generateStaticParams **pre-renders pages** → cached in Full Route Cache

- For pre-rendered params → served as static pages (fast, SEO-friendly)

- For unknown params → route is still dynamic, or may return 404 if not handled

💡 In short:

`generateStaticParams` = **“pre-render some dynamic pages into static pages”,** but it does **not globally turn the route into fully static**.
