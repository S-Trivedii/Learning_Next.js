"use server";

import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

export async function saveSnippet(id: number, code: string) {
  await prisma.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });

  redirect(`/snippet/${id}`);
}

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: {
      id,
    },
  });

  redirect("/");
};

// visit useActionState.md
// server actions -> are asynchronous functions
export async function createSnippet(
  prevState: { message: string },
  formData: FormData
) {
  // "use server"; // 'use server' directive for server actions (runs only on server)

  const title = formData.get("title");
  const code = formData.get("code");

  if (typeof title !== "string" || title.trim() === "") {
    return { message: "Title is required" };
  }
  if (typeof code !== "string" || code.trim() === "") {
    return { message: "Code is required" };
  }

  const snippet = await prisma.snippet.create({
    data: {
      title,
      code,
    },
  });

  redirect("/"); // only works with SSR or at server side
}
