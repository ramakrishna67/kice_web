"use client";

import { Mail, Linkedin } from "lucide-react";

interface Trainer {
  id: number;
  name: string;
  specialization: string;
  experience: string;
  // bio: string;
  image: string;
}

const trainers: Trainer[] = [
  {
    id: 1,
    name: "Dr. K.G Durga Prasad (PhD)",
    specialization: "Core Subjects",
    experience: "15+ years",
    // bio: "Former Fortune 500 executive with expertise in organizational development and strategic management.",
    image: "👨‍💼",
  },
  {
    id: 2,
    name: "Sahukari Kalyan",
    specialization: "Maths and Aptitude",
    experience: "1 year",
    // bio: "Digital marketing strategist who has scaled multiple startups to unicorn status.",
    image: "👨‍💼",
  },
];

export function Trainers() {
  return (
    <section id="trainers" className="py-40 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Meet Our Trainers
          </h2>
          {/* <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
            Learn from industry-leading professionals with decades of combined
            experience and proven track records.
          </p> */}
        </div>

        <div className="grid md:grid-cols-1 lg:grid-cols-2 gap-8 ml-10">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-white rounded-lg border border-border p-6 hover:shadow-lg transition-shadow"
            >
              {/* Avatar */}
              <div className="text-6xl mb-4">{trainer.image}</div>

              {/* Info */}
              <h3 className="text-xl font-bold text-foreground mb-1">
                {trainer.name}
              </h3>
              <p className="text-primary font-semibold text-sm mb-2">
                {trainer.specialization}
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                {trainer.experience}
              </p>

              {/* Bio */}
              {/* <p className="text-foreground text-sm leading-relaxed mb-6">
                {trainer.bio}
              </p> */}

              {/* Social Links */}
              <div className="flex gap-3">
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Mail className="w-5 h-5 text-primary" />
                </button>
                <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <Linkedin className="w-5 h-5 text-primary" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
