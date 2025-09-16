"use client"; // useActionState only works on client side

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { useActionState } from "react";
import * as actions from "@/actions";

const CreateSnippetPage = () => {
  // visit useActionState.md
  const [formStateData, formAction] = useActionState(actions.createSnippet, {
    message: "",
  });

  return (
    <form action={formAction}>
      <div className="mb-2">
        <Label>Title:</Label>
        <Input type="text" name="title" id="title" />
      </div>

      <div>
        <Label>Code:</Label>
        <Textarea name="code" id="code" />
      </div>

      {formStateData.message && (
        <div className="p-2 bg-red-300 border-2 border-red-600">
          {formStateData.message}
        </div>
      )}

      <Button className="bg-black text-white my-4" type="submit">
        New
      </Button>
    </form>
  );
};

export default CreateSnippetPage;

/*

1. What are server actions and when to use them?
Ans: Server Actions are async functions that run on the server but can be called directly from your 
client components.

They let you perform server-side logic (like database queries, authentication, CRUD, etc.) without 
writing separate API routes. 


*/
