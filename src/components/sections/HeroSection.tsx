import Heading from "../ui/Heading";
import BookCallButton from "../ui/BookCallButton";
import StatsSection from "./StatsSection";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Noisy Background */}
      <div className="absolute inset-0 noisy-bg hero-gradient"></div>
      
      {/* Main Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center flex-1 flex flex-col justify-center py-20">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Heading */}
          <div className="relative">
            <Heading 
              level={1} 
              size="6xl" 
              className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl tracking-wider leading-none relative"
            >
              {/* Main Brand Name - Professional Style */}
              <span className="text-slate-800 font-bold tracking-widest inline-block">
                helaph
              </span>
              <br />
              
              {/* Solutions - Clean Professional Look */}
              <span className="flex items-center justify-center sm:justify-end gap-4 sm:gap-6 ml-0 sm:ml-8 relative">
                {/* Solutions Text */}
                <span className="text-slate-600 font-semibold tracking-wide text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                  Solutions
                </span>
                
                {/* Professional Growth Arrow */}
                <div className="relative group">
                  <svg 
                    className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 text-yellow-500 mt-1 sm:mt-2 transform group-hover:scale-105 transition-transform duration-200" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" 
                    />
                  </svg>
                </div>
              </span>
            </Heading>
            
            {/* Professional Underline */}
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-yellow-500 rounded-full"></div>
          </div>
          
          {/* Subtitle */}
          <p className="font-indie font-normal text-lg sm:text-xl md:text-2xl text-slate-600 tracking-wide max-w-2xl mx-auto leading-relaxed px-4">
            Turning ideas into impact.
            <br />
            Where vision meets execution.
          </p>
          
          {/* CTA Button */}
          <div className="flex justify-center items-center mt-8 sm:mt-12 px-4">
            <BookCallButton />
          </div>
        </div>
      </div>
      
      {/* Stats Section - Now part of hero */}
      <div className="relative z-10 w-full">
        <StatsSection />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-yellow-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-blue-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse" style={{ animationDelay: '2s' }}></div>
    </section>
  );
}
