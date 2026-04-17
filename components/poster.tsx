"use client";

import Image from "next/image";

export function Poster() {
  return (
    <div className="relative w-full h-screen">
      <Image
        src="/images/poster.png"
        alt="bg"
        fill
        className="object-cover blur-xl scale-100 height-auto"
      />
      <Image
        src="/images/poster.png"
        alt="Hero Background"
        fill
        className="object-contain"
      />
    </div>
  );
}
