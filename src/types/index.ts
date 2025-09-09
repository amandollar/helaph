// Component Props
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Button Props
export interface ButtonProps extends BaseComponentProps {
  href?: string;
  variant?: "primary" | "secondary" | "gradient";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

// Card Props
export interface CardProps extends BaseComponentProps {
  animated?: boolean;
  padding?: "sm" | "md" | "lg";
}

// Heading Props
export interface HeadingProps extends BaseComponentProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl";
  weight?: "normal" | "semibold" | "bold";
  tracking?: "tight" | "normal" | "wide" | "wider" | "widest";
}

// Navbar Props
export interface NavbarProps {
  isScrolled?: boolean;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
}

// Stats Data
export interface StatItem {
  value: string;
  description: string;
  variant?: "primary" | "secondary";
}

// Testimonial Data
export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
  rating: number;
  avatar?: string;
}

// Service Data
export interface Service {
  name: string;
  variant?: "primary" | "secondary" | "accent";
}
