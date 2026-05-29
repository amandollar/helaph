"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const PHONE_NUMBER = "+91 6206103436";
const PHONE_RAW = "+916206103436";

const navLinks = [
  { href: "/projects", label: "Work" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
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

  // Copy phone on desktop, dial on mobile
  const handlePhoneClick = useCallback((e: React.MouseEvent) => {
    const isMobile =
      typeof window !== "undefined" &&
      /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent);
    if (!isMobile) {
      e.preventDefault();
      navigator.clipboard.writeText(PHONE_NUMBER).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
    // On mobile, let the href="tel:..." handle it
  }, []);

  return (
    <>
      {/* MAIN NAV - Fixed */}
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-8 lg:px-12 transition-all duration-300 ${
          isScrolled
            ? "bg-[#080809]/85 backdrop-blur-md py-3"
            : "py-5"
        }`}
      >
        <div className="w-full flex items-center justify-between gap-4">
          {/* Logo + Nav Links - LEFT */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-1.5 group shrink-0">
              <Image
                src="/images/icons/helpah_dark.webp"
                alt="helaph Logo"
                width={28}
                height={28}
                className="object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <span className="text-white font-black text-[20px] tracking-tight uppercase">
                helaph
              </span>
            </Link>

            <ul className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname !== "/" && pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`text-[13px] font-medium tracking-[0.2em] uppercase transition-colors duration-300 relative py-1.5 group ${
                        isActive
                          ? "text-text-primary"
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {link.label}
                      <span
                        className={`absolute bottom-0 left-0 w-full h-[2px] transition-transform duration-300 origin-left ${
                          isActive
                            ? "bg-accent scale-x-100"
                            : "bg-white scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right Side - CTAs + Hamburger */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Phone button - desktop only */}
            <a
              href={`tel:${PHONE_RAW}`}
              onClick={handlePhoneClick}
              title={copied ? "Copied!" : "Call us"}
              className="hidden md:inline-flex items-center gap-2 border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-[14px] font-medium tracking-wide px-4 py-2 rounded-[2px] transition-all duration-200 group relative"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 5.98 5.98l.96-.94a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              <AnimatePresence mode="wait">
                {copied ? (
                  <motion.span
                    key="copied"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                    className="text-green-400"
                  >
                    Copied!
                  </motion.span>
                ) : (
                  <motion.span
                    key="number"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15 }}
                  >
                    {PHONE_NUMBER}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>

            {/* Start your project CTA */}
            <Link
              href="/#contact"
              className="hidden md:inline-flex items-center gap-2 bg-accent text-white text-[14px] font-semibold tracking-[0.06em] px-5 py-2 rounded-[2px] border border-accent hover:bg-[#e85a35] hover:border-[#e85a35] transition-colors duration-200 group"
            >
              <span>Start your project</span>
              <svg
                width="13"
                height="13"
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

            {/* Hamburger - Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden flex flex-col gap-1.5 w-8 h-8 items-center justify-center"
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
            <div className="p-6 flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center gap-1.5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Image
                  src="/images/icons/helpah_dark.webp"
                  alt="helaph Logo"
                  width={28}
                  height={28}
                  className="object-contain"
                />
                <span className="text-white font-black text-lg uppercase">
                  helaph
                </span>
              </Link>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50"
              >
                <svg
                  className="w-5 h-5"
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

            <div className="p-6 flex flex-col gap-3">
              {/* Call us - mobile */}
              <a
                href={`tel:${PHONE_RAW}`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2.5 border border-white/10 text-white/70 text-[15px] font-medium tracking-wide w-full py-4 rounded-[2px] hover:border-white/30 hover:text-white transition-colors duration-200"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 1.28h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 5.98 5.98l.96-.94a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
                <span>Call us · {PHONE_NUMBER}</span>
              </a>

              <Link
                href="/#contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="inline-flex items-center justify-center gap-2.5 bg-accent text-white text-[15px] font-semibold tracking-[0.06em] w-full py-4 rounded-[2px] border border-accent hover:bg-[#e85a35] hover:border-[#e85a35] transition-colors duration-200 group"
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
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
