"use client";

import Image from "next/image";

export function Poster() {
  return (
    <>
      <div className="relative w-full h-screen mt-20 hidden md:block">
        <Image
          src="/images/poster.png"
          alt="Hero Background"
          fill
          loading="eager"
          className="object-contain width-auto"
        />
      </div>
      {/* Mobile version  */}
      <div className="relative w-full h-screen md:hidden">
        <Image
          src="/images/poster-2.png"
          alt="Hero Background"
          fill
          loading="eager"
          className="object-contain width-auto"
        />
      </div>
    </>
  );
}
