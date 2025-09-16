# Understanding `useActionState` in Next.js with Example

React 18 introduced a new hook called **`useActionState`**, which integrates beautifully with **Next.js Server Actions**.  
This hook simplifies form handling by managing:

- **State** (what the server action returns)
- **Loading state** (`isPending`)
- **Form submission logic**

---

## 📌 Basic Syntax

```tsx
const [state, action, isPending] = useActionState(
  serverActionFunction,
  initialState
);
```

- state → The current state returned from the server action.
- action → A wrapped function used in <form action={...}>.
- isPending → Boolean that is true while the action runs.

📌 Example Code

## Client Component (TodoForm.tsx)

```tsx
"use client";

import { useActionState } from "react";
import { createTodo } from "@/app/actions"; // server action

export default function TodoForm() {
  const [state, formAction, isPending] = useActionState(createTodo, {
    message: "",
  });

  return (
    <form action={formAction} className="flex gap-2">
      <input
        type="text"
        name="title"
        placeholder="Enter todo"
        className="border p-2"
      />
      <button type="submit" disabled={isPending}>
        {isPending ? "Adding..." : "Add"}
      </button>

      {state.message && <p>{state.message}</p>}
    </form>
  );
}
```

## Server Action (app/actions.ts)

```tsx
"use server";

export async function createTodo(prevState: any, formData: FormData) {
  const title = formData.get("title") as string;

  if (!title) {
    return { message: "Title is required!" };
  }

  await new Promise((r) => setTimeout(r, 1000)); // simulate DB save

  return { message: `Todo "${title}" created!` };
}
```

## 📌 How It Works (Step by Step)

**1. Initial render**

- state = { message: "" } (from initialState)
- isPending = false

**2. Form submission**

- <form action={formAction}> automatically sends inputs as FormData.
- Server action runs:

```ts
createTodo(prevState, formData);
```

**3. During execution**

- isPending = true
- Button is disabled → user cannot double-submit

**4. After execution**

- Whatever createTodo returns replaces state.
- isPending = false

---

## Let's learn about `prevState` in `useActionState`

When the form is submitted **for the first time**, the `prevState` is equal to the **initial state** you provided to `useActionState`

Here:

- prevState = { message: "" } (on the very first submission)
- formData = contains the values of the form fields (e.g., { title: "coffee" })

**🔹 Key Takeaways**

- **_First submission:_** `prevState = initial state` (the value you set in useActionState).
- **_Every submission after that:_** `prevState = whatever the server action returned last time`.
- The server action always returns the `next state`, which becomes the new prevState for the following submission.
- **Remember** what useActionState hook is rendering is the current state not prevState

---

## Does each server action have `formData` as parameter?

Yes, if used with a form (<form action={serverAction}>) → it always receives (prevState, formData).
