import Image from "next/image";

// This is root route  - '/'

export default function Home() {
  return (
    <div className="relative h-screen w-screen">
      <Image src="/129780.jpg" alt="AI" fill className="object-cover" />
    </div>
  );
}

/*

1. If image is inside public folder, then use image the way it is used above. But if image is inside
src/assests then you have to first import the image, then use it.

2. Only the folder which are inside src/app will act as route e.g. /performance, /reliability, /scalibility

*/
