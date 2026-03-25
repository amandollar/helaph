// Brand Colors
export const COLORS = {
  primary: "#FF6B46",
  secondary: "#FF8F72", 
  accent: "#FFB09C",
  text: {
    primary: "#F0EDE8",
    secondary: "#7A7875",
    light: "#F0EDE8"
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
  whatsapp: "https://wa.me/916206103436",
  email: "amanreal122@gmail.com",
  phone: "+91 6206103436",
  address: "India"
} as const;

// Services
export const SERVICES = [
  "Web Design",
  "App Development", 
  "Landing Pages",
  "Portfolio Websites",
  "Full-Stack Applications",
  "Mobile Applications"
] as const;

// Main Service Offerings
export const MAIN_SERVICES = [
  {
    id: "landing-pages",
    title: "Landing Pages",
    description: "High-converting landing pages that turn visitors into customers",
    videoUrl: "/videos/LandingPage.mp4",
    thumbnail: "/images/LandingPage.png",
    features: ["Responsive Design", "SEO Optimized", "Fast Loading", "A/B Testing"]
  },
  {
    id: "full-stack-apps",
    title: "Full-Stack Applications",
    description: "End-to-end engineering of complex web ecosystems. We build scalable, secure, and high-performance applications from the ground up, tailored to your business logic.",
    videoUrl: "/videos/Full-stack.mp4", 
    thumbnail: "/images/FullStack.png",
    features: ["Modern Tech Stack", "Scalable Architecture", "API Integration", "Cloud Deployment"]
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description: "Next-generation mobile experiences for iOS and Android. We leverage native and cross-platform technologies to deliver fluid, responsive, and feature-rich apps.",
    videoUrl: "/videos/App.mp4",
    thumbnail: "/images/MobileApp.png", 
    features: ["Cross-Platform", "Native Performance", "App Store Ready", "Push Notifications"]
  },
  {
    id: "portfolio-websites",
    title: "Portfolio Websites",
    description: "Premium digital identity experiences. We craft high-impact, narrative-driven portfolios that showcase your expertise with cinematic quality and technical precision.",
    videoUrl: "/videos/Portfolio.mp4",
    thumbnail: "/images/Portfolio.png",
    features: ["Professional Design", "Portfolio Gallery", "Contact Forms", "SEO Ready"]
  }
] as const;

// Stats
export const STATS = {
  users: "1000+",
} as const;

// Projects Showcase
export const PROJECTS = [
  {
    id: "rowh-ecommerce",
    title: "Rowh - Full stack ecommerce platform",
    description: "A robust, SEO-optimized e-commerce ecosystem engineered with Next.js. Featuring a comprehensive vendor dashboard, secure multi-step checkout, and real-time inventory synchronization for high-scale retail operations.",
    image: "/projects/rowh-in-img1.png",
    liveUrl: "https://rowh.in",
    technologies: ["Next.js", "Tailwind CSS", "Node.js", "MongoDB", "Stripe", "NextAuth"],
    category: "Full-Stack Application",
    featured: true
  },
  {
    id: "eventviewz-management",
    title: "EventViewz - Event Management System",
    description: "A sophisticated multi-tenant event management platform that successfully handled over ₹30k+ in revenue. Built for scalability, it offers seamless registration workflows, dynamic attendee tracking, and integrated analytics.",
    image: "/projects/eventvewiez-img1.png",
    liveUrl: "https://eventviewz.com",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Razorpay", "Tailwind CSS"],
    category: "Full-Stack Application",
    featured: true
  },
  {
    id: "focusdoc-standby-clock",
    title: "FocusDoc - Standby Clock",
    description: "A minimalist, high-performance productivity application optimized for mobile standby. Designed to enhance cognitive focus through elegant visual feedback and frictionless user interaction. Available on Play Store.",
    image: "/projects/focus-doc-app.png",
    liveUrl: "https://play.google.com/store/apps/details?id=com.rishukumarcodes.Standbyclock",
    technologies: ["React Native", "Expo", "Firebase", "Mobile App Development"],
    category: "Mobile Application",
    featured: true
  },
  {
    id: "akshupie-portfolio",
    title: "AkshuPie - Professional Portfolio",
    description: "A collection of premium portfolio experiences. Focused on narrative-driven design and micro-animations that elevate personal brands and professional identities to a global standard.",
    image: "/projects/portfolio1-img.png",
    liveUrl: "https://askhupie.vercel.app/",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
    category: "Portfolio Website",
    featured: true
  }
] as const;


// Team Members
export const TEAM_MEMBERS = [
  {
    id: "engineer-1",
    name: "Aman Sharma",
    role: "Lead Backend Architect",
    bio: "Senior Systems Architect with 2+ years of experience engineering high-availability, scalable web infrastructures. Expert in Node.js, distributed databases, and cloud-native solutions.",
    image: "/images/aman.jpeg",
    skills: ["Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Socket.io"],
    featured: true
  },
  {
    id: "engineer-2",
    name: "Rishu Kumar",
    role: "Head of Design & Frontend",
    bio: "Immersive Frontend Specialist with 2+ years of experience crafting high-performance user interfaces. Passionate about motion design and bridging the gap between aesthetics and functionality.",
    image: "/images/rishu.png",
    skills: ["React", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
    featured: true
  }
] as const;

// Testimonials
export const TESTIMONIALS = [
  {
    id: "testimonial-1",
    name: "Priya Sharma",
    position: "Founder",
    company: "TechStart India",
    testimonial: "Working with Helaph was a game-changer for our business. They delivered a stunning website that perfectly captured our vision and helped us increase our online conversions by 300%. Their attention to detail and communication throughout the project was exceptional.",
    rating: 5,
    project: "E-commerce Platform"
  },
  {
    id: "testimonial-2",
    name: "Rajesh Kumar",
    position: "CEO",
    company: "Digital Solutions Ltd",
    testimonial: "The team at Helaph transformed our outdated website into a modern, mobile-responsive platform. The results speak for themselves - our bounce rate decreased by 60% and user engagement increased significantly. Highly recommended!",
    rating: 5,
    project: "Corporate Website Redesign"
  },
  {
    id: "testimonial-3",
    name: "Anita Patel",
    position: "Marketing Director",
    company: "Creative Agency Pro",
    testimonial: "From concept to launch, Helaph exceeded our expectations. Their technical expertise and creative approach resulted in a website that not only looks amazing but also performs flawlessly. Our clients love the new design!",
    rating: 5,
    project: "Portfolio Website"
  },
  {
    id: "testimonial-4",
    name: "Vikram Singh",
    position: "Business Owner",
    company: "Local Services Co",
    testimonial: "As a small business owner, I was hesitant about investing in a professional website. But Helaph made the process so easy and affordable. The website has helped us reach new customers and grow our business by 200% in just 6 months.",
    rating: 5,
    project: "Small Business Website"
  },
  {
    id: "testimonial-5",
    name: "Deepika Mehta",
    position: "Product Manager",
    company: "StartupXYZ",
    testimonial: "The mobile app Helaph developed for us is absolutely fantastic. The user experience is smooth, the design is intuitive, and the performance is outstanding. They truly understand what users want and need.",
    rating: 5,
    project: "Mobile Application"
  },
  {
    id: "testimonial-6",
    name: "Arjun Gupta",
    position: "Operations Director",
    company: "Manufacturing Corp",
    testimonial: "We needed a complex web application to manage our inventory and customer orders. Helaph delivered exactly what we needed, on time and within budget. Their support after launch has been excellent too.",
    rating: 5,
    project: "Inventory Management System"
  }
] as const;