import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import * as actions from "@/actions";
import { notFound } from "next/navigation";

// Q. Why did we automatically get params in SnippetDetailPage component ? Checkout notes.
const SnippetDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const id = parseInt((await params).id); // I have to await params because it's a promise

  // I have created this promise so that you can understand how loading works. See loading.tsx for more
  await new Promise((r) => setTimeout(r, 2000));

  const snippet = await prisma.snippet.findUnique({
    where: {
      id,
    },
  });

  // if (!snippet) return <h1>Snippet not found</h1>;
  if (!snippet) notFound(); // see notes

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl">{snippet.title}</h1>
        <div className="flex items-center gap-2">
          <Link href={`/snippet/${snippet.id}/edit`}>
            <Button className="bg-black text-white">Edit</Button>
          </Link>

          <form action={deleteSnippetAction}>
            <Button type="submit" className="bg-red-500 text-white">
              Delete
            </Button>
          </form>
        </div>
      </div>
      <pre className="p-3 bg-gray-200 rounded border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export default SnippetDetailPage;
