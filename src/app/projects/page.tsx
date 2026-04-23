"use client";

//comment
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { PROJECTS } from "../../constants";
import ContactSection from "../../components/HomeSections/ContactSection";
import LottieBackground from "../../components/ui/LottieBackground";
import { ChevronLeft } from "lucide-react";
import { useProjectModal } from "../../contexts/ProjectModalContext";
import { Project } from "../../types";

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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: [0.21, 0.47, 0.32, 0.98] as any,
    },
  },
};

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");
  const { openProject } = useProjectModal();

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      sessionStorage.setItem("fromProjects", "true");
    };
  }, []);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 350, mass: 0.2 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
  };

  const categories = [
    "All",
    ...Array.from(new Set(PROJECTS.map((project) => project.type))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.type === activeFilter);

  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans selection:bg-accent selection:text-white`}
      onMouseMove={handleMouseMove}
      style={{
        background: "#080809",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <LottieBackground />

      {/* Global Custom Cursor */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] flex items-center justify-center rounded-full bg-black text-white text-[12px] font-semibold uppercase tracking-widest text-center"
        style={{
          width: 120,
          height: 120,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHoveringCard ? 1 : 0,
          opacity: isHoveringCard ? 1 : 0,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        Case study
      </motion.div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation Bar / Back Button */}
        <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-8 lg:px-16 py-8 flex justify-between items-center pointer-events-none">
          <Link
            href="/"
            className="group flex items-center gap-2 px-4 py-2.5 bg-black text-white hover:bg-neutral-900 transition-all duration-300 pointer-events-auto"
          >
            <ChevronLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-[13px] font-medium tracking-[0.08em] uppercase text-white/70 group-hover:text-white transition-colors">
              Back
            </span>
          </Link>
        </nav>

        <main className="pt-48 lg:pt-64 pb-32">
          {/* Header Section */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-24 lg:mb-40 flex justify-center">
            <motion.h1
              className="font-cormorant text-[16vw] lg:text-[12vw] font-light leading-[0.9] tracking-[-0.02em] text-text-primary overflow-hidden flex"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {"Our Work".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className={
                    char === " " ? "w-[20px] sm:w-[40px]" : "inline-block"
                  }
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Filters */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-16 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-x-2 gap-y-4"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative text-[13px] sm:text-[15px] uppercase tracking-[0.14em] font-medium transition-all duration-300 px-6 py-3 ${
                    activeFilter === category
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {activeFilter === category && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 border border-accent"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </motion.div>
          </div>

          {/* Projects Grid */}
          <div className="w-full px-6 sm:px-8 lg:px-16">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              key={activeFilter}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-12 lg:gap-20"
            >
              <AnimatePresence mode="popLayout">
                {filteredProjects.map((p, i) => (
                  <ProjectCard
                    key={p.id}
                    p={p}
                    i={i}
                    openProject={openProject}
                    setIsHoveringCard={setIsHoveringCard}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        </main>

        <ContactSection />
      </div>

      {/* Background aesthetic touches */}
      <div className="fixed top-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="fixed bottom-1/4 -left-20 w-96 h-96 bg-accent/5 rounded-full blur-[150px] pointer-events-none z-0" />
    </div>
  );
}

function ProjectCard({
  p,
  i,
  openProject,
  setIsHoveringCard,
}: {
  p: Project;
  i: number;
  openProject: (project: Project) => void;
  setIsHoveringCard: (val: boolean) => void;
}) {
  const isMobile = p.type?.toLowerCase() === "mobile";

  return (
    <motion.div
      variants={itemVariants}
      layout
      className="group relative cursor-none"
      onMouseEnter={() => setIsHoveringCard(true)}
      onMouseLeave={() => setIsHoveringCard(false)}
    >
      {/* Hover Background Box */}
      <div className="absolute -inset-6 bg-[#FFCABD] opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none -z-10" />

      <div
        onClick={() => openProject(p as unknown as Project)}
        className={`block relative w-full overflow-hidden bg-surface mb-8 cursor-pointer border-white/15 group-hover:border-[#1A1405] transition-all duration-500 shadow-2xl ${
          isMobile
            ? "rounded-[32px] sm:rounded-[48px] border-[6px] sm:border-[10px]"
            : "rounded-[12px] sm:rounded-[20px] border-[4px] sm:border-[8px]"
        }`}
      >
        <Image
          src={p.featuredImage || "/images/Projects/FullStack.png"}
          alt={p.name}
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
          className="block transition-all duration-500"
          priority={i < 2}
        />
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-[24px] sm:text-[32px] font-light text-text-primary tracking-[-0.01em] group-hover:text-black transition-colors duration-300 leading-tight">
          {p.name}
        </h3>
        <p className="text-[14px] text-text-secondary group-hover:text-black/80 leading-relaxed max-w-xl font-light transition-colors duration-300">
          {p["short description"]}
        </p>
      </div>
    </motion.div>
  );
}
