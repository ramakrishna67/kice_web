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
  const visionPoints = [
    "To provide strong conceptual clarity and deliver high-quality teaching through experienced and dedicated faculty",
    "To integrate offline and online learning for maximum flexibility and effectiveness",
    "To guide and mentor students to achieve top ranks in GATE and other competitive examinations",
    "To enable students to secure placements in Public Sector Undertakings (PSUs) and other esteemed organizations"
  ];
  const missionPoints = [
    "To provide strong conceptual clarity in core engineering subjects",
    "To deliver high-quality teaching through experienced and dedicated faculty",
    "To create a student-centric learning environment that nurtures analytical and problem-solving skills",
    "To integrate offline and online learning for maximum flexibility and effectiveness",
    "To guide and mentor students to achieve top ranks in GATE and other competitive examinations",
    "To enable students to secure placements in Public Sector Undertakings (PSUs) and other esteemed organizations",
    "To instil confidence, discipline, and a passion for continuous learning among students",
  ]

  return (
    <section id="about" className="py-10 min-h-full bg-white">
      <div className="max-w-7xl mx-auto px-4 md:mt-18 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div>
            <h2 className="text-4xl font-bold mb-6 text-primary">
              About KICE
            </h2>
            <div className="text-lg text-muted-foreground mb-6 leading-relaxed text-justify">
              KICE (KICE Engineering Academy), established in 2025, is dedicated
              to imparting high-quality conceptual education for GATE aspirants
              in Mechanical Engineering and allied disciplines. The institute
              focuses on delivering structured, in-depth learning through
              experienced educators who are committed to academic excellence and
              student success. Our programs are carefully designed to build
              strong fundamentals, enhance problem-solving skills, and equip
              students with the right strategies to excel in GATE examinations.
              To ensure flexibility and effectiveness in learning, Offline
              classes are conducted intensively on Sundays and public holidays &
              Online sessions are held on weekdays for continuous engagement and
              practice.
            </div>

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
              src="/images/paper.jpeg"
              alt="Institute"
              fill
              className="object-contain"
            />
            {/* </div> */}
            {/* <p className="text-muted-foreground">Institute Excellence</p> */}
            {/* </div> */}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-10">
          <div className="shadow-lg bg-gray-200 h-72 p-4 rounded-2xl flex flex-col border border-border relative z-10 hover:-translate-y-2 transition-all transform duration-300">
            <h5 className="text-xl font-semibold pb-2 text-primary">
              Our Vision
            </h5>
            <div className="scrollbar-hide overflow-y-auto mb-3 h-full flex-1">
              <p className="text-md text-muted-foreground leading-relaxed text-justify">
                {visionPoints.map((point, index) => (
                  <span key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 text-green-600" />
                    <span>{point}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="shadow-lg bg-gray-200 h-72 p-4 overflow-y-auto scrollbar-hide flex flex-col rounded-2xl border border-border relative z-10 hover:-translate-y-2 transition-all transform duration-300">
            <h5 className="text-xl font-semibold pb-2 text-primary">
              Our Mission
            </h5>
            <div className="overflow-y-auto scrollbar-hide mb-3 flex-1">
              <p className="text-md text-muted-foreground leading-relaxed text-justify">
                {missionPoints.map((point, index) => (
                  <span key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 shrink-0 text-green-600" />
                    <span>{point}</span>
                  </span>
                ))}
              </p>
            </div>
          </div>
          <div className="shadow-lg bg-gray-200 h-72 p-4 rounded-2xl border border-border relative z-10 hover:-translate-y-2 transition-all transform duration-300">
            <h5 className="text-xl font-semibold mb-4 text-primary">
              Courses Offered
            </h5>
            <p className="text-md text-muted-foreground mb-8 leading-relaxed">
              Mechanical Engineering (ME) <br />
              Engineering Sciences (XE) <br />
              Production Engineering (PI)
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 text-center pt-28">
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
