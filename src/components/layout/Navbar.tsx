'use client';
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "py-3 bg-slate-800/90 backdrop-blur-md shadow-lg" : "py-6 bg-transparent"}`}>
        <div className="container mx-auto px-4 flex justify-center">
          <div className={`w-full sm:w-[90%] md:w-[85%] lg:w-[70%] xl:w-[50%] flex items-center justify-between text-white px-4 sm:px-6 py-3 rounded-full shadow-lg transition-all duration-300 ${isScrolled ? "bg-slate-800/80 backdrop-blur-sm border border-slate-600/50" : "bg-slate-900/60 backdrop-blur-sm border border-slate-700/30"}`}>
            {/* Logo */}
            <Link href="/" className="font-indie font-normal text-2xl text-white flex items-center tracking-wider">
              <span className="bg-yellow-400 text-black rounded-full w-8 h-8 flex items-center justify-center mr-3 font-indie font-normal text-lg">h</span>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                helaph
              </span>
            </Link>

            {/* Divider - Hidden on mobile */}
            <span className="w-px h-6 bg-slate-600 hidden md:block"></span>

            {/* Menu Items - Hidden on mobile */}
            <ul className="hidden lg:flex gap-8 xl:gap-10 text-sm xl:text-base">
              <li className="cursor-pointer group">
                <Link href="#services" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Services
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#projects" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Projects
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#team" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Team
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#testimonials" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Testimonials
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#contact" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Contact
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
            </ul>

            {/* Tablet Menu - Show on md screens */}
            <ul className="hidden md:flex lg:hidden gap-6 text-sm">
              <li className="cursor-pointer group">
                <Link href="#services" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Services
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#projects" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Projects
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#team" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Team
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#testimonials" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Reviews
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
              <li className="cursor-pointer group">
                <Link href="#contact" className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-500 group-hover:tracking-widest relative tracking-wide">
                  Contact
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-700 ease-out"></span>
                </Link>
              </li>
            </ul>



            {/* Mobile Menu Button */}
            <button
              className="lg:hidden flex flex-col justify-center items-center w-8 h-8"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"></span>
              <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-1.5"></span>
              <span className="bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm"></span>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 left-0 w-full h-screen bg-slate-900/95 backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          <button
            className={`absolute top-6 right-6 text-white text-5xl font-indie font-normal hover:text-yellow-400 transition-all duration-500 hover:scale-110 hover:rotate-90 ${isMobileMenuOpen ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
            style={{ animationDelay: '0.8s' }}
          >
            &times;
          </button>

          <ul className="flex flex-col items-center gap-10 text-3xl">
            <li className={`group transform transition-all duration-700 ease-out hover:scale-105 ${isMobileMenuOpen ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.1s' }}>
              <Link 
                href="#services" 
                className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-700 hover:tracking-widest relative block tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-900 ease-out"></span>
              </Link>
            </li>
            <li className={`group transform transition-all duration-700 ease-out hover:scale-105 ${isMobileMenuOpen ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.2s' }}>
              <Link 
                href="#projects" 
                className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-700 hover:tracking-widest relative block tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Projects
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-900 ease-out"></span>
              </Link>
            </li>
            <li className={`group transform transition-all duration-700 ease-out hover:scale-105 ${isMobileMenuOpen ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.3s' }}>
              <Link 
                href="#team" 
                className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-700 hover:tracking-widest relative block tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Team
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-900 ease-out"></span>
              </Link>
            </li>
            <li className={`group transform transition-all duration-700 ease-out hover:scale-105 ${isMobileMenuOpen ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.4s' }}>
              <Link 
                href="#testimonials" 
                className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-700 hover:tracking-widest relative block tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Testimonials
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-900 ease-out"></span>
              </Link>
            </li>
            <li className={`group transform transition-all duration-700 ease-out hover:scale-105 ${isMobileMenuOpen ? 'animate-fade-in-up' : 'opacity-0 translate-y-4'}`} style={{ animationDelay: '0.5s' }}>
              <Link 
                href="#contact" 
                className="font-indie font-normal text-slate-300 hover:text-yellow-400 transition-all duration-700 hover:tracking-widest relative block tracking-wider"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 group-hover:w-full transition-all duration-900 ease-out"></span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Add some spacing at the top for content */}
      <div className="h-24"></div>
    </>
  );
}
