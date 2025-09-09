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
      </div>
    </section>
  );
}
