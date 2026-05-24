"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { DM_Sans } from "next/font/google";
import { PROJECTS } from "../../constants";
import { motion, Variants, AnimatePresence } from "framer-motion";
import { useProjectModal } from "../../contexts/ProjectModalContext";
import { Project } from "../../types";
import ProjectImageStack from "@/components/ui/ProjectImageStack";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

const techStackList = [
  "React",
  "Next.js",
  "Node.js",
  "TypeScript",
  "React Native",
  "MongoDB",
  "Firebase",
  "Tailwind",
  "Express.js",
  "GraphQL",
  "PostgreSQL",
  "Vercel",
];

const stats = [
  { value: "6+", label: "Premium Products" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2+", label: "Years Experience" },
  { value: "3", label: "Expert Creators" },
];

/* ─── Single project card ─────────────────────────────────────────────────── */
function ProjectCard({
  project,
}: {
  project: Project;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const { openProject } = useProjectModal();
  const p = project;

  return (
    <motion.div
      className="flex flex-col group cursor-pointer w-full"
      onClick={() => openProject(p)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Media */}
      <div className="block relative overflow-visible rounded-[8px] bg-surface border border-white/5 transition-all duration-500 ease-out group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]">
        <div className="relative aspect-[16/10] overflow-visible">
          <ProjectImageStack
            graphics={p.graphics || []}
            isHovered={isHovered}
            isMobile={p.type?.toLowerCase() === "mobile"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none rounded-[8px] z-30" />
        </div>
      </div>

      {/* Details */}
      <div className="mt-5 flex flex-col gap-2 px-1">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-bold tracking-[0.2em] uppercase text-accent font-dm-sans">
            {p.industry}
          </p>
          <span className="text-[11px] font-semibold tracking-[0.05em] text-text-muted">
            {p.keyResult}
          </span>
        </div>

        <h3 className="text-[20px] sm:text-[24px] font-medium text-text-primary tracking-tight leading-[1.15] group-hover:text-white transition-colors duration-300">
          {p.name}
        </h3>

        <p className="text-[13px] sm:text-[14px] text-text-secondary leading-relaxed font-light max-w-lg">
          {p.shortDescription}
        </p>

        {/* Tech Stack Sub-list */}
        <div className="flex flex-wrap gap-2 mt-2">
          {p.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-medium tracking-[0.05em] uppercase text-text-secondary bg-white/5 px-2 py-1 rounded-[4px]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

/* ─── Section ─────────────────────────────────────────────────────────────── */
export default function ProjectsSection({ skipAnimation = false }: { skipAnimation?: boolean }) {
  // Flagship projects to show initially
  const flagshipIds = [
    "rowh-ecommerce",
    "eventviewz-management",
    "focusdoc-standby-clock",
    "aurelia-studio"
  ];

  // Map project list
  const allProjects = PROJECTS;
  const flagshipProjects = flagshipIds
    .map(id => allProjects.find(p => p.id === id)!)
    .filter(Boolean);

  // Remaining projects for rotating pool (in exact preferred order)
  const rotatingPoolIds = [
    "girlfriend-hour",
    "tattoo-story",
    "amber-ent",
    "k24-healthcare",
    "yana-nail",
    "uni-trade",
    "akshupie-portfolio",
    "rishu-portfolio"
  ];

  // State to hold the 4 currently visible projects
  const [visibleProjects, setVisibleProjects] = useState<Project[]>(flagshipProjects);

  // Refs to track the queue of waiting projects and the next slot to rotate
  const queueRef = useRef<string[]>([...rotatingPoolIds]);
  const slotRef = useRef<number>(0);

  useEffect(() => {
    // Initial delay of 45 seconds before starting rotation
    const startDelay = setTimeout(() => {
      // Rotation interval of 15 seconds
      const rotationInterval = setInterval(() => {
        setVisibleProjects((prevVisible) => {
          const newVisible = [...prevVisible];
          const slotToReplace = slotRef.current;
          
          // Get next incoming project ID from queue
          const queue = queueRef.current;
          if (queue.length === 0) return prevVisible;
          
          const incomingId = queue.shift()!;
          const incomingProject = allProjects.find(p => p.id === incomingId);
          
          if (incomingProject) {
            // Keep track of the outgoing project
            const outgoingProject = newVisible[slotToReplace];
            
            // Replace the project in the active slot
            newVisible[slotToReplace] = incomingProject;
            
            // Push outgoing project back to the queue
            if (outgoingProject) {
              queueRef.current.push(outgoingProject.id);
            }
            
            // Advance the slot pointer to the next slot (0, 1, 2, 3)
            slotRef.current = (slotToReplace + 1) % 4;
          }
          
          return newVisible;
        });
      }, 15000); // rotate every 15 seconds

      return () => clearInterval(rotationInterval);
    }, 45000); // initial delay of 45 seconds

    return () => clearTimeout(startDelay);
  }, [allProjects]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: skipAnimation ? 0.2 : 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={`${dmSans.variable} font-dm-sans flex flex-col`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={containerVariants}
        className="w-full px-6 sm:px-8 lg:px-16 pt-8 lg:pt-12 pb-24"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-[14px] sm:text-[18px] font-medium tracking-[0.18em] uppercase text-white">
            <span className="w-8 h-[1px] bg-white/30" />
            Selected work
          </div>
        </motion.div>

        {/* Grid — items stagger naturally, alternate columns have top margin offset */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 sm:gap-x-12 gap-y-16 lg:gap-y-0 pb-16 lg:pb-32">
          {visibleProjects.map((project, i) => (
            <div
              key={i} // Constant slot key to keep layout positions completely stable
              className={`flex flex-col w-full ${i % 2 === 1 ? "lg:mt-24" : ""}`}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id} // Project ID triggers AnimatePresence on transition
                  initial={{ opacity: 0, y: 35, filter: "blur(12px)", scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, y: -35, filter: "blur(12px)", scale: 0.97 }}
                  transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex flex-col"
                >
                  <ProjectCard project={project} />
                </motion.div>
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* CTAs — below cards on all screen sizes */}
        <div className="relative flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 sm:mt-16 min-h-[48px]">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 text-[14px] lg:text-[16px] font-semibold tracking-[0.06em] text-white border border-white/10 px-8 py-4 rounded-[2px] transition-colors duration-200 hover:bg-white/5 w-full sm:w-auto"
          >
            Explore all work
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 ease-out group-hover:translate-y-0.5"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </Link>
          <Link
            href="#contact"
            className="sm:absolute right-0 inline-flex items-center justify-center gap-2.5 bg-accent text-white text-[14px] lg:text-[16px] font-semibold tracking-[0.06em] px-8 py-4 rounded-[2px] border border-accent hover:bg-[#e85a35] hover:border-[#e85a35] transition-colors duration-200 group w-full sm:w-auto"
          >
            Start your project
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

      {/* Stats bar */}
      <div className="border-t border-border-white">
        <div className="w-full px-6 sm:px-8 lg:px-16 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={`py-8 flex flex-col gap-1 lg:pl-8
                ${i === 0 ? "lg:pl-0" : ""}
                ${i % 2 !== 1 ? "border-r border-border-white" : "max-sm:border-r-0 border-r border-border-white"}
                ${i === 2 ? "lg:border-r" : ""}
                ${i === 3 ? "border-r-0" : ""}
              `}
            >
              <div className="text-[32px] sm:text-[40px] font-medium text-text-primary leading-none tracking-[-0.02em]">
                <span className="text-white">
                  {s.value.replace(/[^0-9]/g, "")}
                </span>
                {s.value.replace(/[0-9]+/, "")}
              </div>
              <div className="text-[10px] font-medium tracking-[0.14em] uppercase text-text-muted mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech stack marquee */}
      <div className="border-t border-border-white overflow-hidden relative py-3.5">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-bg-dark to-transparent z-[2] pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-bg-dark to-transparent z-[2] pointer-events-none" />
        <div className="flex animate-marquee-scroll w-max">
          {[...techStackList, ...techStackList].map((tech, i) => (
            <div
              key={`${tech}-${i}`}
              className="flex items-center gap-2 px-6 py-1 text-[10px] font-medium tracking-[0.16em] uppercase text-text-muted whitespace-nowrap border-r border-border-white hover:text-text-secondary transition-colors duration-200"
            >
              <span className="w-[3px] h-[3px] rounded-full bg-white/50 shrink-0" />
              {tech}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
