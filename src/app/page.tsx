"use client";
import React, { useState, useEffect } from "react";
import HeroSection from "../components/HomeSections/HeroSection";
import ServicesSection from "../components/HomeSections/ServicesSection";
import ProjectsSection from "../components/HomeSections/ProjectsSection";
import TestimonialsSection from "../components/HomeSections/TestimonialsSection";
import ContactSection from "../components/HomeSections/ContactSection";
import LottieBackground from "../components/ui/LottieBackground";
import { Navbar, WhoAreWeSection } from "@/components";

export default function Home() {
  const [isReturningFromProjects, setIsReturningFromProjects] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const fromProjects = sessionStorage.getItem("fromProjects") === "true";
      if (fromProjects) {
        setIsReturningFromProjects(true);
        // We'll let the children components handle clearing the flag if needed, 
        // or clear it here after a short delay to ensure all children saw it.
        setTimeout(() => {
          sessionStorage.removeItem("fromProjects");
        }, 1000);
      }
    }
  }, []);

  return (
    <div style={{ background: "#110704ff", position: "relative" }}>
      <LottieBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroSection skipAnimationProp={isReturningFromProjects} />
        <ProjectsSection skipAnimation={isReturningFromProjects} />
        <ServicesSection />
        <TestimonialsSection />
        <WhoAreWeSection />
        <ContactSection />
      </div>
    </div>
  );
}
