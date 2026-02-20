"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const topLinks = [
  { href: "/", label: "Home" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
];

const volzMethodLinks = [
  { href: "/volz-method", label: "The Method" },
  { href: "/volz-method/how-it-works", label: "How It Works" },
  { href: "/volz-method/core-values", label: "Core Values" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isVolzActive = pathname.startsWith("/volz-method");

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 z-40 w-full bg-zinc-900/80 backdrop-blur-md border-b border-white/10">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 sm:px-12">
        {/* Logo */}
        <Link href="/" className="text-xl font-extrabold tracking-tight text-white">
          Volz<span className="text-orange-brand">Piano</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 sm:flex">
          {topLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                pathname === link.href
                  ? "text-orange-brand"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Volz Method dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider transition-colors duration-200 ${
                isVolzActive ? "text-orange-brand" : "text-white/70 hover:text-white"
              }`}
            >
              Volz Method
              <svg
                className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-48 rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-md py-2 shadow-xl">
                {volzMethodLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                    className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                      pathname === link.href
                        ? "text-orange-brand bg-white/5"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <a
            href="#schedule"
            className="rounded-full bg-cta px-6 py-2.5 text-sm font-bold text-white transition-all duration-200 hover:bg-cta-hover hover:-translate-y-0.5"
          >
            Schedule a Call
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="sm:hidden text-white"
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-white/10 bg-zinc-900/95 px-6 pb-6 pt-4 sm:hidden">
          <div className="flex flex-col gap-4">
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold uppercase tracking-wider ${
                  pathname === link.href ? "text-orange-brand" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <span className="text-xs font-bold uppercase tracking-widest text-white/40 mt-2">
              Volz Method
            </span>
            {volzMethodLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`pl-3 text-sm font-semibold uppercase tracking-wider ${
                  pathname === link.href ? "text-orange-brand" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="#schedule"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-block rounded-full bg-cta px-6 py-2.5 text-center text-sm font-bold text-white"
            >
              Schedule a Call
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
