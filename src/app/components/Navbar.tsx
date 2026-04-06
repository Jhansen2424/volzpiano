"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const topLinks = [
  { href: "/teaching-positions", label: "Teaching Positions" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/digital-piano-deal", label: "Digital Piano Deal" },
  { href: "/student-portal", label: "Student Portal" },
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
    <nav className="fixed top-0 left-0 z-40 w-full backdrop-blur-md border-b border-white/10" style={{ background: "linear-gradient(135deg, rgba(26,16,53,0.9) 0%, rgba(45,27,105,0.9) 50%, rgba(99,67,212,0.9) 100%)" }}>
      <div className="mx-auto flex max-w-[90rem] items-center px-4 py-4 lg:px-8">
        {/* Logo — fixed width so center nav is truly centered */}
        <Link href="/" className="shrink-0 text-xl font-extrabold tracking-tight text-white mr-8">
          Volz<span className="text-orange-brand">Piano</span>
        </Link>

        {/* Desktop links — centered */}
        <div className="hidden flex-1 items-center justify-center gap-5 lg:gap-6 lg:flex">
          {/* Home */}
          <Link
            href="/"
            className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
              pathname === "/" ? "text-brand" : "text-white/70 hover:text-white"
            }`}
          >
            Home
          </Link>

          {/* Volz Method dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1.5 whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                isVolzActive ? "text-brand" : "text-white/70 hover:text-white"
              }`}
            >
              Volz Method
              <svg
                className={`h-3 w-3 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-3 w-48 rounded-xl border border-white/10 backdrop-blur-md py-2 shadow-xl" style={{ background: "linear-gradient(135deg, rgba(26,16,53,0.97) 0%, rgba(45,27,105,0.97) 100%)" }}>
                {volzMethodLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setDropdownOpen(false)}
                    className={`block px-4 py-2.5 text-sm font-medium transition-colors duration-150 ${
                      pathname === link.href
                        ? "text-brand bg-white/5"
                        : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {topLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-xs font-semibold uppercase tracking-wider transition-colors duration-200 ${
                pathname === link.href
                  ? "text-brand"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA — right side */}
        <Link
          href="/schedule-call"
          className="hidden shrink-0 rounded-full bg-cta ml-8 px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-all duration-200 hover:bg-cta-hover hover:-translate-y-0.5 lg:inline-flex"
        >
          Schedule a Call
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="ml-auto lg:hidden text-white"
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
        <div className="border-t border-white/10 px-6 pb-6 pt-4 lg:hidden" style={{ background: "linear-gradient(135deg, rgba(26,16,53,0.97) 0%, rgba(45,27,105,0.97) 50%, rgba(99,67,212,0.97) 100%)" }}>
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              onClick={() => setMenuOpen(false)}
              className={`text-sm font-semibold uppercase tracking-wider ${
                pathname === "/" ? "text-brand" : "text-white/70"
              }`}
            >
              Home
            </Link>
            <span className="text-xs font-bold uppercase tracking-widest text-white/40 mt-2">
              Volz Method
            </span>
            {volzMethodLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`pl-3 text-sm font-semibold uppercase tracking-wider ${
                  pathname === link.href ? "text-brand" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            {topLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-semibold uppercase tracking-wider ${
                  pathname === link.href ? "text-brand" : "text-white/70"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/schedule-call"
              onClick={() => setMenuOpen(false)}
              className="mt-2 inline-block rounded-full bg-cta px-6 py-2.5 text-center text-sm font-bold text-white"
            >
              Schedule a Call
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
