"use client";

import { useEffect, useRef } from "react";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import animationData from "../../../public/animations/background lines wave.json";

export default function LottieBackground() {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  // Slow playback
  useEffect(() => {
    const t = setTimeout(() => {
      lottieRef.current?.setSpeed(0.25);
    }, 150);
    return () => clearTimeout(t);
  }, []);

  // Smooth rAF-based parallax — directly sets transform, no React re-render
  useEffect(() => {
    const el = innerRef.current;
    if (!el) return;

    const onScroll = () => {
      if (rafRef.current !== null) return; // already scheduled
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;
        const scrolled = window.scrollY;
        const totalScrollable =
          document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalScrollable > 0 ? scrolled / totalScrollable : 0;
        // Inner is 250vh tall; it can travel up by (250 - 100) = 150vh
        const translateVh = -progress * 150;
        if (el) el.style.transform = `translateY(${translateVh}vh)`;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // Fixed fullscreen backdrop — sits BEHIND all page content (z-index: 0)
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        zIndex: 0, // behind everything
        pointerEvents: "none",
      }}
    >
      {/* Taller inner container that slides upward on scroll */}
      <div
        ref={innerRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "250vh", // travel room = 250 - 100 = 150vh
          willChange: "transform",
          transform: "translateY(0vh)",
        }}
      >
        <div
          className="lottie-bg-wrap"
          style={{ width: "100%", height: "100%" }}
        >
          <Lottie
            lottieRef={lottieRef}
            animationData={animationData}
            loop
            autoplay
            style={{
              width: "100%",
              height: "100%",
              // Dull amber-orange tint — barely visible on dark bg
              filter:
                "sepia(1) saturate(6) hue-rotate(330deg) brightness(0.6) contrast(1.1)",
              opacity: 0.3,
            }}
            rendererSettings={{
              preserveAspectRatio: "xMidYMid slice",
            }}
          />
        </div>
      </div>
    </div>
  );
}
