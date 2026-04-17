"use client";

import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Trainers } from "@/components/trainers";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";
import { Footer } from "@/components/footer";
import { Poster } from "@/components/poster";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <Poster />
      <About />
      {/* <Trainers /> */}
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
