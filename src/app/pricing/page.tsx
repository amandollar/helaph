"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import Link from "next/link";
import Navbar from "../../components/layout/Navbar";
import ContactSection from "../../components/HomeSections/ContactSection";
import LottieBackground from "../../components/ui/LottieBackground";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

type Currency = "INR" | "USD" | "EUR" | "GBP";

const currencySymbols: Record<Currency, string> = {
  INR: "₹",
  USD: "$",
  EUR: "€",
  GBP: "£",
};

const webPackages = [
  {
    id: "basic-website",
    name: "Basic Website",
    tagline: "Freelancers, creators & personal brands",
    price: {
      INR: "8,000",
      USD: "100",
      EUR: "95",
      GBP: "80",
    },
    delivery: "3–7 days",
    popular: false,
    features: [
      "Single-page responsive website",
      "About, services, portfolio & contact",
      "Smooth animations & transitions",
      "Contact form with email integration",
      "Deployed on Vercel",
      "Up to 5–6 revision rounds",
    ],
  },
  {
    id: "showcase",
    name: "Showcase",
    tagline: "Agencies, NGOs, architects & creative studios",
    price: {
      INR: "20,000",
      USD: "250",
      EUR: "230",
      GBP: "200",
    },
    delivery: "1–3 weeks",
    popular: true,
    features: [
      "Multi-page custom website",
      "Admin dashboard to manage content",
      "Blog & lead tracking system",
      "Gallery, services & project pages",
      "Contact forms & email integrations",
      "Basic SEO setup",
      "Hosting & deployment support",
    ],
  },
  {
    id: "ecommerce",
    name: "E-Commerce",
    tagline: "Online stores & product-based businesses",
    price: {
      INR: "35,000",
      USD: "450",
      EUR: "420",
      GBP: "350",
    },
    delivery: "2–5 weeks",
    popular: false,
    features: [
      "Full e-commerce store",
      "Payment gateway integration",
      "Order & inventory management",
      "Customer accounts & checkout flow",
      "Product filtering & search",
      "Email notification system",
      "Analytics integration",
    ],
  },
  {
    id: "custom",
    name: "Custom",
    tagline: "SaaS platforms, marketplaces & large systems",
    price: {
      INR: "80,000",
      USD: "999",
      EUR: "900",
      GBP: "800",
    },
    delivery: "Scoped to project",
    popular: false,
    features: [
      "Everything in E-Commerce, plus:",
      "CRM & third-party API integrations",
      "Role-based admin systems",
      "Workflow & process automation",
      "Scalable backend architecture",
      "Custom dashboards & analytics",
      "Milestone-based delivery",
    ],
  },
];

const mobilePackages = [
  {
    id: "basic-app",
    name: "Basic App",
    tagline: "Startups & small businesses",
    price: {
      INR: "25,000",
      USD: "300",
      EUR: "280",
      GBP: "250",
    },
    delivery: "4–6 weeks",
    popular: false,
    features: [
      "Single-platform app (iOS or Android)",
      "Up to 8 screens & user flows",
      "Clean UI/UX design",
      "Basic user authentication",
      "App Store / Play Store submission",
      "Up to 3 revision rounds",
    ],
  },
  {
    id: "professional-app",
    name: "Professional",
    tagline: "Growing businesses & service providers",
    price: {
      INR: "45,000",
      USD: "550",
      EUR: "500",
      GBP: "450",
    },
    delivery: "6–10 weeks",
    popular: true,
    features: [
      "Cross-platform app (iOS & Android)",
      "Up to 15 screens & user flows",
      "Custom UI/UX design",
      "User authentication & profiles",
      "Push notifications",
      "API & backend integration",
      "App Store / Play Store submission",
      "Up to 5 revision rounds",
    ],
  },
  {
    id: "enterprise-app",
    name: "Enterprise",
    tagline: "Large businesses & complex workflows",
    price: {
      INR: "80,000",
      USD: "999",
      EUR: "900",
      GBP: "800",
    },
    delivery: "Scoped to project",
    popular: false,
    features: [
      "Everything in Professional, plus:",
      "Multi-role user management",
      "Custom admin dashboard",
      "Third-party API integrations",
      "Advanced analytics & reporting",
      "Scalable cloud backend",
      "Milestone-based delivery",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ease: [0.16, 1, 0.3, 1] as any,
    },
  },
};

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 15 15" fill="none" className="shrink-0 mt-[3px]">
    <path d="M11.5 3.5L6 10L3.5 7.5" stroke="#FF6B46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function PricingCard({
  pkg,
  currency,
}: {
  pkg: {
    id: string;
    name: string;
    tagline: string;
    price: Record<Currency, string>;
    delivery: string;
    popular: boolean;
    features: string[];
  };
  currency: Currency;
}) {
  return (
    <motion.div
      variants={cardVariants}
      className={`relative flex flex-col rounded-[4px] border transition-colors duration-300 group ${
        pkg.popular
          ? "border-accent/40 bg-[#0f0f11]"
          : "border-white/[0.07] bg-[#0a0a0b] hover:border-white/[0.14]"
      }`}
    >
      {/* Popular accent top bar */}
      {pkg.popular && (
        <div className="absolute -top-px left-0 right-0 h-[2px] bg-accent rounded-t-[4px]" />
      )}

      {/* Popular badge */}
      {pkg.popular && (
        <div className="absolute -top-3.5 left-6">
          <span className="inline-flex items-center gap-1.5 bg-accent text-white text-[10px] font-bold tracking-[0.12em] uppercase px-3 py-1 rounded-[2px]">
            <svg width="9" height="9" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            Most Popular
          </span>
        </div>
      )}

      <div className="p-7 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <h3 className="text-white font-semibold text-[18px] mb-1">{pkg.name}</h3>
          <p className="text-text-muted text-[12px] leading-relaxed">{pkg.tagline}</p>
        </div>

        {/* Price */}
        <div className="mb-6 pb-6 border-b border-white/[0.06]">
          <div className="flex items-baseline gap-1.5 flex-wrap">
            <span className="text-text-primary text-[28px] font-light">
              {currencySymbols[currency]}{pkg.price[currency]}
            </span>
            <span className="text-text-muted text-[14px]">onwards</span>
          </div>
          <div className="flex items-center gap-1.5 mt-2">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#7A7875" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
            <span className="text-text-muted text-[11px]">{pkg.delivery}</span>
          </div>
        </div>

        {/* Features */}
        <ul className="flex flex-col gap-2.5 flex-1 mb-7">
          {pkg.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckIcon />
              <span className={`text-[13px] leading-relaxed ${i === 0 && f.includes("plus") ? "text-text-muted font-medium" : "text-text-secondary"}`}>
                {f}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link
          href="/#contact"
          className={`inline-flex items-center justify-center gap-2 text-[13px] font-semibold tracking-[0.06em] px-5 py-3 rounded-[2px] transition-all duration-200 group ${
            pkg.popular
              ? "bg-accent text-white border border-accent hover:bg-[#e85a35] hover:border-[#e85a35]"
              : "border border-white/10 text-text-secondary hover:border-white/25 hover:text-white"
          }`}
        >
          Get started
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform duration-200 group-hover:translate-x-[2px]">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </Link>
      </div>
    </motion.div>
  );
}

export default function PricingPage() {
  const [currency, setCurrency] = useState<Currency>("INR");

  useEffect(() => {
    window.scrollTo(0, 0);
    return () => {
      sessionStorage.setItem("skipHomeAnimation", "true");
    };
  }, []);

  return (
    <div
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans selection:bg-accent selection:text-white`}
      style={{ background: "#080809", minHeight: "100vh", position: "relative" }}
    >
      <LottieBackground />
      <Navbar />

      <div style={{ position: "relative", zIndex: 10 }}>
        <main className="pt-48 lg:pt-64 pb-32">

          {/* ── Hero Section ── */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-16 flex justify-center">
            <motion.h1
              className="font-cormorant text-[16vw] lg:text-[12vw] font-light leading-[0.9] tracking-[-0.02em] text-text-primary overflow-hidden flex pb-[0.25em] -mb-[0.25em]"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {"Our Pricing".split("").map((char, index) => (
                <motion.span
                  key={index}
                  variants={{
                    hidden: { y: "100%", opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                  className={
                    char === " " ? "w-[20px] sm:w-[40px]" : "inline-block"
                  }
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* ── Currency Switcher ── */}
          <div className="w-full px-6 sm:px-8 lg:px-16 mb-24 flex justify-center">
            <div className="flex p-1 bg-[#0d0d0f] border border-white/[0.06] rounded-full">
              {(["INR", "USD", "EUR", "GBP"] as Currency[]).map((cur) => (
                <button
                  key={cur}
                  onClick={() => setCurrency(cur)}
                  className={`relative text-[12px] uppercase tracking-[0.12em] font-medium transition-all duration-300 px-6 py-2.5 rounded-full ${
                    currency === cur
                      ? "text-white"
                      : "text-text-muted hover:text-text-secondary"
                  }`}
                >
                  {currency === cur && (
                    <motion.div
                      layoutId="activeCurrencyBg"
                      className="absolute inset-0 bg-white/[0.04] border border-white/10 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                      }}
                      style={{ zIndex: 0 }}
                    />
                  )}
                  <span className="relative z-10">{cur}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Web Development ── */}
          <section className="px-6 sm:px-8 lg:px-16 mb-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="font-cormorant text-[7vw] sm:text-[5vw] lg:text-[3.5vw] font-light text-text-primary leading-none tracking-[-0.02em]">
                Web Development
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6"
            >
              {webPackages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} currency={currency} />
              ))}
            </motion.div>
          </section>

          {/* ── Mobile Apps ── */}
          <section className="px-6 sm:px-8 lg:px-16 mb-28">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12"
            >
              <h2 className="font-cormorant text-[7vw] sm:text-[5vw] lg:text-[3.5vw] font-light text-text-primary leading-none tracking-[-0.02em]">
                Mobile Apps
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl gap-6"
            >
              {mobilePackages.map((pkg) => (
                <PricingCard key={pkg.id} pkg={pkg} currency={currency} />
              ))}
            </motion.div>
          </section>

          {/* ── Add-ons ── */}
          <section className="px-6 sm:px-8 lg:px-16 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-cormorant text-[5vw] sm:text-[3.5vw] lg:text-[2.5vw] font-light text-text-primary leading-none tracking-[-0.02em] mb-10">
                Add-ons
              </h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl"
              >
                {[
                  {
                    name: "Monthly Maintenance",
                    price: currency === "INR"
                      ? "₹2,000 onwards / mo"
                      : currency === "USD"
                      ? "$25 onwards / mo"
                      : currency === "EUR"
                      ? "€25 onwards / mo"
                      : "£20 onwards / mo",
                    body: "Bug fixes, content updates, security patches, backups & minor feature additions.",
                  },
                  {
                    name: "Extra Revisions",
                    price: "Quoted separately",
                    body: "Revisions beyond your plan limit or major scope changes are agreed upfront.",
                  },
                ].map((addon, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    className="border border-white/[0.07] rounded-[4px] px-7 py-6 bg-[#0a0a0b] hover:border-white/[0.14] transition-colors duration-300"
                  >
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-white font-medium text-[15px]">{addon.name}</h3>
                      <span className="text-accent text-[13px] font-medium whitespace-nowrap">{addon.price}</span>
                    </div>
                    <p className="text-text-secondary text-[13px] leading-relaxed">{addon.body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* ── Terms ── */}
          <section className="px-6 sm:px-8 lg:px-16 mb-24">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <h2 className="font-cormorant text-[5vw] sm:text-[3.5vw] lg:text-[2.5vw] font-light text-text-primary leading-none tracking-[-0.02em] mb-10">
                Good to know
              </h2>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl"
              >
                {[
                  {
                    title: "Payment",
                    body: "50% upfront to begin. Remaining 50% before final deployment. Large projects use milestone-based billing.",
                  },
                  {
                    title: "Not included",
                    body: "Domain, paid hosting, third-party APIs, and subscription tools are billed separately.",
                  },
                  {
                    title: "Before we begin",
                    body: "Project scope must be finalized before development starts. Post-approval changes may affect timeline and cost.",
                  },
                ].map((term, i) => (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    className="group"
                  >
                    <h3 className="text-white/70 text-[12px] font-semibold tracking-[0.08em] mb-3">{term.title}</h3>
                    <p className="text-text-secondary text-[14px] leading-[1.8]">{term.body}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

        </main>

        <ContactSection />
      </div>

      {/* Ambient glow */}
      <div className="fixed top-1/3 -right-32 w-96 h-96 bg-accent/[0.04] rounded-full blur-[140px] pointer-events-none z-0" />
      <div className="fixed bottom-1/3 -left-32 w-96 h-96 bg-accent/[0.03] rounded-full blur-[160px] pointer-events-none z-0" />
    </div>
  );
}
