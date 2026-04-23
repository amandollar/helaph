"use client";
import React, { useRef, useState, FormEvent } from "react";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { CONTACT } from "../../constants";
import {
  ArrowDown,
  Twitter,
  Instagram,
  Linkedin,
  ArrowRight,
  Loader2,
  CheckCircle2,
  XCircle,
} from "lucide-react";

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

const FormField = ({
  number,
  label,
  placeholder,
  name,
  value,
  onChange,
  type = "text",
  isSelect = false,
  isTextArea = false,
  required = true,
}: {
  number: string;
  label: string;
  placeholder: string;
  name: string;
  value: string;
  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  type?: string;
  isSelect?: boolean;
  isTextArea?: boolean;
  required?: boolean;
}) => (
  <div className="flex flex-col gap-4 border-b border-white/10 pb-6 group">
    <div className="flex items-center gap-4">
      <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-[12px] text-text-secondary group-hover:border-accent transition-colors duration-300">
        {number}
      </div>
      <label className="text-[14px] sm:text-[16px] font-medium text-text-primary">
        {label}
      </label>
    </div>
    {isSelect ? (
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="w-full bg-transparent text-[16px] text-text-secondary outline-none appearance-none cursor-pointer py-2"
        >
          <option value="" disabled>
            {placeholder}
          </option>
          <option value="Web Development">Web Development</option>
          <option value="Mobile App">Mobile App</option>
          <option value="UI/UX Design">UI/UX Design</option>
          <option value="Other">Other</option>
        </select>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg
            width="10"
            height="6"
            viewBox="0 0 10 6"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeOpacity="0.5" />
          </svg>
        </div>
      </div>
    ) : isTextArea ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="bg-transparent text-[16px] text-text-secondary outline-none resize-none h-12 py-2 placeholder:text-text-secondary/30"
      />
    ) : (
      <input
        name={name}
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        required={required}
        className="bg-transparent text-[16px] text-text-secondary outline-none py-2 placeholder:text-text-secondary/30"
      />
    )}
  </div>
);

const CircularBadge = () => (
  <motion.div className="relative w-40 h-40 flex items-center justify-center">
    <motion.div
      className="absolute inset-0"
      animate={{ rotate: 360 }}
      transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
    >
      <svg className="w-full h-full" viewBox="0 0 100 100">
        <defs>
          <path
            id="circlePath"
            d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
          />
        </defs>
        <text className="fill-accent font-bold text-[7.5px] tracking-[0.2em] uppercase">
          <textPath xlinkHref="#circlePath">
            Get in touch • Get in touch • Get in touch •
          </textPath>
        </text>
      </svg>
    </motion.div>
    <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center z-10 shadow-lg shadow-accent/20">
      <ArrowDown className="text-black w-8 h-8" />
    </div>
  </motion.div>
);

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    user_phone: "",
    user_company: "",
    service: "",
    budget: "",
    message: "",
  });

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
      );
      setStatus("success");
      setFormData({
        user_name: "",
        user_email: "",
        user_phone: "",
        user_company: "",
        service: "",
        budget: "",
        message: "",
      });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`${dmSans.variable} ${cormorant.variable} font-dm-sans flex flex-col w-full bg-transparent pt-20 lg:pt-32 pb-20`}
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16 w-full">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start mb-20 gap-12">
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              className="font-cormorant text-[64px] sm:text-[80px] lg:text-[100px] leading-[0.9] tracking-[-0.02em] text-text-primary mb-8"
            >
              Turn ideas into <br />
              <span className="italic text-text-secondary">reality!</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 }}
              className="text-text-secondary text-[16px] sm:text-[18px] max-w-sm leading-relaxed"
            >
              Let us help you become even greater at what you do. Fill out the
              following form and we will get back to you in the next 24 hours.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="hidden lg:block mr-12"
          >
            <CircularBadge />
          </motion.div>
        </div>

        {/* Main Content (Form + Sidebar) */}
        <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
          {/* Form Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            className="flex-1"
          >
            <form onSubmit={handleSubmit} className="space-y-10">
              <FormField
                number="01"
                label="What's your name?"
                placeholder="Type your full name"
                name="user_name"
                value={formData.user_name}
                onChange={handleChange}
              />
              <FormField
                number="02"
                label="What's your email address?"
                placeholder="example@email.com"
                type="email"
                name="user_email"
                value={formData.user_email}
                onChange={handleChange}
              />
              <FormField
                number="03"
                label="What's your phone number?"
                placeholder="+11 2222 333344"
                type="tel"
                name="user_phone"
                value={formData.user_phone}
                onChange={handleChange}
              />
              <FormField
                number="04"
                label="What's your company/organization name?"
                placeholder="Type your company/organization name"
                name="user_company"
                value={formData.user_company}
                onChange={handleChange}
              />
              <FormField
                number="05"
                label="What's services are you looking for?"
                placeholder="Choose from a list here"
                isSelect
                name="service"
                value={formData.service}
                onChange={handleChange}
              />
              <FormField
                number="06"
                label="What have you budgeted for this project?"
                placeholder="Enter your budget range"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
              />
              <FormField
                number="07"
                label="Tell us about your project"
                placeholder="Please type your project description"
                isTextArea
                name="message"
                value={formData.message}
                onChange={handleChange}
              />

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-6">
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="group flex items-center gap-6 bg-transparent border border-white/20 px-8 py-5 rounded-full text-text-primary hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="text-[13px] font-bold tracking-[0.2em] uppercase">
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-black/10 transition-colors">
                    {status === "loading" ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                    )}
                  </div>
                </button>

                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-green-400 font-medium"
                  >
                    <CheckCircle2 size={20} />
                    <span>Message sent successfully!</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-red-400 font-medium"
                  >
                    <XCircle size={20} />
                    <span>Failed to send. Please try again.</span>
                  </motion.div>
                )}
              </div>
            </form>
          </motion.div>

          {/* Sidebar Column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="w-full lg:w-[350px] space-y-16"
          >
            {/* Mobile Circular Badge */}
            <div className="lg:hidden flex justify-center mb-12">
              <CircularBadge />
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-bold tracking-[0.3em] text-text-secondary/50 uppercase">
                Call Us
              </h3>
              <div className="space-y-2 text-text-primary text-[20px] font-light">
                <p>+91 62061 03436</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-bold tracking-[0.3em] text-text-secondary/50 uppercase">
                Address
              </h3>
              <p className="text-text-primary text-[20px] font-light leading-relaxed">
                Mumbai,
                <br />
                Maharashtra,
                <br />
                India
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-[11px] font-bold tracking-[0.3em] text-text-secondary/50 uppercase">
                Email
              </h3>
              <a
                href={`mailto:${CONTACT.email}`}
                className="text-text-primary text-[20px] font-light hover:text-accent transition-colors duration-300"
              >
                {CONTACT.email}
              </a>
            </div>

            <div className="space-y-8 pt-12">
              <h3 className="text-[11px] font-bold tracking-[0.3em] text-text-secondary/50 uppercase">
                Socials
              </h3>
              <div className="flex flex-col">
                {[
                  { 
                    name: "Twitter / X", 
                    Icon: Twitter,
                    href: CONTACT.socials.x 
                  },
                  { 
                    name: "Instagram", 
                    Icon: Instagram,
                    href: CONTACT.socials.instagram 
                  },
                  { 
                    name: "LinkedIn", 
                    Icon: Linkedin,
                    href: CONTACT.socials.linkedin 
                  },
                ].map((item, idx) => (
                  <motion.a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-6 border-b border-white/10 hover:border-accent transition-colors duration-500"
                  >
                    <div className="flex items-center gap-6">
                      <div className="text-text-secondary group-hover:text-accent transition-colors duration-300">
                        <item.Icon size={32} strokeWidth={1} />
                      </div>
                      <h4 className="font-cormorant text-[24px] sm:text-[30px] italic font-light text-text-primary leading-tight group-hover:text-white transition-colors">
                        {item.name}
                      </h4>
                    </div>
                    <div className="relative w-14 h-14 rounded-full border border-white/10 flex items-center justify-center overflow-hidden transition-all duration-500 group-hover:border-accent">
                      <motion.div 
                        className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"
                      />
                      <ArrowRight 
                        size={24} 
                        className="relative z-10 text-white group-hover:text-black -rotate-45 group-hover:rotate-0 transition-all duration-500" 
                      />
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Brand Logo Section - Massive Full Width Display */}
      <div className="mt-32 w-full overflow-hidden pb-4">
        <div className="flex items-center gap-[2vw] group cursor-default justify-center">
          <img
            src="/images/icons/helpah_dark.webp"
            alt="helaph Logo"
            className="w-[12vw] h-[12vw] object-contain transition-transform duration-700 ease-out"
          />
          <h2 className="text-white font-black text-[18vw] leading-[0.8] tracking-[-0.05em] uppercase select-none pointer-events-none transition-colors duration-500">
            helaph
          </h2>
        </div>
      </div>
    </section>
  );
}
