"use client";

import { CheckCircle } from "lucide-react";
import Image from "next/image";

export function About() {
  const features = [
    "Detailed Class Notes & Concise Synopsis for every subject",
    "30+ Years of Previous Year Questions (PYQs) with solutions",
    "3000+ Practice Questions for in-depth preparation",
    "Weekly Quizzes to track your progress",
    "Personalized Guidance & Mentorship throughout your preparation journey",
    "And much more to ensure your success in GATE",
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold text-foreground mb-6">
              About KICE Coaching Center
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

            <div className="space-y-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-accent shrink-0" />
                  <span className="text-foreground font-medium">{feature}</span>
                </div>
              ))}
            </div>
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
      </div>
    </section>
  );
}
