"use client";

import React, { useRef } from "react";
import { DM_Sans } from "next/font/google";
import { TESTIMONIALS } from "../../constants";
import { motion, useInView } from "framer-motion";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className={`${dmSans.variable} font-dm-sans flex flex-col w-full border-t border-border-white overflow-hidden`}
    >
      <div className="w-full pt-16 lg:pt-24 pb-20">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="px-6 sm:px-8 lg:px-16 mb-12 sm:mb-16"
        >
          <div className="flex items-center gap-3 text-[18px] font-medium tracking-[0.14em] uppercase text-text-primary">
            <span className="w-8 h-[1px] bg-white" />
            Client feedback
          </div>
        </motion.div>

        {/* Marquee Wrapper */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative w-full flex flex-col overflow-hidden py-4"
        >
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-r from-bg-dark to-transparent z-[2] pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-48 bg-gradient-to-l from-bg-dark to-transparent z-[2] pointer-events-none" />
          
          {/* Marquee Scrolling Content */}
          <div className="flex w-max animate-marquee-scroll hover:[animation-play-state:paused] gap-4 sm:gap-6 px-3">
             {[...TESTIMONIALS, ...TESTIMONIALS].map((testimonial, i) => (
               <div 
                 key={`${testimonial.id}-${i}`}
                 className="w-[300px] sm:w-[420px] flex-shrink-0 p-6 sm:p-10 rounded-[2px] bg-surface border border-border-white/50 flex flex-col justify-between min-h-[260px] transition-colors duration-300 hover:border-border-white group"
               >
                 {/* Quote text */}
                 <p className="text-[15px] sm:text-[17px] font-light text-text-secondary group-hover:text-text-primary transition-colors duration-300 leading-[1.6] tracking-[-0.01em] mb-8">
                   &ldquo;{testimonial.testimonial}&rdquo;
                 </p>
                 
                 {/* Author Details */}
                 <div className="flex flex-col gap-1 mt-auto">
                    <h4 className="text-[14px] sm:text-[16px] font-medium tracking-[0.02em] text-text-primary">
                      {testimonial.name}
                    </h4>
                    <p className="text-[11px] sm:text-[12px] font-medium tracking-[0.12em] uppercase text-text-muted group-hover:text-text-secondary transition-colors duration-300 mt-1">
                      {testimonial.position}, {testimonial.company}
                    </p>
                 </div>
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
