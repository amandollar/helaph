"use client";
import { useLoading } from "../contexts/LoadingContext";
import Loader from "../components/ui/Loader";
import Navbar from "../components/layout/Navbar";
import HeroSection from "../components/sections/HeroSection";
import ServicesSection from "../components/sections/ServicesSection";

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
    </div>
  );
}
