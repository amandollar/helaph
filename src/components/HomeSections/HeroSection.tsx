"use client";
import React from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { motion } from "framer-motion";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const AnimatedText = ({ text, delayOffset = 0, className = "" }: { text: string, delayOffset?: number, className?: string }) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((word, wordIndex, wordsArray) => {
        // Calculate characters before this word to maintain continuous delay
        const previousCharsLength = wordsArray.slice(0, wordIndex).join(" ").length + (wordIndex > 0 ? 1 : 0);
        return (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, charIndex) => {
              const globalIndex = previousCharsLength + charIndex;
              return (
                <motion.span
                  key={charIndex}
                  initial={{ y: "50vh", x: "50vw", rotate: 20, opacity: 0, scale: 10 }}
                  animate={{ y: 0, x: 0, rotate: 0, opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    ease: [0.22, 1, 0.36, 1],
                    delay: delayOffset + globalIndex * 0.02,
                  }}
                  className="inline-block relative z-50"
                >
                  {char}
                </motion.span>
              );
            })}
            {wordIndex < wordsArray.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        );
      })}
    </span>
  );
};

export default function HeroSection() {
  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans flex flex-col`}
    >
      {/* Main */}
      <div className="w-full px-6 sm:px-8 lg:px-16 pt-36 md:pt-48 pb-20">
        {/* Headline block */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-end gap-6 lg:gap-12">
          <h1 className="font-cormorant text-[52px] sm:text-[56px] md:text-[7vw] lg:text-[8vw] font-light leading-[0.95] tracking-[-0.02em] text-text-primary m-0 relative z-50 pointer-events-none">
            <span className="flex flex-wrap items-center mb-2 pointer-events-auto">
              <AnimatedText text="We build " delayOffset={0.2} />
              <em className="italic text-accent flex">
                <AnimatedText text="digital" delayOffset={0.2 + 9 * 0.02} />
              </em>
            </span>
            <span className="flex flex-wrap block">
              <AnimatedText text="products that scale." delayOffset={0.2} />
            </span>
          </h1>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-none lg:max-w-[280px] flex-shrink-0 -mb-24"
          >
            <p className="text-sm font-normal leading-[1.75] text-text-secondary mb-5">
              We build scalable full-stack web apps, mobile experiences, and
              high-converting landing pages.
            </p>
            <span className="inline-flex items-center gap-[7px] text-[11px] font-medium tracking-[0.1em] uppercase text-accent border border-accent-border px-3 py-1.5 rounded-[2px] bg-accent-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-accent shrink-0" />
              Taking on clients now
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
