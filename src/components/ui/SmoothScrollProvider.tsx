"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { useProjectModal } from "../../contexts/ProjectModalContext";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isOpen } = useProjectModal();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,          // scroll easing duration in seconds
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
    });
    
    lenisRef.current = lenis;

    // Feed lenis into a requestAnimationFrame loop
    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (lenisRef.current) {
      if (isOpen) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [isOpen]);

  return <>{children}</>;
}
