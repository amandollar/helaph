"use client";

import React, { useState, useEffect } from "react";
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
import ProjectImageStack from "@/components/ui/ProjectImageStack";

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
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: [0.16, 1, 0.3, 1] as any,
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

  const springConfig = { damping: 25, stiffness: 350, mass: 0.4 };
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

      {/* Global Custom Cursor: Colored Orange Circle with bold white typography */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[100] hidden lg:flex items-center justify-center rounded-full bg-accent text-white text-[12px] font-bold uppercase tracking-wider text-center shadow-lg shadow-accent/20"
        style={{
          width: 96,
          height: 96,
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHoveringCard ? 1 : 0,
          opacity: isHoveringCard ? 1 : 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
      >
        View Case
      </motion.div>

      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation Bar / Back Button */}
        <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-8 lg:px-16 py-8 flex justify-between items-center pointer-events-none">
          <Link
            href="/"
            className="group flex items-center gap-2 px-5 py-3 rounded-[4px] bg-[#0f0f11]/90 backdrop-blur-md border border-white/5 text-white hover:bg-neutral-900 transition-all duration-300 pointer-events-auto"
          >
            <ChevronLeft className="w-4 h-4 text-white/70 group-hover:text-white transition-colors" />
            <span className="text-[12px] font-bold tracking-[0.1em] uppercase text-white/70 group-hover:text-white transition-colors">
              Back to Home
            </span>
          </Link>
        </nav>

        <main className="pt-36 lg:pt-48 pb-32">
          {/* Header Section */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-16 lg:mb-24 flex justify-center">
            <motion.h1
              className="font-cormorant text-[14vw] lg:text-[10vw] font-light leading-[0.9] tracking-[-0.02em] text-text-primary overflow-hidden flex"
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
                    char === " " ? "w-[15px] sm:w-[30px]" : "inline-block"
                  }
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Filters */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-20 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex flex-wrap justify-center gap-x-3 gap-y-4"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative text-[12px] sm:text-[13px] uppercase tracking-[0.15em] font-semibold transition-all duration-300 px-5 py-2.5 rounded-[2px] ${activeFilter === category
                      ? "text-white"
                      : "text-text-secondary hover:text-text-primary"
                    }`}
                >
                  {activeFilter === category && (
                    <motion.div
                      layoutId="activeFilterBg"
                      className="absolute inset-0 border border-accent bg-accent/5 rounded-[2px]"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10">
                    {category === "full stack" ? "Full Stack" : category}
                  </span>
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
              className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-16 lg:gap-y-24"
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
  const [isHovered, setIsHovered] = useState(false);
  const isMobile = p.type?.toLowerCase() === "mobile";

  // Left-hand or right-hand column offset for staggered layout
  const isStaggered = i % 2 === 1;

  return (
    <motion.div
      variants={itemVariants}
      layout
      className={`group relative cursor-none flex flex-col ${isStaggered ? "lg:mt-24" : ""}`}
      onMouseEnter={() => {
        setIsHovered(true);
        setIsHoveringCard(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsHoveringCard(false);
      }}
      onClick={() => openProject(p)}
    >
      {/* Visual media container */}
      <div
        className="block relative w-full overflow-visible bg-surface mb-6 border border-white/5 transition-all duration-500 rounded-[8px] group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
      >
        <div className={`relative ${isMobile ? "aspect-[9/16] max-w-[360px] mx-auto" : "aspect-[16/10]"} overflow-visible`}>
          <ProjectImageStack
            graphics={p.graphics || []}
            isHovered={isHovered}
            isMobile={isMobile}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-[8px] z-30" />
        </div>
      </div>

      {/* Info details */}
      <div className="flex flex-col gap-2 px-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent font-dm-sans">
            {p.industry}
          </p>
          <span className="text-[11px] font-semibold tracking-[0.05em] text-text-muted">
            {p.keyResult}
          </span>
        </div>

        <h3 className="text-[20px] sm:text-[24px] font-medium text-text-primary tracking-tight leading-none group-hover:text-white transition-colors duration-300">
          {p.name}
        </h3>

        <p className="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed font-light max-w-lg">
          {p.shortDescription}
        </p>

        {/* Tech Stack List */}
        <div className="flex flex-wrap gap-2 mt-2">
          {p.techStack.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium tracking-[0.05em] uppercase text-text-secondary bg-white/5 px-2.5 py-1 rounded-[4px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
