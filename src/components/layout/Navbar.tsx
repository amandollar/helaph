"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/projects", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/#contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.body.style.overflow = isMobileMenuOpen ? "hidden" : "";
    }
    return () => {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "";
      }
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* PERSISTENT CTA - Fixed at Top Right */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 right-0 z-[60] p-6 sm:p-8 lg:px-16 lg:py-8 pointer-events-none"
      >
        <Link
          href="/#contact"
          className="inline-flex items-center gap-2.5 bg-accent text-white text-[14px] lg:text-[16px] font-semibold tracking-[0.06em] px-8 py-4 rounded-[2px] border border-accent hover:bg-[#e85a35] hover:border-[#e85a35] pointer-events-auto transition-colors duration-200 group"
        >
          <span>Start your project</span>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-transform duration-200 group-hover:translate-x-[2px]"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </motion.div>

      {/* MAIN NAV - Scrolling with header */}
      <motion.nav
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="absolute top-0 left-0 w-full z-50 py-8 px-6 sm:px-8 lg:px-16"
      >
        <div className="w-full grid grid-cols-3 items-center">
          {/* Logo - LEFT */}
          <div className="flex justify-start">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-white font-bold text-lg tracking-tight uppercase">
                helaph
              </span>
            </Link>
          </div>

          {/* Nav Links - CENTER */}
          <div className="flex justify-center flex-1">
            <ul className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[12px] font-medium tracking-[0.2em] uppercase text-text-secondary hover:text-text-primary transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side - Hamburger (Mobile) */}
          <div className="flex justify-end pr-32 md:pr-0">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center group pointer-events-auto"
              aria-label="Toggle menu"
            >
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-5 rotate-45 translate-y-2" : "w-5"}`}
              />
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "opacity-0 w-0" : "w-4"}`}
              />
              <span
                className={`block h-0.5 bg-white rounded-full transition-all duration-300 ${isMobileMenuOpen ? "w-5 -rotate-45 -translate-y-2" : "w-5"}`}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[70] bg-[#080809] flex flex-col"
          >
            <div className="p-8 flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center text-white font-black">
                  h
                </div>
                <span className="text-white font-bold text-lg uppercase">
                  helaph
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18 18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <nav className="flex-1 flex flex-col justify-center px-8 gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-[42px] font-light text-text-primary hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="p-8">
              <Link
                href="#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2.5 bg-accent text-white text-[16px] font-semibold tracking-[0.06em] w-full py-5 rounded-[2px] border border-accent hover:bg-[#e85a35] hover:border-[#e85a35] transition-colors duration-200 group"
              >
                <span>Start your project</span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200 group-hover:translate-x-[2px]"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
