"use client";

import React, { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DM_Sans } from "next/font/google";
import { PROJECTS } from "../../constants";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useProjectModal } from "../../contexts/ProjectModalContext";
import { Project } from "../../types";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

/* ─── Scrolling Image Component ─────────────────────────────────────────────── */
function ScrollingImage({ src, alt }: { src: string; alt: string }) {
  const [ratio, setRatio] = useState(0);

  // The container aspect ratio is 16/26 = 0.615
  // If image ratio (height/width) is > 0.615, it's a long image
  const containerRatio = 26 / 16;
  const isLongImage = ratio > containerRatio;

  return (
    <motion.div 
      className="absolute inset-0 w-full"
      initial={{ y: 0 }}
      animate={isLongImage ? {
        y: [`0%`, `-${(ratio / containerRatio - 1) * 100}%`, `-${(ratio / containerRatio - 1) * 100}%`, `0%`],
      } : {}}
      transition={isLongImage ? {
        duration: (ratio / containerRatio) * 4, // Total loop time
        repeat: Infinity,
        ease: [
          [0.16, 1, 0.3, 1], // Scroll down
          "linear",          // Pause at bottom
          [0.16, 1, 0.3, 1], // Scroll up
        ],
        times: [0, 0.4, 0.6, 1], // Define when each stage happens
      } : {}}
    >
      <Image
        src={src}
        alt={alt}
        width={1000} // Large enough base width
        height={1000 * (ratio || 1)}
        className="w-full h-auto"
        onLoadingComplete={(img) => {
          setRatio(img.naturalHeight / img.naturalWidth);
        }}
        priority
      />
    </motion.div>
  );
}

const techStack = [
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
  { value: "7+", label: "Projects Delivered" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2+", label: "Years Experience" },
  { value: "2", label: "Expert Developers" },
];

const cardConfig = [
  { offset: 0, travel: -60 },
  { offset: 120, travel: -160 },
  { offset: 32, travel: -80 },
  { offset: 112, travel: -144 },
];

/* ─── Single project card ─────────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
  scrollYProgress,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [0, isDesktop ? cardConfig[index].travel : 0],
  );
  const p = project;
  const { openProject } = useProjectModal();

  return (
    <motion.div
      style={{ y, marginTop: isDesktop ? cardConfig[index].offset : 0 }}
      className="flex flex-col group cursor-pointer"
      onClick={() => openProject(p as unknown as Project)}
    >
      {/* Media */}
      <div className="block relative overflow-hidden rounded-[2px] bg-surface transition-transform duration-500 ease-out group-hover:-translate-y-2">
        <div className="relative aspect-[16/26] overflow-hidden">
          <ScrollingImage 
            src={p.homeImage || p.featuredImage || "/images/Projects/FullStack.png"} 
            alt={project.name} 
          />
        </div>
      </div>

      {/* Details */}
      <div className="mt-1 flex flex-col gap-1.5 px-0.5">
        <div className="overflow-hidden">
          <p
            className="text-[11px] font-semibold tracking-[0.15em] uppercase text-accent/60 font-dm-sans translate-y-0 lg:translate-y-[120%] lg:group-hover:translate-y-0 transition-transform duration-700"
            style={{ transitionTimingFunction: "cubic-bezier(0.2, 1, 0.2, 1)" }}
          >
            {project.type}
          </p>
        </div>
        <p className="text-[12px] lg:text-[16px] font-medium text-text-primary leading-[1.15]">
          {(() => {
            let globalIndex = 0;
            return project.name.split(/( )/).map((part, i) => {
              if (part === " ") {
                globalIndex++;
                return <span key={i}> </span>;
              }
              return (
                <span
                  key={i}
                  className="inline-flex overflow-hidden align-bottom"
                >
                  {part.split("").map((char, cIdx) => {
                    const delay = globalIndex * 0.005;
                    globalIndex++;
                    return (
                      <span
                        key={cIdx}
                        className="inline-block translate-y-0 lg:translate-y-[120%] lg:group-hover:translate-y-0 transition-transform duration-700"
                        style={{
                          transitionTimingFunction:
                            "cubic-bezier(0.2, 1, 0.2, 1)",
                          transitionDelay: isDesktop ? `${delay}s` : "0s",
                        }}
                      >
                        {char}
                      </span>
                    );
                  })}
                </span>
              );
            });
          })()}
        </p>
      </div>
    </motion.div>
  );
}

// Moved inside component to handle conditional delays

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
  const displayProjects = PROJECTS.slice(0, 4);
  const sectionRef = useRef<HTMLDivElement>(null);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: skipAnimation ? 0.4 : 3.5,
        staggerChildren: 0.1,
      },
    },
  };

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  return (
    <div className={`${dmSans.variable} font-dm-sans flex flex-col`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
        className="w-full px-6 sm:px-8 lg:px-16 pt-8 lg:pt-12 pb-20"
      >
        {/* Header */}
        <motion.div variants={cardVariants} className="mb-12 sm:mb-16">
          <div className="flex items-center gap-3 text-[18px] font-medium tracking-[0.18em] uppercase text-text-muted/60">
            <span className="w-8 h-[1px] bg-white/20" />
            Recent work
          </div>
        </motion.div>

        {/* Grid — items will now stagger naturally as children of the animated parent */}
        <div
          ref={sectionRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-5 lg:gap-x-6 gap-y-10 lg:gap-y-0 "
        >
          {displayProjects.map((project, i) => (
            <motion.div key={project.id} variants={cardVariants}>
              <ProjectCard
                project={project}
                index={i}
                scrollYProgress={scrollYProgress}
              />
            </motion.div>
          ))}
        </div>

        {/* CTAs — below cards on all screen sizes */}
        <div className="relative flex items-center justify-center min-h-[48px]">
          <Link
            href="/projects"
            className="group inline-flex items-center justify-center gap-2 text-[14px] lg:text-[16px] font-semibold tracking-[0.06em] text-white border border-white/10 px-8 py-4 rounded-[2px] transition-colors duration-200 hover:bg-white/5"
          >
            more work
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
            className="absolute right-0 hidden md:inline-flex items-center gap-2.5 bg-accent text-white text-[14px] lg:text-[16px] font-semibold tracking-[0.06em] px-8 py-4 rounded-[2px] border border-accent hover:bg-[#e85a35] hover:border-[#e85a35] transition-colors duration-200 group"
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
                ${i !== 3 ? "border-r border-border-white" : ""}
              `}
            >
              <div className="text-[40px] font-medium text-text-primary leading-none tracking-[-0.02em]">
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
          {[...techStack, ...techStack].map((tech, i) => (
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
