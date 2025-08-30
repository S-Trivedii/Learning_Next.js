import Link from "next/link";

const Navbar = () => {
  return (
    <div className="z-50">
      <nav className="container mx-auto flex justify-between items-center h-14 px-6">
        <Link href="/">
          <div className="text-2xl font-bold">Home</div>{" "}
        </Link>
        <div className="flex gap-4">
          <Link href="/performance">Performance</Link>
          <Link href="/reliability">Reliability</Link>
          <Link href="/scalibility">Scalibility</Link>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
