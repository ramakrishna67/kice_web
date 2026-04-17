"use client";

import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Facebook,
  Instagram,
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-5 md:grid-cols-3 justify-between mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold mb-4">KICE</h3>
            <p className="text-white/80 mb-6">
              Transforming careers through quality education <br /> and expert
              coaching.
            </p>
            <div className="flex gap-4">
              <button className="hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </button>
              <button className="hover:text-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  Our Trainers
                </button>
              </li>
              {/* <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  Programs
                </button>
              </li>
              <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  Blog
                </button>
              </li> */}
            </ul>
          </div>

          {/* Programs */}
          {/* <div>
            <h4 className="font-semibold mb-4 text-lg">Programs</h4>
            <ul className="space-y-2">
              <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  Leadership Training
                </button>
              </li>
              <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  Digital Marketing
                </button>
              </li>
              <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  Tech Skills
                </button>
              </li>
              <li>
                <button className="text-white/80 hover:text-accent transition-colors">
                  Personal Development
                </button>
              </li>
            </ul>
          </div> */}

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white/80">
                <Phone className="w-4 h-4 shrink-0" />
                <span>+91 9849702533</span>
              </div>
              <div className="flex items-center gap-2 text-white/80">
                <Mail className="w-4 h-4 shrink-0" />
                <a
                  href="mailto:kiceengineeringacademy@gmail.com"
                  className="hover:text-accent transition-colors"
                >
                  kiceengineeringacademy@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2 text-white/80">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>
                  PM Palem Last Bus Stop,
                  <br />
                  Visakhapatnam, Andhra Pradesh
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/60 text-sm">
              © {currentYear} KICE. All rights reserved.
            </p>
            {/* <div className="flex gap-6 text-sm">
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="#"
                className="text-white/60 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
}
