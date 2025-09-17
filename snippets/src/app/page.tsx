import { Button } from "@/components/ui/button";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

// Disable caching
// export const dynamic = "force-dynamic"; // this will force this route ('/' -> home route) to act as a dynamic route. So this route won't be cached and we will get the updated data

// Time based caching (ISR - Incremental static regeneration)
// export const revalidate = 0; // do not cache this route at all. This route is generated on every request, just like SSR

export default async function Home() {
  const snippets = await prisma.snippet.findMany();

  return (
    <div>
      <h1 className="font-bold text-4xl">Home</h1>

      <div className="flex items-center justify-between">
        <h1>Snippets</h1>

        <Link href={"/snippet/new"}>
          <Button className="bg-black text-white">New</Button>
        </Link>
      </div>

      {snippets.map((snippet) => (
        <div
          key={snippet.id}
          className="flex items-center justify-between bg-gray-200 p-2 rounded-md my-2"
        >
          <h1>{snippet.title}</h1>
          <Link href={`/snippet/${snippet.id}`}>
            <Button variant={`link`}>View</Button>
          </Link>
        </div>
      ))}
    </div>
  );
}
