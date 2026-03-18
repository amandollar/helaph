"use client";
import HeroSection from "../components/HomeSections/HeroSection";
import ServicesSection from "../components/HomeSections/ServicesSection";
import ProjectsSection from "../components/HomeSections/ProjectsSection";
import TestimonialsSection from "../components/HomeSections/TestimonialsSection";
import ContactSection from "../components/HomeSections/ContactSection";
import LottieBackground from "../components/ui/LottieBackground";
import { Navbar } from "@/components";

export default function Home() {
  return (
    <div style={{ background: "#070711", position: "relative" }}>
      <LottieBackground />
      <div style={{ position: "relative", zIndex: 1 }}>
        <Navbar />
        <HeroSection />
        <ProjectsSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </div>
    </div>
  );
}
