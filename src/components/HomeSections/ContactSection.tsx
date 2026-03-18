"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { CONTACT } from "../../constants";

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

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleWhatsAppClick = () => {
    const message = `Hi! I'm interested in your services. Can we discuss my project?`;
    const whatsappUrl = `${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleEmailClick = () => {
    const subject = "Inquiry about your services";
    const body = "Hi,\n\nI'm interested in your services and would like to discuss my project requirements.\n\nPlease let me know when would be a good time to connect.\n\nBest regards";
    const emailUrl = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(emailUrl);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans flex flex-col w-full border-t border-border-white`}
    >
      <div className="w-full px-6 sm:px-8 lg:px-16 pt-20 lg:pt-32 pb-20">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 w-full justify-between">
          {/* LEFT: Duo Introduction */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full lg:w-[45%] flex flex-col gap-16"
          >
            <div className="flex flex-col gap-6">
              <h2 className="text-[12px] sm:text-[14px] font-medium tracking-[0.14em] uppercase text-text-muted">
                Who are we?
              </h2>
              <p className="text-[28px] sm:text-[36px] font-light leading-[1.3] tracking-[-0.02em] text-text-primary max-w-xl">
                We are a passionate duo—designing, engineering, and delivering bespoke digital products with exceptional, human-centered experiences.
              </p>
            </div>
            
            <div className="flex gap-6 sm:gap-12 w-full max-w-lg">
               {/* Team Member: Rishu */}
               <div className="flex flex-col gap-5 group w-1/2">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] will-change-transform bg-surface mix-blend-luminosity hover:mix-blend-normal">
                     <Image 
                        src="/images/rishu.png" 
                        alt="Rishu Kumar" 
                        fill 
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-105 object-top" 
                        sizes="(max-width: 640px) 50vw, 25vw"
                     />
                  </div>
                  <div>
                     <h3 className="text-[14px] sm:text-[16px] font-medium text-text-primary tracking-[0.02em] mb-1">Rishu Kumar</h3>
                     <p className="text-[10px] sm:text-[11px] text-text-muted tracking-[0.14em] uppercase">Frontend Engineer</p>
                  </div>
               </div>
               
               {/* Team Member: Aman */}
               <div className="flex flex-col gap-5 group w-1/2 mt-8 sm:mt-12">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2px] grayscale group-hover:grayscale-0 transition-all duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] will-change-transform bg-surface mix-blend-luminosity hover:mix-blend-normal">
                     <Image 
                        src="/images/aman.jpeg" 
                        alt="Aman Sharma" 
                        fill 
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-105 object-top" 
                        sizes="(max-width: 640px) 50vw, 25vw"
                     />
                  </div>
                  <div>
                     <h3 className="text-[14px] sm:text-[16px] font-medium text-text-primary tracking-[0.02em] mb-1">Aman Sharma</h3>
                     <p className="text-[10px] sm:text-[11px] text-text-muted tracking-[0.14em] uppercase">Backend Engineer</p>
                  </div>
               </div>
            </div>
          </motion.div>

          {/* RIGHT: Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full lg:w-[45%] flex flex-col pt-8 lg:pt-0"
          >
            <h2 className="font-cormorant text-[56px] sm:text-[72px] lg:text-[88px] xl:text-[96px] font-light leading-[0.9] tracking-[-0.02em] text-text-primary mb-16 lg:mb-24">
              <span className="block mb-2 sm:mb-4 italic text-text-secondary">Let&apos;s build</span>
              <span className="block text-accent">together.</span>
            </h2>
            
            <div className="flex flex-col w-full border-t border-border-white/50">
               {/* Contact Block */}
               <div className="flex flex-col sm:flex-row sm:items-baseline py-8 border-b border-border-white/50 gap-2 sm:gap-6 group">
                  <div className="w-full sm:w-1/3 shrink-0">
                     <h3 className="text-[11px] font-medium tracking-[0.14em] uppercase text-text-muted transition-colors duration-300 group-hover:text-text-secondary">Email</h3>
                  </div>
                  <div className="w-full sm:w-2/3">
                     <button 
                       onClick={handleEmailClick} 
                       className="text-[18px] md:text-[20px] font-light text-text-primary hover:text-white transition-colors duration-300 text-left tracking-[-0.01em]"
                     >
                       {CONTACT.email}
                     </button>
                  </div>
               </div>

               {/* Contact Block */}
               <div className="flex flex-col sm:flex-row sm:items-baseline py-8 border-b border-border-white/50 gap-2 sm:gap-6 group">
                  <div className="w-full sm:w-1/3 shrink-0">
                     <h3 className="text-[11px] font-medium tracking-[0.14em] uppercase text-text-muted transition-colors duration-300 group-hover:text-text-secondary">WhatsApp</h3>
                  </div>
                  <div className="w-full sm:w-2/3">
                     <button 
                       onClick={handleWhatsAppClick} 
                       className="text-[18px] md:text-[20px] font-light text-text-primary hover:text-white transition-colors duration-300 text-left tracking-[-0.01em]"
                     >
                       Start a conversation
                     </button>
                  </div>
               </div>

               {/* Contact Block */}
               <div className="flex flex-col sm:flex-row sm:items-baseline py-8 border-b border-border-white/50 gap-2 sm:gap-6 group">
                  <div className="w-full sm:w-1/3 shrink-0">
                     <h3 className="text-[11px] font-medium tracking-[0.14em] uppercase text-text-muted transition-colors duration-300 group-hover:text-text-secondary">Phone</h3>
                  </div>
                  <div className="w-full sm:w-2/3">
                     <p className="text-[18px] md:text-[20px] font-light text-text-secondary tracking-[-0.01em]">
                       {CONTACT.phone}
                     </p>
                  </div>
               </div>

               {/* Contact Block */}
               <div className="flex flex-col sm:flex-row sm:items-baseline py-8 border-b border-border-white/50 gap-2 sm:gap-6 group">
                  <div className="w-full sm:w-1/3 shrink-0">
                     <h3 className="text-[11px] font-medium tracking-[0.14em] uppercase text-text-muted transition-colors duration-300 group-hover:text-text-secondary">Location</h3>
                  </div>
                  <div className="w-full sm:w-2/3">
                     <p className="text-[18px] md:text-[20px] font-light text-text-secondary tracking-[-0.01em]">
                       {CONTACT.address}
                     </p>
                  </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
