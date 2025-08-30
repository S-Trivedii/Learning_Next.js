import Image from "next/image";
import React from "react";

const HeroPage = () => {
  return (
    <div>
      <h1>This is the hero page</h1>
      <Image src="/129780.jpg" alt="AI" fill style={{ objectFit: "cover" }} />
    </div>
  );
};

export default HeroPage;
