"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
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

  // even if new snippet is created it will look like due to generateStaticParams, but it is not b'coz we revalidated this path -> /snippet/[id]
  revalidatePath(`/snippet/${id}`);
  redirect(`/snippet/${id}`);
}

export const deleteSnippet = async (id: number) => {
  await prisma.snippet.delete({
    where: {
      id,
    },
  });

  revalidatePath("/"); // I want to revalidate this path (clear old cache) -> '/' when a snippet get deleted
  redirect("/");
};

// visit useActionState.md
// server actions -> are asynchronous functions
export async function createSnippet(
  prevState: { message: string },
  formData: FormData
) {
  // "use server"; // 'use server' directive for server actions (runs only on server)

  try {
    const title = formData.get("title");
    const code = formData.get("code");

    if (typeof title !== "string" || title.trim() === "") {
      return { message: "Title is required" };
    }
    if (typeof code !== "string" || code.trim() === "") {
      return { message: "Code is required" };
    }

    await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });

    // Simulating an error
    // throw new Error("Something went wrong");

    revalidatePath("/"); // revalidate this path (home route) or clear old cache when a new snippet got created
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { message: error.message };
    } else {
      return { message: "Internal server error" };
    }
  }

  // redirect will be outside try and catch block to work
  redirect("/"); // only works with SSR or at server side
}
