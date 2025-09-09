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
  email: "amanreal122@gmail.com",
  phone: "+91 6206103436",
  address: "India"
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

// Projects Showcase
export const PROJECTS = [
  {
    id: "ecommerce-platform",
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with payment integration, inventory management, and admin dashboard",
    image: "/images/projects/ecommerce-preview.jpg",
    liveUrl: "https://ecommerce-demo.helaph.com",
    githubUrl: "https://github.com/helaph/ecommerce-platform",
    technologies: ["React", "Node.js", "MongoDB", "Stripe", "Tailwind CSS"],
    category: "Full-Stack Application",
    featured: true
  },
  {
    id: "portfolio-website",
    title: "Portfolio Website",
    description: "Modern, responsive portfolio website with smooth animations and contact forms",
    image: "/images/projects/portfolio-preview.jpg",
    liveUrl: "https://portfolio-demo.helaph.com",
    githubUrl: "https://github.com/helaph/portfolio-website",
    technologies: ["Next.js", "TypeScript", "Framer Motion", "Tailwind CSS"],
    category: "Portfolio Website",
    featured: true
  },
  {
    id: "mobile-app",
    title: "Task Management App",
    description: "Cross-platform mobile app for task management with real-time synchronization",
    image: "/images/projects/mobile-app-preview.jpg",
    liveUrl: "https://apps.apple.com/app/taskmanager",
    githubUrl: "https://github.com/helaph/task-manager-app",
    technologies: ["React Native", "Firebase", "Redux", "Expo"],
    category: "Mobile Application",
    featured: true
  },
  {
    id: "landing-page",
    title: "SaaS Landing Page",
    description: "High-converting landing page for SaaS product with A/B testing and analytics",
    image: "/images/projects/landing-page-preview.jpg",
    liveUrl: "https://saas-landing.helaph.com",
    githubUrl: "https://github.com/helaph/saas-landing",
    technologies: ["Next.js", "Framer Motion", "Tailwind CSS", "Vercel Analytics"],
    category: "Landing Page",
    featured: false
  },
  {
    id: "dashboard-app",
    title: "Analytics Dashboard",
    description: "Real-time analytics dashboard with data visualization and reporting features",
    image: "/images/projects/dashboard-preview.jpg",
    liveUrl: "https://dashboard-demo.helaph.com",
    githubUrl: "https://github.com/helaph/analytics-dashboard",
    technologies: ["React", "D3.js", "Node.js", "PostgreSQL", "Chart.js"],
    category: "Full-Stack Application",
    featured: false
  },
  {
    id: "restaurant-website",
    title: "Restaurant Website",
    description: "Beautiful restaurant website with online ordering, menu management, and reservations",
    image: "/images/projects/restaurant-preview.jpg",
    liveUrl: "https://restaurant-demo.helaph.com",
    githubUrl: "https://github.com/helaph/restaurant-website",
    technologies: ["Next.js", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    category: "Business Website",
    featured: false
  }
] as const;

// Team Members
export const TEAM_MEMBERS = [
  {
    id: "founder-ceo",
    name: "Alex Johnson",
    role: "Founder & CEO",
    bio: "Visionary leader with 8+ years in digital transformation. Passionate about creating solutions that drive real business impact.",
    image: "/images/team/alex-johnson.jpg",
    social: {
      linkedin: "https://linkedin.com/in/alexjohnson",
      twitter: "https://twitter.com/alexjohnson",
      email: "alex@helaph.com"
    },
    skills: ["Strategy", "Leadership", "Product Vision"],
    featured: true
  },
  {
    id: "lead-developer",
    name: "Sarah Chen",
    role: "Lead Developer",
    bio: "Full-stack expert specializing in modern web technologies. Loves building scalable applications that users love.",
    image: "/images/team/sarah-chen.jpg",
    social: {
      linkedin: "https://linkedin.com/in/sarahchen",
      github: "https://github.com/sarahchen",
      email: "sarah@helaph.com"
    },
    skills: ["React", "Node.js", "TypeScript"],
    featured: true
  },
  {
    id: "design-director",
    name: "Marcus Rodriguez",
    role: "Design Director",
    bio: "Creative director with an eye for detail. Transforms complex ideas into beautiful, intuitive user experiences.",
    image: "/images/team/marcus-rodriguez.jpg",
    social: {
      linkedin: "https://linkedin.com/in/marcusrodriguez",
      dribbble: "https://dribbble.com/marcusrodriguez",
      email: "marcus@helaph.com"
    },
    skills: ["UI/UX", "Branding", "Figma"],
    featured: true
  },
  {
    id: "mobile-specialist",
    name: "Emma Thompson",
    role: "Mobile Specialist",
    bio: "Cross-platform mobile expert who creates apps that work seamlessly across all devices and platforms.",
    image: "/images/team/emma-thompson.jpg",
    social: {
      linkedin: "https://linkedin.com/in/emmathompson",
      twitter: "https://twitter.com/emmathompson",
      email: "emma@helaph.com"
    },
    skills: ["React Native", "Flutter", "iOS"],
    featured: false
  },
  {
    id: "devops-engineer",
    name: "David Kim",
    role: "DevOps Engineer",
    bio: "Infrastructure specialist ensuring our applications are fast, secure, and always available for our clients.",
    image: "/images/team/david-kim.jpg",
    social: {
      linkedin: "https://linkedin.com/in/davidkim",
      github: "https://github.com/davidkim",
      email: "david@helaph.com"
    },
    skills: ["AWS", "Docker", "Kubernetes"],
    featured: false
  },
  {
    id: "project-manager",
    name: "Lisa Wang",
    role: "Project Manager",
    bio: "Organizational mastermind who keeps projects on track and clients happy. Expert in agile methodologies.",
    image: "/images/team/lisa-wang.jpg",
    social: {
      linkedin: "https://linkedin.com/in/lisawang",
      email: "lisa@helaph.com"
    },
    skills: ["Agile", "Scrum", "Client Relations"],
    featured: false
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