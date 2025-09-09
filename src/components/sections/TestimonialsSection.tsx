"use client";
import { useState } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import Heading from "../ui/Heading";
import Card from "../ui/Card";
import { TESTIMONIALS } from "../../constants";

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

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
        <div className="text-center mb-16">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-yellow-600 bg-yellow-100 px-6 py-3 rounded-full border border-yellow-200 flex items-center gap-2">
              <Star className="w-4 h-4" />
              Client Testimonials
            </span>
          </div>
          
          <Heading 
            level={2} 
            size="5xl" 
            className="text-slate-800 mb-6 leading-tight"
          >
            What Our Clients
            <span className="block bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </Heading>
          
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Don&apos;t just take our word for it. Here&apos;s what our satisfied clients have to say about their experience working with us.
          </p>
        </div>

        {/* Testimonials Carousel */}
        <div className="max-w-6xl mx-auto">
          <div className="relative">
            {/* Main Testimonial Card */}
            <Card className="p-8 md:p-12 bg-white border-slate-200 shadow-2xl relative overflow-hidden">
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 text-yellow-400/20">
                <Quote className="w-16 h-16" />
              </div>

              {/* Testimonial Content */}
              <div className="relative z-10">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-6">
                  {renderStars(TESTIMONIALS[currentTestimonial].rating)}
                  <span className="ml-2 text-sm text-slate-500">
                    {TESTIMONIALS[currentTestimonial].rating}/5
                  </span>
                </div>

                {/* Testimonial Text */}
                <blockquote className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 italic">
                  &ldquo;{TESTIMONIALS[currentTestimonial].testimonial}&rdquo;
                </blockquote>

                {/* Client Info */}
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                    {TESTIMONIALS[currentTestimonial].name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">
                      {TESTIMONIALS[currentTestimonial].name}
                    </h4>
                    <p className="text-slate-600">
                      {TESTIMONIALS[currentTestimonial].position}
                    </p>
                    <p className="text-sm text-slate-500">
                      {TESTIMONIALS[currentTestimonial].company}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Navigation Arrows */}
            <button
              onClick={prevTestimonial}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-yellow-500 hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextTestimonial}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-slate-600 hover:text-yellow-500 hover:shadow-xl transition-all duration-300 hover:scale-110"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {TESTIMONIALS.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-yellow-500 scale-125"
                    : "bg-slate-300 hover:bg-slate-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              {TESTIMONIALS.length}+
            </div>
            <div className="text-slate-600">Happy Clients</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              4.9
            </div>
            <div className="text-slate-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              100%
            </div>
            <div className="text-slate-600">Satisfaction</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
              24h
            </div>
            <div className="text-slate-600">Response Time</div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-2 text-slate-600 mb-4">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="font-medium">Verified Reviews</span>
          </div>
          <p className="text-slate-500 text-sm">
            All testimonials are from real clients who have worked with us
          </p>
        </div>
      </div>
    </section>
  );
}
