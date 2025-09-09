"use client";
import { useState, useEffect } from "react";

interface LoaderProps {
  onComplete?: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Hide loader after completion
          setTimeout(() => {
            setIsVisible(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15; // Random increment for realistic feel
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-slate-900 z-50 flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800"></div>
      
      {/* Main Loader Content */}
      <div className="relative z-10 text-center">
        {/* Brand Logo/Text */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white tracking-widest mb-2">
            helaph
          </h1>
          <p className="text-slate-400 text-lg tracking-wide">Solutions</p>
        </div>

        {/* Loading Spinner */}
        <div className="relative mb-8">
          <div className="w-20 h-20 mx-auto relative">
            {/* Outer Ring */}
            <div className="absolute inset-0 border-4 border-slate-700 rounded-full"></div>
            {/* Progress Ring */}
            <div 
              className="absolute inset-0 border-4 border-yellow-500 rounded-full border-t-transparent transition-all duration-300 ease-out"
              style={{
                transform: `rotate(${progress * 3.6}deg)`,
                clipPath: `polygon(0 0, 100% 0, 100% ${progress}%, 0 ${progress}%)`
              }}
            ></div>
            {/* Inner Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-64 mx-auto mb-4">
          <div className="w-full bg-slate-700 rounded-full h-1 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Progress Text */}
        <div className="text-slate-400 text-sm">
          <span className="font-mono">{Math.round(progress)}%</span>
          <span className="ml-2">Loading...</span>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex justify-center mt-6 space-x-1">
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-2 h-2 bg-yellow-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-yellow-400/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-blue-400/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </div>
  );
}
