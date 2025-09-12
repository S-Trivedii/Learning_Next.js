import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";

const CreateSnippetPage = () => {
  // server actions -> are asynchronous functions
  async function createSnippet(formData: FormData) {
    "use server"; // 'use server' directive for server actions (runs only on server)

    const title = formData.get("title") as string; // type asserction
    const code = formData.get("code") as string;

    const snippet = await prisma.snippet.create({
      data: {
        title,
        code,
      },
    });

    console.log("Snippet Created", snippet);

    redirect("/"); // only works with SSR or at server side
  }

  return (
    <form action={createSnippet}>
      <div className="mb-2">
        <Label>Title:</Label>
        <Input type="text" name="title" id="title" />
      </div>

      <div>
        <Label>Code:</Label>
        <Textarea name="code" id="code" />
      </div>

      <Button className="bg-black text-white my-4" type="submit">
        New
      </Button>
    </form>
  );
};

export default CreateSnippetPage;

/*

1. What are server actions and when to use them?
Ans: Server Actions are async functions that run on the server but can be called directly from your client components.
They let you perform server-side logic (like database queries, authentication, CRUD, etc.) without writing separate API routes. 


*/
