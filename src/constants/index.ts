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
    description: "Complete web applications with frontend, backend, and database",
    videoUrl: "/videos/Full-stack.mp4", 
    thumbnail: "/images/FullStack.png",
    features: ["Modern Tech Stack", "Scalable Architecture", "API Integration", "Cloud Deployment"]
  },
  {
    id: "mobile-apps",
    title: "Mobile Applications",
    description: "Native and cross-platform mobile apps for iOS and Android",
    videoUrl: "/videos/App.mp4",
    thumbnail: "/images/MobileApp.png", 
    features: ["Cross-Platform", "Native Performance", "App Store Ready", "Push Notifications"]
  },
  {
    id: "portfolio-websites",
    title: "Portfolio Websites",
    description: "Professional portfolio websites that showcase your work and attract clients",
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
    id: "eduhaven-learning-platform",
    title: "EduHaven - Collaborative Learning Platform",
    description: "A comprehensive full-stack educational platform featuring interactive video lectures, real-time quizzes, discussion forums, and progress tracking. Built with modern web technologies to provide seamless learning experiences for students and educators.",
    image: "/images/EduHaven.png",
    liveUrl: "https://eduhaven.online/",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Socket.io"],
    category: "Full-Stack Application",
    featured: true
  },
  {
    id: "unitrade-trading-platform",
    title: "Unitrade - Modern Trading Platform",
    description: "A sleek and responsive landing page for a cryptocurrency trading platform featuring real-time market data, interactive charts, and user-friendly interface. Designed to convert visitors into active traders.",
    image: "/images/Unitrade.png",
    videoUrl: "/videos/tradeWebsite.mp4",
    liveUrl: "https://uni-trade-nine.vercel.app/",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "Chart.js"],
    category: "Landing Page",
    featured: true
  },
  {
    id: "eventviewz-management-system",
    title: "EventViewz - Event Management System",
    description: "A complete event management solution with event creation, ticket booking, payment processing, and attendee management. Features include real-time updates, QR code generation, and comprehensive admin dashboard.",
    image: "/images/Eventviewz.png",
    videoUrl: "/videos/eventViewz.mp4",
    liveUrl: "https://eventviewz.com/",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Razorpay", "Tailwind CSS", "JWT"],
    category: "Full-Stack Application",
    featured: true
  },
  {
    id: "gamedog-gaming-platform",
    title: "GameDog - Gaming Discovery Platform",
    description: "An innovative gaming platform that helps users discover new games, track updates, and connect with the gaming community. Features include game recommendations, news aggregation, and social features for gamers.",
    image: "/images/Gamedog.png",
    liveUrl: "https://gamedog.vercel.app/",
    technologies: ["React", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "REST APIs"],
    category: "Full-Stack Application",
    featured: true
  },
  {
    id: "focusdoc-mobile-app",
    title: "FocusDoc - Productivity Mobile App",
    description: "A cross-platform mobile application designed to boost productivity with focus timers, task management, and habit tracking. Available on both Android and iOS with offline functionality and cloud sync.",
    image: "/images/FocusDoc.jpeg",
    videoUrl: "/videos/focusDock.mp4",
    liveUrl: "https://play.google.com/store/apps/details?id=com.rishukumarcodes.Standbyclock",
    technologies: ["React Native", "Expo", "Firebase", "AsyncStorage", "Push Notifications"],
    category: "Mobile Application",
    featured: true
  },
  {
    id: "akshupie-portfolio-website",
    title: "AkshuPie - Professional Portfolio",
    description: "A modern, responsive portfolio website showcasing professional work, skills, and achievements. Features smooth animations, dark/light mode, and optimized performance for maximum impact.",
    image: "/images/AkshuPie.png",
    liveUrl: "https://askhupie.vercel.app/",
    technologies: ["React", "Tailwind CSS", "Framer Motion", "TypeScript", "Vercel"],
    category: "Portfolio Website",
    featured: true
  },
  {
    id: "creative-portfolio-website",
    title: "Creative - Modern Portfolio",
    description: "A stunning portfolio website featuring interactive animations, project showcases, and client testimonials. Built with performance optimization and SEO best practices for maximum visibility and engagement.",
    image: "/images/Portfolio.png",
    liveUrl: "https://creative-portfolio-website.vercel.app/",
    technologies: ["GSAP", "TypeScript", "Tailwind CSS", "Framer Motion", "Sanity CMS", "Vercel"],
    category: "Portfolio Website",
    featured: true
  }
] as const;

// Team Members
export const TEAM_MEMBERS = [
  {
    id: "engineer-1",
    name: "Aman Sharma",
    role: "Backend Developer",
    bio: "Full-stack developer with 2+ years of experience in building scalable web applications. Specializes in Node.js, MongoDB, and cloud technologies.",
    image: "/images/aman.jpeg",
    skills: ["Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Socket.io"],
    featured: true
  },
  {
    id: "engineer-2",
    name: "Rishu Kumar",
    role: "Frontend Developer",
    bio: "Frontend specialist with 2+ years of experience in React and modern web technologies. Passionate about creating responsive and interactive user interfaces.",
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