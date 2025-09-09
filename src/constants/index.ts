// Brand Colors
export const COLORS = {
  primary: "#bb64ea",
  secondary: "#5c9bed", 
  accent: "#F6D96B",
  text: {
    primary: "#1a1a1a",
    secondary: "#64748b",
    light: "#f8fafc"
  }
} as const;

// Fonts
export const FONTS = {
  indie: "var(--font-indie-flower)",
  sans: "var(--font-indie-flower), cursive"
} as const;

// Animations
export const ANIMATIONS = {
  duration: {
    fast: "0.2s",
    normal: "0.3s", 
    slow: "0.5s"
  },
  easing: {
    ease: "ease",
    easeIn: "ease-in",
    easeOut: "ease-out",
    easeInOut: "ease-in-out"
  }
} as const;

// Breakpoints
export const BREAKPOINTS = {
  sm: "640px",
  md: "768px", 
  lg: "1024px",
  xl: "1280px",
  "2xl": "1536px"
} as const;

// Contact Info
export const CONTACT = {
  whatsapp: "https://wa.me/6206103436",
  email: "hello@helaph.com"
} as const;

// Services
export const SERVICES = [
  "Web Design",
  "Social Media", 
  "Marketing",
  "Paid Ads",
  "Branding",
  "Content Creation"
] as const;

// Main Service Offerings
export const MAIN_SERVICES = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "High-converting landing pages that turn visitors into customers",
    videoUrl: "/videos/landing-pages.mp4",
    thumbnail: "/images/LandingPage.png",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "A/B Testing"]
  },
  {
    id: "full-stack-apps",
    title: "Full-Stack Applications",
    description: "Complete web applications with frontend, backend, and database",
    videoUrl: "/videos/full-stack-apps.mp4", 
    thumbnail: "/images/FullStack.png",
    features: ["Modern Tech Stack", "Scalable Architecture", "API Integration", "Cloud Deployment"]
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps for iOS and Android",
    videoUrl: "/videos/mobile-apps.mp4",
    thumbnail: "/images/MobileApp.png", 
    features: ["Cross-Platform", "Native Performance", "App Store Ready", "Push Notifications"]
  },
  {
    id: "portfolio-websites",
    title: "Portfolio Websites",
    description: "Professional portfolio websites that showcase your work and attract clients",
    videoUrl: "/videos/portfolio-websites.mp4",
    thumbnail: "/images/Portfolio.png",
    features: ["Professional Design", "Portfolio Gallery", "Contact Forms", "SEO Ready"]
  }
] as const;

// Stats
export const STATS = {
  users: "1.2M+",
  funding: "$3M"
} as const;
