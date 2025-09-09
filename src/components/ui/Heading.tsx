import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  weight?: "normal" | "semibold" | "bold";
  tracking?: "tight" | "normal" | "wide" | "wider" | "widest";
}

const sizeClasses = {
  xs: "text-xs",
  sm: "text-sm", 
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
  "2xl": "text-2xl",
  "3xl": "text-3xl",
  "4xl": "text-4xl",
  "5xl": "text-5xl",
  "6xl": "text-6xl"
};

const weightClasses = {
  normal: "font-normal",
  semibold: "font-semibold", 
  bold: "font-bold"
};

const trackingClasses = {
  tight: "tracking-tight",
  normal: "tracking-normal",
  wide: "tracking-wide",
  wider: "tracking-wider",
  widest: "tracking-widest"
};

export default function Heading({
  children,
  level = 1,
  className = "",
  size = "lg",
  weight = "normal",
  tracking = "normal"
}: HeadingProps) {
  const Tag = `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  const classes = `font-indie ${sizeClasses[size]} ${weightClasses[weight]} ${trackingClasses[tracking]} ${className}`;

  return <Tag className={classes}>{children}</Tag>;
}
