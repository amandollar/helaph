"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { Project } from "@/types";

interface ProjectModalContextType {
  activeProject: Project | null;
  isOpen: boolean;
  openProject: (project: Project) => void;
  closeProject: () => void;
}

const ProjectModalContext = createContext<ProjectModalContextType | undefined>(undefined);

export function ProjectModalProvider({ children }: { children: React.ReactNode }) {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const openProject = useCallback((project: Project) => {
    setActiveProject(project);
    setIsOpen(true);
  }, []);

  const closeProject = useCallback(() => {
    setIsOpen(false);
    // Delay clearing the project data to allow for exit animations
    setTimeout(() => setActiveProject(null), 500);
  }, []);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <ProjectModalContext.Provider value={{ activeProject, isOpen, openProject, closeProject }}>
      {children}
    </ProjectModalContext.Provider>
  );
}

export function useProjectModal() {
  const context = useContext(ProjectModalContext);
  if (context === undefined) {
    throw new Error("useProjectModal must be used within a ProjectModalProvider");
  }
  return context;
}
