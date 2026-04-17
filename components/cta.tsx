"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="py-20 bg-linear-to-r from-primary to-primary/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl font-bold text-white mb-6">
          Ready to Transform Your Career?
        </h2>
        <p className="text-xl text-white/90 mb-8 leading-relaxed text-balance">
          Join our next batch of students and start your journey. <br />
          Limited seats available!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-accent text-accent-foreground font-semibold rounded-lg hover:opacity-90 transition-opacity"
          >
            Enroll Now
            <ArrowRight className="w-5 h-5" />
          </Link>
          {/* <Link
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-colors"
          >
            Get Free Consultation
          </Link> */}
        </div>
      </div>
    </section>
  );
}
