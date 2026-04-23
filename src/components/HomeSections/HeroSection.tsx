"use client";
import React, { useEffect, useState } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

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

// ─── Easing curves ────────────────────────────────────────────────────────────
const EASE_SNAP: [number, number, number, number] = [0.22, 1, 0.36, 1];

const ORANGE = "#F07218";

// ─── Logo SVG pieces ──────────────────────────────────────────────────────────
function WhiteShape({ isLogoPhase }: { isLogoPhase: boolean }) {
  const logoPoints = "30,5 55,5 55,70 5,70";
  const panelPoints = "0,0 55,0 55,140 0,140";
  return (
    <svg
      viewBox="0 0 110 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      <motion.polygon
        initial={{ points: panelPoints }}
        animate={{ points: isLogoPhase ? logoPoints : panelPoints }}
        transition={{ duration: 1.1, ease: EASE_SNAP }}
        fill="white"
      />
    </svg>
  );
}

function OrangeShape({ isLogoPhase }: { isLogoPhase: boolean }) {
  const logoPoints = "55,70 105,70 80,135 55,135";
  const panelPoints = "55,0 110,0 110,140 55,140";
  return (
    <svg
      viewBox="0 0 110 140"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      preserveAspectRatio="none"
    >
      <motion.polygon
        initial={{ points: panelPoints }}
        animate={{ points: isLogoPhase ? logoPoints : panelPoints }}
        transition={{ duration: 1.1, ease: EASE_SNAP }}
        fill={ORANGE}
      />
    </svg>
  );
}

const AnimatedText = ({
  text,
  delayOffset = 0,
  className = "",
  isVisible = true,
  skip = false,
}: {
  text: string;
  delayOffset?: number;
  className?: string;
  isVisible?: boolean;
  skip?: boolean;
}) => {
  return (
    <span className={`inline-flex flex-wrap ${className}`}>
      {text.split(" ").map((word, wordIndex, wordsArray) => {
        const previousCharsLength =
          wordsArray.slice(0, wordIndex).join(" ").length +
          (wordIndex > 0 ? 1 : 0);
        return (
          <span key={wordIndex} className="inline-flex whitespace-nowrap">
            {word.split("").map((char, charIndex) => {
              const globalIndex = previousCharsLength + charIndex;
              return (
                <motion.span
                  key={charIndex}
                  initial={
                    skip
                      ? false
                      : {
                          y: "50vh",
                          x: "50vw",
                          rotate: 20,
                          opacity: 0,
                          scale: 10,
                        }
                  }
                  animate={
                    isVisible
                      ? { y: 0, x: 0, rotate: 0, opacity: 1, scale: 1 }
                      : {}
                  }
                  transition={
                    skip
                      ? { duration: 0 }
                      : {
                          duration: 0.8,
                          ease: [0.22, 1, 0.36, 1],
                          delay: delayOffset + globalIndex * 0.02,
                        }
                  }
                  className="inline-block relative z-20"
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

export default function HeroSection({ skipAnimationProp = false }: { skipAnimationProp?: boolean }) {
  // Always start with defaults (SSR-safe); useEffect will handle skip logic
  const [phase, setPhase] = useState(0);
  const [gone, setGone] = useState(false);
  const [skipAnimation, setSkipAnimation] = useState(skipAnimationProp);

  useEffect(() => {
    // If we're skipping from the prop, update states immediately
    if (skipAnimationProp) {
      setPhase(4);
      setGone(true);
      setSkipAnimation(true);
      return;
    }

    // Otherwise check session storage as a fallback (though prop is primary now)
    const comingFromProjects = sessionStorage.getItem("fromProjects") === "true";
    
    if (comingFromProjects) {
      setPhase(4);
      setGone(true);
      setSkipAnimation(true);
      return;
    }

    const timers = [
      setTimeout(() => setPhase(1), 100),
      setTimeout(() => setPhase(2), 1900),
      setTimeout(() => setPhase(3), 1910),
      setTimeout(() => setPhase(4), 2100),
      setTimeout(() => {
        setGone(true);
      }, 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, [skipAnimationProp]);

  const isLogoPhase = phase >= 1;
  const isExiting = phase >= 2;
  const isRevealed = phase >= 3;

  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} bg-transparent text-text-primary font-dm-sans h-[95vh] lg:min-h-screen mb-[-28vh] pt-20 pb-32 lg:py-28 relative flex flex-col justify-center overflow-hidden`}
    >
      {/* ── Preloader Blend ────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!gone && (
          <motion.div
            className="fixed inset-0 z-[9999] bg-[#040404] pointer-events-none"
            animate={{ opacity: isExiting ? 0 : 1 }}
            transition={{
              opacity: { duration: 1.2, ease: "easeInOut" },
            }}
          >
            {/* Center Logo Container */}
            <motion.div
              className="fixed left-1/2 top-1/2 w-[110px] h-[140px]"
              initial={{
                x: "-50%",
                y: "-50%",
                scale: 8,
                opacity: 0.1,
              }}
              animate={{
                x: "-50%",
                y: "-50%",
                scale: phase >= 1 ? 1 : 8,
                opacity: phase >= 1 ? 1 : 0.1,
              }}
              transition={{
                scale: { duration: 1.4, ease: EASE_SNAP },
                opacity: { duration: 1.4, ease: EASE_SNAP },
              }}
            >
              {/* White Section */}
              <motion.div
                className="absolute inset-0"
                animate={
                  isExiting ? { y: "-100vh", scale: 18, opacity: 0 } : {}
                }
                transition={{
                  y: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 1.2, ease: "linear" },
                }}
              >
                <WhiteShape isLogoPhase={isLogoPhase} />
              </motion.div>

              {/* Orange Section */}
              <motion.div
                className="absolute inset-0"
                animate={isExiting ? { y: "100vh", scale: 18, opacity: 0 } : {}}
                transition={{
                  y: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                  scale: { duration: 1.6, ease: [0.16, 1, 0.3, 1] },
                  opacity: { duration: 1.2, ease: "linear" },
                  delay: 0.04,
                }}
              >
                <OrangeShape isLogoPhase={isLogoPhase} />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Hero Content ──────────────────────────────────────────────────────── */}
      <div className="w-full px-6 sm:px-8 lg:px-16 flex flex-col items-center max-w-[90vw] mx-auto text-center relative z-20">
        <div className="flex flex-col items-start w-fit mx-auto">
          <motion.div
            initial={skipAnimation ? false : { opacity: 0, y: 10 }}
            animate={isRevealed ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: skipAnimation ? 0.1 : 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-4 sm:mb-6"
          >
            <p
              className="inline-block bg-text-primary text-black px-2.5 py-1 text-[14px] sm:text-[18px] uppercase tracking-[0.4em] font-bold rounded-[2px]"
              style={{ textShadow: "0 0px 12px #ffffff90" }}
            >
              We build
            </p>
          </motion.div>

          <h1 className="font-cormorant text-[max(50px,10vw)] leading-[0.85] tracking-[-0.03em] font-medium m-0 relative z-20">
            <AnimatedText
              text="Digital Products"
              delayOffset={skipAnimation ? 0.1 : 0.2}
              isVisible={isRevealed}
              skip={skipAnimation}
            />
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-10 mt-6 sm:mt-10 relative z-20">
          <motion.div
            initial={skipAnimation ? false : { opacity: 0, x: -20 }}
            animate={isRevealed ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: skipAnimation ? 0.2 : 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="order-last lg:order-first max-w-[380px] text-center lg:text-right mt-8 lg:mt-0"
          >
            <p className="text-[16px] sm:text-[20px] leading-[1.4] font-medium text-text-muted text-balance opacity-80">
              Engineering world-class logic and seamless digital experiences.
            </p>
          </motion.div>

          <div className="flex items-center gap-[4vw] sm:gap-[6vw]">
            <motion.div
              initial={skipAnimation ? false : { opacity: 0, height: 0, rotate: 25 }}
              animate={
                isRevealed
                  ? { opacity: 1, height: "max(60px, 12vw)", rotate: 25 }
                  : {}
              }
              transition={{
                duration: 1.2,
                delay: skipAnimation ? 0.15 : 0.4,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="hidden lg:block w-[1px] sm:w-[1.5px] bg-text-primary/60 origin-center"
            />
            <h1 className="font-cormorant text-[max(50px,10vw)] leading-[0.85] tracking-[-0.03em] font-medium m-0 whitespace-nowrap">
              <AnimatedText
                text="that Scale."
                delayOffset={skipAnimation ? 0.2 : 0.5}
                isVisible={isRevealed}
                skip={skipAnimation}
              />
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
