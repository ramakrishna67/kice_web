"use client";

import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-full flex items-center justify-center bg-primary/20 text-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-gray-600 rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-secondary rounded-full mix-blend-multiply filter blur-3xl"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-accent rounded-full mix-blend-multiply filter blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-17 text-center">
        <div className="mb-8">
          <Image
            src="/images/logo.png"
            alt="KICE Logo"
            width={200}
            height={100}
            className="mb-1 height-auto mx-auto"
          />
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight text-balance">
            Transform Your Career With Expert GATE Coaching
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed text-balance">
            Join <b>KICE</b> to Improve Knowledge and Enhance Confidence.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="px-8 py-3 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity text-center"
          >
            Get Started Today
          </Link>
          <button
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Learn More
          </button>
        </div>

        {/* Stats */}
        {/* <div className="mt-16 grid grid-cols-3 gap-8">
          <div>
            <div className="text-3xl md:text-4xl font-bold">5000+</div>
            <p className="text-white/80 mt-2">Students Trained</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">50+</div>
            <p className="text-white/80 mt-2">Expert Trainers</p>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">95%</div>
            <p className="text-white/80 mt-2">Success Rate</p>
          </div>
        </div> */}
      </div>
    </section>
  );
}
