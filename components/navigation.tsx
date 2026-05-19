"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, LogOut, LogIn } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/contexts/auth-context";

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout } = useAuth();

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      if (window.scrollY < 100) {
        if (window.location.hash) {
          window.history.replaceState(null, "", window.location.pathname);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
            const id = entry.target.getAttribute("id");
            if (id) {
              if (id === "cta" || id === "footer") {
                window.history.replaceState(null, "", window.location.pathname);
              } else {
                window.history.replaceState(null, "", `#${id}`);
              }
            }
          }
        });
      },
      { threshold: 0.5 },
    );

    const sections = document.querySelectorAll("section[id], footer[id]");
    sections.forEach((section) => observer.observe(section));

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sections.forEach((section) => observer.unobserve(section));
    };
  }, [pathname]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (href.startsWith("/#") && pathname === "/") {
      e.preventDefault();
      let id = href.replace("/#", "");
      if (id === "") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        window.history.pushState(null, "", window.location.pathname);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          window.history.pushState(null, "", `#${id}`);
        }
      }
      setIsOpen(false);
    } else {
      setIsOpen(false);
    }
  };

  const dashboardHref = user?.role === "admin" ? "/admin" : "/student";

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <div className="flex flex-row gap-3">
            <Image
              src="/images/logo.png"
              alt="KICE Logo"
              width={60}
              height={50}
              className="mb-1 height-auto"
            />
            <div className="flex flex-col gap-0 pt-4 md:pt-0 leading-tight">
              <Link
                href="/"
                className="sm:text-3xl text-md font-bold text-primary"
              >
                KICE ENGINEERING ACADEMY
              </Link>
              <p className="text-xs sm:text-sm m-0">
                KATTA INSTITUTE OF COMPETITIVE EXAMINATIONS
              </p>
            </div>
          </div>

          <div className="hidden md:flex gap-8 items-center">
            <Link
              href="/#about"
              onClick={(e) => handleLinkClick(e, "/#about")}
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/#testimonials"
              onClick={(e) => handleLinkClick(e, "/#testimonials")}
              className="text-foreground hover:text-primary transition-colors font-medium cursor-pointer"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              onClick={(e) => handleLinkClick(e, "/contact")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
                >
                  Dashboard
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-1.5 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-6 py-2 bg-accent text-accent-foreground rounded-lg hover:opacity-90 transition-opacity font-medium cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>

          {/*
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? (
            <X className="w-6 h-6 text-foreground cursor-pointer" />
          ) : (
            <Menu className="w-6 h-6 text-foreground cursor-pointer" />
          )}
        </button>

        {isOpen && (
          <div className="md:hidden pb-4 flex flex-col gap-4">
            <Link
              href="/#about"
              onClick={(e) => handleLinkClick(e, "/#about")}
              className="text-foreground hover:text-primary text-left py-2 cursor-pointer"
            >
              About
            </Link>
            <Link
              href="/#testimonials"
              onClick={(e) => handleLinkClick(e, "/#testimonials")}
              className="text-foreground hover:text-primary text-left py-2 cursor-pointer"
            >
              Testimonials
            </Link>
            <Link
              href="/contact"
              onClick={(e) => handleLinkClick(e, "/contact")}
              className="px-6 py-2 bg-primary text-primary-foreground rounded-lg text-left font-medium cursor-pointer"
            >
              Contact
            </Link>
            {user ? (
              <>
                <Link
                  href={dashboardHref}
                  onClick={() => setIsOpen(false)}
                  className="px-6 py-2 bg-accent text-accent-foreground rounded-lg text-left font-medium cursor-pointer"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => { setIsOpen(false); logout(); }}
                  className="flex items-center gap-1.5 px-6 py-2 text-red-600 hover:bg-red-50 rounded-lg text-left font-medium cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                onClick={() => setIsOpen(false)}
                className="px-6 py-2 bg-accent text-accent-foreground rounded-lg text-left font-medium cursor-pointer"
              >
                Login
              </Link>
            )}
          </div>
        )}
        */}
          <Link
            href="/login"
            className="md:hidden flex items-center gap-1.5 px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium cursor-pointer"
          >
            <div className="items-center justify-center flex flex-col">
              <LogIn />
              Login
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}
