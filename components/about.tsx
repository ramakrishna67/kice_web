"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function About() {
  const features = [
    {
      title: "Structured 9 Months Course",
      desc: "Comprehensive curriculum covering all GATE topics with a clear timeline.",
    },
    {
      title: "Detail class notes and synopsis",
      desc: "Detailed class notes and concise synopses for all subjects.",
    },
    {
      title: "PYQs of Past 30+ Years",
      desc: "Extensive collection of previous years' questions for thorough practice.",
    },
    {
      title: "3000+ Practice Questions",
      desc: "Extensive question bank for deep concept clarity.",
    },
    {
      title: "Weekly Tests",
      desc: "Regular assessments track progress.",
    },
    {
      title: "Doubt Clearing Sessions",
      desc: "Dedicated sessions to resolve all your doubts.",
    },
  ];

  return (
    <section id="about" className="py-20 min-h-full bg-white">
      <div className="max-w-7xl mx-auto px-4 mt-18 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-primary">
              About KICE Academy
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              We offer comprehensive coaching programs for Mechanical
              Engineering (ME), Engineering Sciences (XE), and Production
              Engineering (PI), designed to help you succeed in GATE 2027 and
              2028.
            </p>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our classes are conducted in a hybrid format, combining the
              flexibility of online learning with the effectiveness of offline
              sessions held on Sundays and holidays. The batch is scheduled to
              commence tentatively from May 1st, 2026.
            </p>

            {/* <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div> */}
          </div>

          {/* Image Placeholder */}
          <div className="relative bg-linear-to-br from-primary/20 to-accent/20 rounded-2xl h-94 flex items-center justify-center border border-border overflow-hidden">
            {/* <div className="text-center"> */}
            {/* <div className="w-32 h-32 bg-primary/10 rounded-full mx-auto mb-4 flex items-center justify-center"> */}
            <Image
              src="/images/ranks.png"
              alt="Institute"
              fill
              className="object-contain"
            />
            {/* </div> */}
            {/* <p className="text-muted-foreground">Institute Excellence</p> */}
            {/* </div> */}
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center pt-34">
          <h2 className="text-4xl font-bold mb-12 text-primary">
            Highlights of Our GATE Program
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-2xl border border-border bg-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-4 hover:shadow-xl"
              >
                {/* Background Glow */}
                <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition duration-300" />

                {/* Content */}
                <div className="relative z-10 transform transition-all duration-300 group-hover:-translate-y-2">
                  <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
