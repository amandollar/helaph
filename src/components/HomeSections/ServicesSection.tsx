"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { MAIN_SERVICES } from "../../constants";
import { motion, useInView } from "framer-motion";

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

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans flex flex-col w-full`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 pt-20 lg:pt-32 pb-20">
        
        {/* Header */}
        <div className="mb-16 lg:mb-24 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 text-[14px] sm:text-[18px] font-medium tracking-[0.14em] uppercase mb-8 sm:mb-12 text-white">
              <span className="w-8 h-[1px] bg-white" />
              Our expertise
            </div>
            
            <h2 className="font-cormorant text-[42px] sm:text-[56px] lg:text-[72px] font-light leading-[1] tracking-[-0.02em] text-text-primary m-0 max-w-3xl">
              <span className="block mb-2 sm:mb-4">Specialized services</span>
              <span className="block text-text-secondary">for digital growth.</span>
            </h2>
          </div>
          
          <div className="max-w-md lg:pb-3">
            <p className="text-[14px] sm:text-[16px] font-normal leading-[1.75] text-text-secondary">
              End-to-end digital solutions crafted with modern technology and a deep 
              focus on performance, design, and reliable results.
            </p>
          </div>
        </div>

        {/* Services List */}
        <div className="flex flex-col border-t border-border-white">
          {MAIN_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="group border-b border-border-white py-10 lg:py-16 flex flex-col lg:flex-row gap-6 lg:gap-16 relative hover:bg-white/[0.02] transition-colors duration-500"
            >
              {/* Number */}
              <div className="font-cormorant text-[24px] sm:text-[32px] font-light text-text-muted w-16 shrink-0 transition-colors duration-500 group-hover:text-white">
                0{index + 1}
              </div>
              
              {/* Title & Description Container */}
              <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-12">
                {/* Title */}
                <div className="md:w-[45%] lg:w-1/2">
                  <h3 className="font-cormorant text-[32px] sm:text-[40px] lg:text-[48px] font-medium leading-[1.1] text-text-primary mb-4 transition-transform duration-500 group-hover:translate-x-3">
                    {service.title}
                  </h3>
                  <p className="text-[14px] sm:text-[16px] text-text-secondary leading-[1.6]">
                    {service.description}
                  </p>
                </div>
                
                {/* Features List */}
                <div className="hidden lg:flex md:w-[55%] lg:w-1/2 flex-col justify-center">
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3 text-[13px] sm:text-[14px] tracking-[0.04em] text-text-secondary group-hover:text-text-primary transition-colors duration-500">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20 mt-1.5 shrink-0 transition-colors duration-500 group-hover:bg-white/80" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 lg:mt-24 flex flex-col items-center justify-center text-center">
          <Link
            href="#contact"
            className="group flex items-center justify-center gap-2 text-[14px] lg:text-[16px] font-semibold tracking-[0.06em] text-white px-8 py-4 rounded-[2px] border border-border-white hover:bg-white hover:text-black transition-all duration-300"
          >
            Discuss your needs
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

      </div>
    </section>
  );
}
