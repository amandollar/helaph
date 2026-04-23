"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Cormorant_Garamond } from "next/font/google";
import { useProjectModal } from "@/contexts/ProjectModalContext";
import ProjectCarousel from "./ProjectCarousel";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

export default function ProjectModal() {
  const { activeProject, isOpen, closeProject } = useProjectModal();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  if (!activeProject) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProject}
            className={`${cormorant.variable} fixed inset-0 bg-black/80 backdrop-blur-sm z-[99]`}
          />

          {/* Close Button Above Modal */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={closeProject}
            className="fixed top-8 right-8 z-[110] p-4 bg-surface text-white shadow-2xl hover:scale-110 transition-transform flex items-center justify-center backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Modal Drawer */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className={`fixed bottom-0 left-0 right-0 h-[92vh] bg-[#111112] border-none z-[100] overflow-hidden shadow-2xl flex flex-col font-dm-sans ${cormorant.variable}`}
          >
            {/* Scrollable Container */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar"
              data-lenis-prevent
            >
              {/* Full-width Header inside scrollable container */}
              <div className="flex items-center justify-between px-6 py-8 md:px-12 md:py-16 border-none bg-transparent w-full">
                <div className="flex flex-col gap-2">
                  <h2 className="font-cormorant text-[42px] md:text-[86px] font-medium text-text-primary tracking-tight leading-[0.9]">
                    {activeProject.name}
                  </h2>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <a
                    href={activeProject.LiveLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-accent text-white rounded-none text-[14px] md:text-[16px] font-bold tracking-wide transition-all group whitespace-nowrap"
                  >
                    VISIT LIVE
                  </a>
                </div>
              </div>

              <div className="w-full px-6 py-8 md:px-12 md:py-12 flex flex-col gap-12 md:gap-20">
                {/* Visuals Carousel - Stays same width */}
                <div className="max-w-[1000px] mx-auto w-full">
                  <ProjectCarousel
                    key={activeProject.id}
                    images={activeProject.Graphics}
                  />
                </div>

                {/* Details Section - Wider width */}
                <div className="max-w-[1440px] mx-auto w-full">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 pb-20">
                    {/* Left Column: Descriptions */}
                    <div className="lg:col-span-9 flex flex-col gap-12">
                      <div className="flex flex-col gap-4">
                        <h3 className="text-[12px] md:text-[14px] font-bold text-text-muted uppercase tracking-[0.2em]">
                          About project
                        </h3>
                        <p className="text-[24px] md:text-[34px] text-text-secondary leading-[1.3] font-light">
                          {activeProject["long description"]}
                        </p>
                      </div>

                      <div className="flex flex-col gap-6">
                        <h3 className="text-[12px] md:text-[14px] font-bold text-text-muted uppercase tracking-[0.2em]">
                          Core features
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                          {activeProject.features.map((feature, i) => (
                            <div
                              key={i}
                              className="flex items-center gap-4 py-2 group"
                            >
                              <div className="w-[1px] h-5 bg-white/20 group-hover:bg-accent transition-colors shrink-0" />
                              <span className="text-[16px] md:text-[18px] text-text-secondary font-medium leading-tight">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column: Tech & Meta */}
                    <div className="lg:col-span-3 flex flex-col gap-10">
                      <div className="p-0 flex flex-col gap-12">
                        <div className="flex flex-col gap-8">
                          <h4 className="text-[14px] font-bold tracking-[0.2em] uppercase text-text-muted">
                            Tech Stack
                          </h4>
                          <div className="flex flex-wrap gap-x-6 gap-y-3">
                            {activeProject["tech stack"].map((tech) => (
                              <span
                                key={tech}
                                className="text-[14px] text-text-secondary font-bold cursor-default"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="flex flex-col gap-8 pt-10">
                          <h4 className="text-[14px] font-bold tracking-[0.2em] uppercase text-text-muted">
                            Project Info
                          </h4>
                          <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center">
                              <span className="text-text-muted text-[15px] font-medium">
                                Project Type
                              </span>
                              <span className="text-text-primary text-[15px] font-bold uppercase tracking-wider">
                                {activeProject.type}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-text-muted text-[15px] font-medium">
                                Industry
                              </span>
                              <span className="text-text-primary text-[15px] font-bold">
                                Product Design
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
