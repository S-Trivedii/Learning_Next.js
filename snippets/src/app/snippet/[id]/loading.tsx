const Loading = () => {
  return <div>Loading...</div>;
};

export default Loading;

/*

🔹 What is loading.tsx?

- loading.tsx is a special file in Next.js App Router
- When placed in a route segment (like app/dashboard/loading.tsx), it shows a fallback 
  UI (skeleton, spinner, etc.) while the actual page or layout is loading "server-side data or streaming".

🔹Key points:  

Automatic Suspense: Next.js wraps each route in React Suspense automatically.
Scoped Loading: If you put loading.tsx inside app/dashboard/, it only applies to /dashboard/*.
Global Loading: You can also add one in app/loading.tsx for the entire app.
Streaming: Works great with server components — partial UI can stream while other parts are still fetching.


In short: 

- When a user navigates to a route…
- Next.js immediately shows the loading.tsx UI (skeleton, spinner, text, whatever you design).
- Meanwhile, your page.tsx (or layout) is busy fetching data / rendering on the server.
- As soon as the data is ready, Next.js replaces the loading UI with the real page.
*/
