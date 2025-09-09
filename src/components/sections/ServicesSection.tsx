import Heading from "../ui/Heading";
import VideoCard from "../ui/VideoCard";
import { MAIN_SERVICES } from "../../constants";

export default function ServicesSection() {
  return (
    <section id="services" className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Heading 
            level={2} 
            size="4xl" 
            className="text-slate-800 mb-4"
          >
            Our Services
          </Heading>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We create digital solutions that drive results. From stunning landing pages 
            and professional portfolio websites to complex full-stack applications and mobile apps.
          </p>
        </div>

        {/* Services Grid - Staggered Layout */}
        <div className="max-w-7xl mx-auto">
          {/* First Row - 2 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {MAIN_SERVICES.slice(0, 2).map((service, index) => (
              <div
                key={service.id}
                className="group service-card stagger-animation"
                style={{
                  animationDelay: `${index * 0.3}s`
                }}
              >
                <VideoCard
                  title={service.title}
                  videoUrl={service.videoUrl}
                  thumbnail={service.thumbnail}
                  className="h-full"
                />
              </div>
            ))}
          </div>

          {/* Second Row - 2 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {MAIN_SERVICES.slice(2, 4).map((service, index) => (
              <div
                key={service.id}
                className="group service-card stagger-animation"
                style={{
                  animationDelay: `${(index + 2) * 0.3}s`
                }}
              >
                <VideoCard
                  title={service.title}
                  videoUrl={service.videoUrl}
                  thumbnail={service.thumbnail}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <Heading level={3} size="2xl" className="text-slate-800 mb-4">
              Ready to Build Something Amazing?
            </Heading>
            <p className="text-slate-600 mb-6">
              Let&apos;s discuss your project and create something that exceeds your expectations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/6206103436"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
              >
                Start Your Project
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-full hover:border-slate-400 hover:bg-slate-50 transition-all duration-300"
              >
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
