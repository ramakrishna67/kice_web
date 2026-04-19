"use client";

import Image from "next/image";

export function Poster() {
  return (
    <div className="relative w-full h-screen mt-20">
      <Image
        src="/images/poster.png"
        alt="Hero Background"
        fill
        loading="eager"
        className="object-contain width-auto"
      />
    </div>
  );
}
