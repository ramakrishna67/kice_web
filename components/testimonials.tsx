"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
  "/images/ranks.png",
  "/images/1.png",
  "/images/2.png",
  "/images/3.png",
  "/images/4.png",
  "/images/5.png",
];

export function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto slide with pause on hover
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [paused]);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">Success from Our Students</h2>

        {/* Slider */}
        <div
          className="relative w-full h-105 rounded-2xl overflow-hidden "
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-all duration-1000 ${
                index === current
                  ? "opacity-100 scale-100"
                  : "opacity-0 scale-105"
              }`}
            >
              {/* Blurred Background */}
              {/* <Image
                src={img}
                alt="bg"
                fill
                className="object-cover blur-xl scale-110"
              /> */}

              {/* Foreground Image */}
              <div className="absolute inset-0 flex items-center justify-center">
                <Image
                  src={img}
                  alt={`testimonial-${index}`}
                  width={600}
                  height={400}
                  className="object-contain max-h-[90%] rounded-xl width-auto"
                />
              </div>
            </div>
          ))}

          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ChevronLeft />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-md"
          >
            <ChevronRight />
          </button>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 gap-3">
          {images.map((_, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`h-3 rounded-full transition-all duration-300 cursor-pointer ${
                current === index ? "w-8 bg-black" : "w-3 bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
