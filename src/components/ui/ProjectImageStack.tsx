"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useInView, animate } from "framer-motion";

interface ProjectImageStackProps {
  graphics: string[];
  isHovered: boolean;
  isMobile?: boolean;
}

export default function ProjectImageStack({
  graphics,
  isHovered,
  isMobile = false,
}: ProjectImageStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.15 });

  // Safe fallback for images
  const images = graphics && graphics.length > 0
    ? graphics
    : ["/images/Projects/Rowh/ROWH_graphic_1.webp"];

  const numImages = images.length;

  // Single motion value representing scroll progress (0 = top, 1 = bottom)
  const scrollProgress = useMotionValue(0);

  // Smooth spring physics for scroll movement
  const springConfig = { damping: 30, stiffness: 75, mass: 0.7 };
  const smoothProgress = useSpring(scrollProgress, springConfig);

  // Map 0 -> 1 to the translation percent
  // E.g. if 3 images, translation is 0% to -66.67% of the track height
  const maxScrollPercent = numImages > 1 ? -((numImages - 1) / numImages) * 100 : 0;
  const yTranslate = useTransform(smoothProgress, [0, 1], ["0%", `${maxScrollPercent}%`]);

  // Motion values for tilt effect (relative X/Y cursor progress)
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const tiltConfig = { damping: 35, stiffness: 90, mass: 0.6 };
  const smoothX = useSpring(mouseX, tiltConfig);
  const smoothY = useSpring(mouseY, tiltConfig);

  // 3D rotations based on cursor position
  const rotateX = useTransform(smoothY, [0, 1], [4, -4]);
  const rotateY = useTransform(smoothX, [0, 1], [-4, 4]);

  // Parallax translation for the ambient glow
  const glowY = useTransform(smoothProgress, [0, 1], ["-8%", "8%"]);

  // Smooth scale on hover
  const scale = useSpring(isHovered ? 1.025 : 1, { damping: 25, stiffness: 120 });

  // Handle auto-scroll loop when NOT hovered and component IS in view
  useEffect(() => {
    if (isHovered || !isInView || numImages <= 1) {
      return;
    }

    // Gentle oscillation: animate from current progress to 1, then to 0, and repeat
    const controls = animate(scrollProgress, [scrollProgress.get(), 1, 0], {
      duration: Math.max(10, numImages * 5.5), // slow, linear cinematic pace (5.5s per image)
      ease: "easeInOut",
      repeat: Infinity,
      repeatType: "reverse",
    });

    return () => {
      controls.stop();
    };
  }, [isHovered, isInView, numImages, scrollProgress]);

  // Handle mouse move over the card to track vertical scrolling
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Relative coordinates between 0 and 1
    const relX = (e.clientX - rect.left) / rect.width;
    const relY = (e.clientY - rect.top) / rect.height;
    
    const clampedX = Math.max(0, Math.min(1, relX));
    const clampedY = Math.max(0, Math.min(1, relY));

    // Update scroll target and tilt values
    scrollProgress.set(clampedY);
    mouseX.set(clampedX);
    mouseY.set(clampedY);
  };

  // Reset tilt coordinates when cursor leaves card
  const handleMouseLeave = () => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // ─── RENDERING ──────────────────────────────────────────────────────────
  if (isMobile) {
    return (
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="w-full h-full flex items-center justify-center overflow-visible select-none"
        style={{ perspective: 1200 }}
      >
        {/* Ambient Glow Backdrop */}
        <motion.div 
          style={{ y: glowY }}
          className="absolute inset-0 -z-10 opacity-25 blur-[35px] scale-[1.05] transition-all duration-700 ease-out group-hover:scale-[1.12] group-hover:opacity-40 pointer-events-none"
        >
          <Image
            src={images[0]}
            alt="Ambient Mobile Glow"
            fill
            className="object-cover object-top opacity-60 rounded-full"
          />
        </motion.div>

        {/* 3D Tilting Phone Mockup Frame */}
        <motion.div
          style={{
            rotateX: isHovered ? rotateX : 0,
            rotateY: isHovered ? rotateY : 0,
            scale,
            transformStyle: "preserve-3d",
          }}
          className="relative h-full aspect-[9/16] max-h-full overflow-hidden rounded-[24px] border-4 border-[#121214] bg-[#0c0c0e] shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col z-20"
        >
          {/* In-view entrance swipe reveal */}
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0 bg-neutral-950 origin-top z-40 pointer-events-none"
          />
          <motion.div
            initial={{ scaleY: 1 }}
            whileInView={{ scaleY: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
            className="absolute inset-0 bg-accent origin-top z-35 pointer-events-none"
          />

          {/* Viewport Masked Container */}
          <div className="relative w-full h-full overflow-hidden rounded-[18px]">
            {/* Scrollable vertical image strip */}
            <motion.div
              style={{ y: yTranslate }}
              className="flex flex-col w-full h-auto will-change-transform"
            >
              {images.map((src, index) => (
                <div key={index} className="relative w-full aspect-[9/16] shrink-0">
                  <Image
                    src={src}
                    alt={`Mobile Walkthrough ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 40vw, 20vw"
                    className="object-cover object-top"
                    priority={index === 0}
                    loading={index === 0 ? undefined : "lazy"}
                  />
                </div>
              ))}
            </motion.div>

            {/* Glass reflection sheen */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.06] pointer-events-none z-20" />

            {/* Top and Bottom Cinematic Gradients */}
            <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/75 via-transparent to-transparent pointer-events-none z-20" />
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none z-20" />

            {/* Mobile Status Bar / Dynamic Island Representation */}
            <div className="absolute top-0 left-0 right-0 h-6 flex items-center justify-center z-30 pointer-events-none">
              <div className="w-16 h-3 bg-black/90 rounded-full border border-white/5" />
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-1.5 left-0 right-0 flex justify-center z-30 pointer-events-none">
              <div className="w-16 h-1 bg-white/20 rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Desktop landscape browser view
  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full flex items-center justify-center overflow-visible select-none"
      style={{ perspective: 1200 }}
    >
      {/* Ambient Glow Backdrop */}
      <motion.div 
        style={{ y: glowY }}
        className="absolute inset-0 -z-10 opacity-25 blur-[35px] scale-[1.05] transition-all duration-700 ease-out group-hover:scale-[1.12] group-hover:opacity-40 pointer-events-none"
      >
        <Image
          src={images[0]}
          alt="Ambient Desktop Glow"
          fill
          className="object-cover object-top opacity-60 rounded-full"
        />
      </motion.div>

      {/* 3D Tilting Browser mockup Frame */}
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          scale,
          transformStyle: "preserve-3d",
        }}
        className="relative w-full h-full overflow-hidden rounded-[10px] border border-white/10 bg-[#0c0c0e] shadow-[0_20px_50px_rgba(0,0,0,0.65)] flex flex-col z-20"
      >
        {/* In-view entrance swipe reveal */}
        <motion.div
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="absolute inset-0 bg-neutral-950 origin-top z-40 pointer-events-none"
        />
        <motion.div
          initial={{ scaleY: 1 }}
          whileInView={{ scaleY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.05 }}
          className="absolute inset-0 bg-accent origin-top z-35 pointer-events-none"
        />

        {/* Viewport Masked Container */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Scrollable vertical image strip */}
          <motion.div
            style={{ y: yTranslate }}
            className="flex flex-col w-full h-auto will-change-transform"
          >
            {images.map((src, index) => (
              <div key={index} className="relative w-full aspect-[16/10] shrink-0">
                <Image
                  src={src}
                  alt={`Desktop Walkthrough ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 80vw, 45vw"
                  className="object-cover object-top"
                  priority={index === 0}
                  loading={index === 0 ? undefined : "lazy"}
                />
              </div>
            ))}
          </motion.div>

          {/* Glass reflection sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/[0.02] to-white/[0.06] pointer-events-none z-20" />

          {/* Top and Bottom Cinematic Gradients */}
          <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/75 via-transparent to-transparent pointer-events-none z-20" />
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/85 via-transparent to-transparent pointer-events-none z-20" />

          {/* Browser Address Bar Mock */}
          <div className="absolute top-0 left-0 right-0 h-8 bg-[#09090b]/80 backdrop-blur-md border-b border-white/5 flex items-center px-4 gap-2 z-30 pointer-events-none">
            {/* Traffic Light Dots */}
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-white/10" />
              <span className="w-2 h-2 rounded-full bg-white/10" />
              <span className="w-2 h-2 rounded-full bg-white/10" />
            </div>
            {/* Mock Address Field */}
            <div className="flex-1 max-w-[160px] mx-auto h-4 bg-white/5 rounded-[4px] flex items-center justify-center">
              <div className="w-16 h-1 bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
