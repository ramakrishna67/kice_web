"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex flex-col gap-0 leading-tight">
            <Link href="/" className="text-2xl font-bold text-primary">
              KICE
            </Link>
            <p className="text-sm m-0">
              Katta institute of Competitive Examinations
            </p>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/#about"
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/#trainers"
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Trainers
            </Link>
            <Link
              href="/#testimonials"
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link
              href="/#about"
              className="text-foreground hover:text-primary text-left py-2 cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/#trainers"
              className="text-foreground hover:text-primary text-left py-2 cursor-pointer"
            >
              Trainers
            </Link>
            <Link
              href="/#testimonials"
              className="text-foreground hover:text-primary text-left py-2 cursor-pointer"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-left font-medium cursor-pointer"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
