"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useInView, useMotionValue, useSpring, useScroll, useTransform } from "framer-motion";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import Navbar from "../../components/layout/Navbar";
import ContactSection from "../../components/HomeSections/ContactSection";
import LottieBackground from "../../components/ui/LottieBackground";

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

// ─── Easing ────────────────────────────────────────────────────────────────────
const EASE_SNAP: [number, number, number, number] = [0.16, 1, 0.3, 1];





// ─── VideoPlayer ───────────────────────────────────────────────────────────────
function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [showBar, setShowBar] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Play/Pause central indicator animation state
  const [showIndicator, setShowIndicator] = useState<'play' | 'pause' | null>(null);
  const [indicatorKey, setIndicatorKey] = useState(0);

  useEffect(() => {
    if (!showIndicator) return;
    const t = setTimeout(() => setShowIndicator(null), 800);
    return () => clearTimeout(t);
  }, [showIndicator, indicatorKey]);

  // Cursor follower
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cursorX = useSpring(mouseX, { stiffness: 400, damping: 32, mass: 0.15 });
  const cursorY = useSpring(mouseY, { stiffness: 400, damping: 32, mass: 0.15 });

  useEffect(() => {
    setIsTouchDevice("ontouchstart" in window || navigator.maxTouchPoints > 0);
  }, []);

  // Autoplay muted
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  // Track progress
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onTimeUpdate = () =>
      setProgress(v.duration ? (v.currentTime / v.duration) * 100 : 0);
    v.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      v.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, []);

  const scheduleHide = useCallback(() => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setShowBar(false), 2500);
  }, []);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
    if (!v.muted) {
      v.loop = false;
      if (v.currentTime === 0 && v.paused) v.play().catch(() => {});
    } else {
      v.loop = true;
    }
    scheduleHide();
  };

  const handleContainerClick = () => {
    const v = videoRef.current;
    if (!v) return;
    
    // If it was muted, first click unmutes and restarts (if user expects that)
    if (isMuted) {
      v.muted = false;
      v.currentTime = 0;
      v.loop = false;
      v.play().catch(() => {});
      setIsMuted(false);
      setShowBar(true);
      scheduleHide();
      setShowIndicator('play');
      setIndicatorKey(prev => prev + 1);
      return;
    }

    if (v.paused) {
      v.play().catch(() => {});
      setShowIndicator('play');
      setIndicatorKey(prev => prev + 1);
    } else {
      v.pause();
      setShowIndicator('pause');
      setIndicatorKey(prev => prev + 1);
    }
    
    setShowBar(true);
    scheduleHide();
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    if (!isTouchDevice) {
      setShowBar(true);
      scheduleHide();
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (!isTouchDevice) {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
      setShowBar(false);
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isTouchDevice) {
      setShowBar(true);
      scheduleHide();
    }
  };

  const handleScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const val = parseFloat(e.target.value);
    v.currentTime = (val / 100) * v.duration;
    setProgress(val);
    scheduleHide();
  };

  return (
    <>
      {/* ── Floating play follower (only when muted) ── */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[90] flex items-center justify-center"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
          width: 120,
          height: 120,
        }}
        animate={{
          scale: isHovering && isMuted ? 1 : 0,
          opacity: isHovering && isMuted ? 1 : 0,
        }}
        transition={{ duration: 0.18, ease: "easeOut" }}
      >
        <div
          className="w-full h-full rounded-full bg-black flex items-center justify-center"
          style={{ boxShadow: "0 4px 32px rgba(0,0,0,0.5)" }}
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </motion.div>

      <div
        ref={containerRef}
        className="relative w-full overflow-hidden bg-black select-none group"
        style={{ aspectRatio: "16/9", cursor: isMuted ? "none" : "auto", borderRadius: "8px" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
        onClick={handleContainerClick}
      >
        <video
          ref={videoRef}
          src="/videos/FHD-intro.webm"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />

        {/* ── Play/Pause Central Indicator ── */}
        <AnimatePresence>
          {showIndicator && (
            <motion.div
              key={indicatorKey}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.4 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center pointer-events-none z-20"
            >
              <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.3)]">
                {showIndicator === 'play' ? (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sleek Control Bar ── */}
        <AnimatePresence>
          {showBar && !isMuted && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.95 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-full px-5 py-3 w-[90%] max-w-[400px]"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={(e) => e.stopPropagation()}
            >
              {/* Mute button */}
              <button
                onClick={toggleMute}
                className="shrink-0 flex items-center justify-center hover:text-accent transition-colors duration-150 text-white"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                  </svg>
                )}
              </button>

              {/* Scrubber track */}
              <div className="relative flex-1 h-3 flex items-center cursor-pointer">
                <div className="relative w-full h-[3px] rounded-full bg-white/20 overflow-visible">
                  {/* Fill */}
                  <div
                    className="absolute left-0 top-0 h-full rounded-full bg-accent transition-none"
                    style={{ width: `${progress}%` }}
                  />
                  {/* Thumb dot */}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-accent shadow-[0_0_8px_rgba(255,107,70,0.8)] pointer-events-none"
                    style={{ left: `calc(${progress}% - 6px)` }}
                  />
                </div>
                {/* Invisible range input for interaction */}
                <input
                  type="range"
                  min={0}
                  max={100}
                  step={0.1}
                  value={progress}
                  onChange={handleScrub}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer"
                  style={{ WebkitAppearance: "none" }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ─── VideoSection — sticky scroll-driven 3D reveal ───────────────
function VideoSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Scroll-driven 3D
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end end"],
  });

  // Scale and rotate smoothly, finishing at 0.85 progress for a subtle scroll buffer
  const rotateY = useTransform(scrollYProgress, [0, 0.85], [-18, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 0.85], [8, 0]);
  const scale   = useTransform(scrollYProgress, [0, 0.85], [0.4, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.1], [0.5, 1]);

  return (
    // Tall section gives scroll room and a short pause time at the end
    <section
      ref={sectionRef}
      style={{ height: "260vh", position: "relative" }}
    >
      {/* ── Sticky video frame ── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          perspective: "1400px",
        }}
      >
        <motion.div
          style={{
            width: "80vw",
            rotateY,
            rotateX,
            scale,
            opacity,
            transformStyle: "preserve-3d",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <VideoPlayer />
        </motion.div>
      </div>
    </section>
  );
}

// ─── Team Members data ─────────────────────────────────────────────────────────
const teamData = [
  {
    name: "Rishu Kumar",
    role: "Head of Design & Frontend",
    detail: "React · Framer Motion · TypeScript · Vercel",
    image: "/images/Team/Rishu.webp",
    index: "01",
  },
  {
    name: "Aman Sharma",
    role: "Lead Backend Architect",
    detail: "Node.js · MongoDB · Firebase · Socket.io",
    image: "/images/Team/aman.webp",
    index: "02",
  },
  {
    name: "Priyanka",
    role: "Design Lead",
    detail: "Figma · Brand Identity · UI Systems",
    image: "/images/Team/Priyanka.webp",
    index: "03",
  },
];

// ─── Team — Hover-reveal editorial list ────────────────────────────────────────
function TeamSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      ref={sectionRef}
      className="px-6 sm:px-8 lg:px-16 py-32"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: EASE_SNAP }}
          className="mb-20"
        >
          <h2 className="font-cormorant text-[10vw] sm:text-[7vw] lg:text-[5vw] font-light text-text-primary leading-[0.95] tracking-[-0.02em]">
            Our Team
          </h2>
        </motion.div>

        {/* Editorial list rows */}
        <div>
          {teamData.map((member, i) => {
            const nameParts = member.name.split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ");

            return (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 24 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: i * 0.1, ease: EASE_SNAP }}
                onMouseEnter={() => setHoveredIndex(i)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="group relative flex items-center justify-between py-8 cursor-pointer"
                style={{
                  borderTop: i === 0 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Left — name with inline square hover image */}
                <div className="flex items-center gap-6 sm:gap-10">
                  <motion.h3
                    className="font-cormorant text-[8vw] sm:text-[5vw] lg:text-[4vw] font-light text-text-primary leading-none tracking-[-0.02em] transition-colors duration-300 group-hover:text-accent"
                    animate={{
                      x: hoveredIndex === i ? 8 : 0,
                    }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span>{firstName}</span>
                    {" "}
                    <motion.span
                      initial={{ width: 0, opacity: 0, scale: 0.8 }}
                      animate={{ 
                        width: hoveredIndex === i ? 140 : 0, 
                        opacity: hoveredIndex === i ? 1 : 0,
                        scale: hoveredIndex === i ? 1 : 0.8,
                      }}
                      transition={{ duration: 0.85, ease: [0.1, 1, 0.2, 1] }}
                      className="inline-block relative overflow-hidden shrink-0 align-middle"
                      style={{ height: 100, borderRadius: "4px" }}
                    >
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover object-top"
                        sizes="140px"
                        priority={true}
                      />
                    </motion.span>
                    {lastName && (
                      <>
                        {" "}
                        <span>{lastName}</span>
                      </>
                    )}
                  </motion.h3>
                </div>

                {/* Right — role + skills */}
                <motion.div
                  className="text-right hidden sm:block shrink-0 ml-8"
                  animate={{
                    opacity: hoveredIndex === i ? 0.3 : 1,
                    x: hoveredIndex === i ? 6 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-text-secondary text-[13px] font-medium tracking-wide">
                    {member.role}
                  </p>
                  <p className="text-text-muted text-[11px] tracking-[0.06em] mt-1 font-light">
                    {member.detail}
                  </p>
                </motion.div>

                {/* Arrow indicator */}
                <motion.span
                  className="absolute right-0 text-accent text-[18px] sm:hidden"
                  animate={{ opacity: hoveredIndex === i ? 1 : 0, x: hoveredIndex === i ? 0 : -6 }}
                  transition={{ duration: 0.25 }}
                >
                  →
                </motion.span>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile — portrait grid (shown only on mobile since hover doesn't work) */}
        <div className="sm:hidden mt-16 grid grid-cols-3 gap-3">
          {teamData.map((member) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, ease: EASE_SNAP }}
              className="flex flex-col gap-2"
            >
              <div className="relative w-full aspect-[3/4] overflow-hidden" style={{ borderRadius: "4px" }}>
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover object-top"
                  sizes="33vw"
                />
              </div>
              <p className="text-text-primary text-[11px] font-semibold leading-tight">{member.name}</p>
              <p className="text-text-muted text-[10px] leading-tight">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────────
export default function AboutPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      sessionStorage.setItem("skipHomeAnimation", "true");
    };
  }, []);

  // Character-split animation for hero headline (same as projects "Our Work")
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.03 },
    },
  };

  const charVariants = {
    hidden: { y: "100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-80px" });

  const storyRef = useRef<HTMLDivElement>(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });



  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans selection:bg-accent selection:text-white`}
      style={{ background: "#080809", minHeight: "100vh", position: "relative" }}
    >
      <LottieBackground />
      <Navbar />

      <div style={{ position: "relative", zIndex: 10 }}>
        <main className="pt-40 pb-0">

          {/* ── 1 · Hero ─────────────────────────────────────────────────────── */}
          <section className="px-6 sm:px-8 lg:px-16 pt-16 pb-4 text-center">
            <h1 className="font-cormorant text-[14vw] sm:text-[11vw] lg:text-[9vw] font-light leading-[0.92] tracking-[-0.02em] text-text-primary">
              {/* Line 1 */}
              <motion.div
                className="overflow-hidden flex justify-center flex-wrap pb-[0.25em] -mb-[0.25em]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {"We obsess so".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={charVariants}
                    className={char === " " ? "w-[2vw] sm:w-[3vw] inline-block" : "inline-block"}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>

              {/* Line 2 */}
              <motion.div
                className="overflow-hidden flex justify-center flex-wrap pb-[0.25em] -mb-[0.25em]"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {"you don't have to.".split("").map((char, i) => (
                  <motion.span
                    key={i}
                    variants={charVariants}
                    className={char === " " ? "w-[2vw] sm:w-[3vw] inline-block" : "inline-block"}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </h1>
          </section>

          {/* ── 2 · Video — scroll-driven 3D reveal ──────────────────────── */}
          <VideoSection />

          {/* ── 3 · Concept & Origin ─────────────────────────────────────────── */}
          <section
            ref={storyRef}
            className="px-6 sm:px-8 lg:px-16 py-32"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={storyInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASE_SNAP }}
                className="text-text-secondary text-[20px] sm:text-[24px] lg:text-[28px] leading-[1.6] font-light space-y-8"
              >
                <p>
                  <strong className="text-text-primary font-normal">helaph</strong> is a concept-driven design and technology studio founded by Aman Sharma, Rishu Kumar, and Priyanka in 2025, based in Mumbai, India.
                </p>
                <p>
                  Rooted in high-performance engineering and pixel-perfect design, we build robust digital products with speed, intention, and an obsessive eye for detail. Whether crafting fluid user interfaces or scalable full-stack architectures, our work balances usability with bold visual expression.
                </p>
                <p>
                  Our team remains intentionally small, under 5 people, which allows us to craft every pixel and line of code directly. No layers, just direct collaboration from the first sketch to the production bundle.
                </p>
              </motion.div>
            </div>
          </section>

          {/* ── 4 · Selected Work Summary ──────────────────────────────────────── */}
          <section
            ref={statsRef}
            className="px-6 sm:px-8 lg:px-16 pb-32"
          >
            <div className="max-w-4xl mx-auto border-t border-white/10 pt-16">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: EASE_SNAP }}
                className="flex flex-col sm:flex-row items-start justify-between gap-8"
              >
                <div className="flex-1">
                  <h3 className="font-cormorant text-[32px] sm:text-[40px] font-light text-text-primary tracking-[-0.01em] mb-4">
                    Digital Performance
                  </h3>
                  <p className="text-text-secondary text-[15px] leading-[1.75] font-light max-w-md">
                    We specialize in end-to-end engineering of full-stack applications, next-generation mobile experiences, high-converting landing pages, and premium portfolio websites tailored to your business logic.
                  </p>
                </div>
                
                <div className="shrink-0 sm:pt-4">
                  <Link
                    href="/projects"
                    className="group inline-flex items-center gap-2 text-white hover:text-accent font-medium tracking-wide text-[14px] transition-colors duration-200"
                  >
                    View our work
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-200 ease-out group-hover:translate-x-1"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── 5 · Team ─────────────────────────────────────────────────────── */}
          <TeamSection />





        </main>

        <ContactSection />
      </div>

      {/* Ambient glow */}
      <div className="fixed top-1/4 -right-32 w-96 h-96 bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/3 -left-24 w-72 h-72 bg-accent/[0.03] rounded-full blur-[120px] pointer-events-none z-0" />
    </div>
  );
}
