"use client";
import { useLoading } from "../contexts/LoadingContext";
import Loader from "../components/ui/Loader";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import TeamsSection from "../components/sections/TeamsSection";
import TestimonialsSection from "../components/sections/TestimonialsSection";
import ContactSection from "../components/sections/ContactSection";

export default function Home() {
  const { isLoading } = useLoading();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <ServicesSection />
      <ProjectsSection />
      <TeamsSection />
      <TestimonialsSection />
      <ContactSection />
    </div>
  );
}
