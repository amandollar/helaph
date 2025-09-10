"use client";
import { useState, useRef, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Heading from "../ui/Heading";
import Card from "../ui/Card";
import { TESTIMONIALS } from "../../constants";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => 
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index: number) => {
    setCurrentTestimonial(index);
  };

  // Touch gesture handling
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextTestimonial();
    } else if (isRightSwipe) {
      prevTestimonial();
    }
  };

  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => 
        prev === TESTIMONIALS.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-slate-300"
        }`}
      />
    ));
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-green-400/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-block mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-semibold text-yellow-600 bg-yellow-100 px-4 sm:px-6 py-2 sm:py-3 rounded-full border border-yellow-200 flex items-center gap-2">
              <Star className="w-3 h-3 sm:w-4 sm:h-4" />
              Client Testimonials
            </span>
          </div>
          
          <Heading 
            level={2} 
            size="5xl" 
            className="text-slate-800 mb-4 sm:mb-6 leading-tight text-3xl sm:text-4xl lg:text-5xl"
          >
            What Our Clients
            <span className="block bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </Heading>
          
          <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
                Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <div 
            ref={carouselRef}
            className="relative"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {/* Main Testimonial Card */}
            <Card className="p-4 sm:p-6 md:p-8 lg:p-12 bg-white border-slate-200 shadow-2xl relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 sm:top-6 sm:right-6 text-yellow-400/20">
                <Quote className="w-12 h-12 sm:w-16 sm:h-16" />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10 pr-8 sm:pr-12">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4 sm:mb-6">
                  {renderStars(TESTIMONIALS[currentTestimonial].rating)}
                  <span className="ml-2 text-xs sm:text-sm text-slate-500">
                    {TESTIMONIALS[currentTestimonial].rating}/5
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed mb-6 sm:mb-8 italic">
                  &ldquo;{TESTIMONIALS[currentTestimonial].testimonial}&rdquo;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg sm:text-xl flex-shrink-0">
                    {TESTIMONIALS[currentTestimonial].name.charAt(0)}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-base sm:text-lg font-semibold text-slate-800 truncate">
                      {TESTIMONIALS[currentTestimonial].name}
                    </h4>
                    <p className="text-sm sm:text-base text-slate-600 truncate">
                      {TESTIMONIALS[currentTestimonial].position}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-500 truncate">
                      {TESTIMONIALS[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute -left-2 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-yellow-500 hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute -right-2 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-yellow-500 hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6 sm:mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                  index === currentTestimonial
                    ? "bg-yellow-500 scale-125"
                    : "bg-slate-300 hover:bg-slate-400 active:bg-slate-500"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 max-w-4xl mx-auto">
          <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">
              {TESTIMONIALS.length}+
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Happy Clients</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">
              4.9
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Average Rating</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">
              100%
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Satisfaction</div>
          </div>
          <div className="text-center p-3 sm:p-4 bg-white/50 rounded-lg">
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">
              24h
            </div>
            <div className="text-xs sm:text-sm text-slate-600">Response Time</div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 sm:mt-16 text-center px-4">
          <div className="inline-flex items-center gap-2 text-slate-600 mb-3 sm:mb-4">
            <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            <span className="font-medium text-sm sm:text-base">Verified Reviews</span>
          </div>
          <p className="text-slate-500 text-xs sm:text-sm max-w-2xl mx-auto">
            All testimonials are from real clients who have worked with us
          </p>
        </div>
      </div>
    </section>
  );
}
