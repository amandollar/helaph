import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
  padding?: "sm" | "md" | "lg";
}

const paddingClasses = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8"
};

export default function Card({
  children,
  className = "",
  animated = false,
  padding = "md"
}: CardProps) {
  const baseClasses = "rounded-2xl shadow-lg";
  const animatedClass = animated ? "animated-card" : "";
  const paddingClass = paddingClasses[padding];
  
  return (
    <div className={`${baseClasses} ${animatedClass} ${paddingClass} ${className}`}>
      {children}
    </div>
  );
}
