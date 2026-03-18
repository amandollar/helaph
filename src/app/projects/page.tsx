"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { PROJECTS } from "../../constants";
import ContactSection from "../../components/HomeSections/ContactSection";
import LottieBackground from "../../components/ui/LottieBackground";
import { ArrowLeft } from "lucide-react";

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
      staggerChildren: 0.1,
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

  const categories = [
    "All",
    ...Array.from(new Set(PROJECTS.map((project) => project.category))),
  ];

  const filteredProjects =
    activeFilter === "All"
      ? PROJECTS
      : PROJECTS.filter((project) => project.category === activeFilter);

  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans selection:bg-accent selection:text-white`}
      style={{
        background: "#080809",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      <LottieBackground />
      
      <div style={{ position: "relative", zIndex: 10 }}>
        {/* Navigation Bar / Back Button */}
        <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-8 lg:px-16 py-8 flex justify-between items-center pointer-events-none">
          <Link 
            href="/" 
            className="group flex items-center gap-3 py-2 px-4 rounded-full bg-surface/40 backdrop-blur-md border border-white/5 hover:border-accent/30 transition-all pointer-events-auto"
          >
            <ArrowLeft className="w-4 h-4 text-text-secondary group-hover:text-accent transition-colors" />
            <span className="text-[12px] font-medium tracking-[0.1em] uppercase text-text-secondary group-hover:text-text-primary transition-colors">
              Back to Home
            </span>
          </Link>
        </nav>

        <main className="pt-40 pb-24">
          {/* Header Section */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-20 lg:mb-28">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <h2 className="text-[12px] sm:text-[14px] font-medium tracking-[0.2em] uppercase text-accent mb-6">
                Portfolio Showcase
              </h2>
              <h1 className="font-cormorant text-[56px] sm:text-[72px] lg:text-[96px] font-light leading-[0.9] tracking-[-0.02em] text-text-primary mb-10">
                Our <span className="italic text-text-secondary">Selected</span> Work
              </h1>
              <p className="max-w-xl text-text-secondary text-[16px] sm:text-[18px] font-light leading-[1.6]">
                A curated selection of digital products we&apos;ve built with precision and passion. 
                From complex applications to high-impact landing pages.
              </p>
            </motion.div>
          </div>

          {/* Filters */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-16">
            <motion.div 
               initial={{ opacity: 0, y: 10 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.2, duration: 0.8 }}
               className="flex flex-wrap gap-x-8 gap-y-4 border-b border-border-white/50 pb-6"
            >
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative text-[12px] uppercase tracking-[0.14em] font-medium transition-all duration-300 pb-1 ${
                    activeFilter === category
                      ? "text-text-primary"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {category}
                  {activeFilter === category && (
                    <motion.div 
                      layoutId="activeFilter"
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent"
                    />
                  )}
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
                  <motion.div
                    key={p.id}
                    variants={itemVariants}
                    layout
                    className="group"
                  >
                    <Link
                      href={p.liveUrl || "#"}
                      target="_blank"
                      className="block relative aspect-[16/10] w-full overflow-hidden rounded-[4px] bg-surface mb-6"
                    >
                      <Image
                        src={p.image || "/projects/project-1.png"}
                        alt={p.title}
                        fill
                        className="object-cover transition-transform duration-1000 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover:scale-[1.05]"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                      
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/10 backdrop-blur-[2px]">
                         <div className="px-6 py-3 rounded-full bg-white text-black text-[12px] font-semibold tracking-widest uppercase transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                           View Live Case
                         </div>
                      </div>
                    </Link>

                    <div className="flex flex-col gap-3">
                         <div className="flex justify-between items-start">
                            <span className="text-[10px] text-accent font-semibold tracking-[0.2em] uppercase">
                               {p.category}
                            </span>
                            <span className="text-[10px] text-text-muted font-light tracking-[0.1em]">
                               {(i + 1).toString().padStart(2, "0")} / {filteredProjects.length.toString().padStart(2, "0")}
                            </span>
                         </div>
                         <h3 className="text-[24px] sm:text-[32px] font-light text-text-primary tracking-[-0.01em] group-hover:text-accent transition-colors duration-300 leading-tight">
                            {p.title}
                         </h3>
                         <p className="text-[14px] text-text-secondary leading-relaxed max-w-xl font-light">
                            {p.description}
                         </p>
                         <div className="flex flex-wrap gap-2 mt-2">
                           {p.technologies?.slice(0, 4).map((tech) => (
                             <span key={tech} className="text-[9px] px-2 py-1 rounded-[2px] bg-white/8 border border-white/12 text-text-secondary uppercase tracking-wider">
                               {tech}
                             </span>
                           ))}
                         </div>
                    </div>
                  </motion.div>
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

