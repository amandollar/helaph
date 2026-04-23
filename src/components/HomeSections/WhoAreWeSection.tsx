"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
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

export default function WhoAreWeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <section
      id="who-are-we"
      ref={sectionRef}
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans pt-32 pb-20 flex justify-center`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-[95%] max-w-[1400px] bg-[#ffcabd] rounded-[2rem] sm:rounded-[3rem] shadow-2xl relative overflow-visible"
      >
        <div className="flex flex-col lg:flex-row min-h-[300px]">
          {/* TEXT — LEFT */}
          <div className="lg:w-1/2 p-8 sm:p-12 lg:p-16 flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-[1px] bg-[#F07218]" />
                <span className="text-[#F07218] text-[12px] sm:text-[14px] font-bold tracking-[0.2em] uppercase">
                  Who Are We?
                </span>
              </div>

              <h2
                className={`${cormorant.className} text-[36px] sm:text-[48px] lg:text-[56px] leading-[1.1] font-medium text-[#110704] mb-5`}
              >
                Designers, engineers, <br className="hidden sm:block" />
                <span className="italic text-[#F07218]">problem solvers.</span>
              </h2>

              <p className="text-[#110704]/70 text-[15px] sm:text-[16px] lg:text-[17px] font-normal leading-[1.7] max-w-lg">
                We&apos;re a tight-knit team of builders who care deeply about craft.
                From pixel-perfect interfaces to robust backend systems, we
                bring ideas to life with speed, intention, and an obsessive eye
                for detail — because great digital products deserve nothing
                less.
              </p>
            </motion.div>
          </div>

          {/* IMAGES — RIGHT (Aman left, Rishu right, overlapping) */}
          <div className="lg:w-1/2 relative overflow-visible min-h-[300px] lg:min-h-[320px]">
            {/* Aman — left of pair */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[-1px] z-0"
              style={{ left: isDesktop ? "-10%" : "-4.5%", width: "55%", height: "140.8%" }}
            >
              <Image
                src="/images/Team/aman.webp"
                alt="Aman Sharma"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 40vw, 24vw"
              />
            </motion.div>

            {/* Priyanka — center of pair, behind both */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[-1px] z-10"
              style={{ left: isDesktop ? "18%" : "23.5%", width: "55%", height: "140.8%" }}
            >
              <Image
                src="/images/Team/Priyanka.webp"
                alt="Priyanka"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 40vw, 24vw"
              />
            </motion.div>

            {/* Rishu — right of pair, overlapping Aman slightly */}
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="absolute bottom-[-1px] z-0"
              style={{ left: isDesktop ? "44%" : "49.5%", width: "55%", height: "140.8%" }}
            >
              <Image
                src="/images/Team/Rishu.webp"
                alt="Rishu Kumar"
                fill
                className="object-contain object-bottom"
                sizes="(max-width: 1024px) 40vw, 24vw"
              />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
