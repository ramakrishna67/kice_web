"use client";

import Image from "next/image";

export function Poster() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/poster.png"
        alt="Hero Background"
        fill
        className="object-contain width-auto"
      />
    </div>
  );
}
