"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Clock, CheckCircle } from "lucide-react";
import Heading from "../ui/Heading";
import { PROJECTS } from "../../constants";

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  
  // Get unique categories for filter
  const categories = ["All", ...Array.from(new Set(PROJECTS.map(project => project.category)))];
  
  // Filter projects based on active filter
  const filteredProjects = activeFilter === "All" 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeFilter);

  return (
    <section id="projects" className="py-24 bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-yellow-400/10 to-yellow-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-400/10 to-purple-500/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="inline-block">
            <span className="text-xs sm:text-sm font-semibold text-yellow-600 bg-yellow-100 px-3 sm:px-4 py-2 rounded-full mb-4 inline-flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Portfolio Showcase
            </span>
          </div>
          
          <Heading 
            level={2} 
            size="4xl" 
            className="text-slate-800 mb-4 md:mb-6 leading-tight text-3xl sm:text-4xl md:text-5xl"
          >
            Projects That
            <span className="block bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">
              Drive Results
            </span>
          </Heading>
          
          <p className="text-lg sm:text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed mb-8 md:mb-12 px-4">
            Every project tells a story of innovation, precision, and impact. 
            From concept to deployment, we craft digital experiences that not only look stunning 
            but deliver measurable business value.
          </p>
          
          {/* Stats Row */}
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-4xl mx-auto mb-8 md:mb-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">7</div>
              <div className="text-xs sm:text-sm text-slate-600">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">100%</div>
              <div className="text-xs sm:text-sm text-slate-600">Satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-1 sm:mb-2">24/7</div>
              <div className="text-xs sm:text-sm text-slate-600">Support</div>
            </div>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-sm sm:text-base ${
                  activeFilter === category
                    ? "bg-gradient-to-r from-yellow-400 to-yellow-500 text-black shadow-xl scale-105"
                    : "bg-white text-slate-600 hover:bg-slate-100 shadow-lg hover:shadow-xl border border-slate-200"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                index={index}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: (typeof PROJECTS)[number] & { videoUrl?: string };
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, index, isHovered, onHover, onLeave }: ProjectCardProps) {
  const [imageError, setImageError] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);
  
  // Handle video play/pause on hover
  React.useEffect(() => {
    if (videoRef.current && project.videoUrl) {
      if (isHovered) {
        videoRef.current.play().catch((error) => {
          console.error('Video play failed:', error);
          setVideoError(true);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isHovered, project.videoUrl]);

  
  return (
    <div 
      className="group relative"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        animationDelay: `${index * 0.1}s`
      }}
    >
      {/* Main Card */}
      <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:scale-105 sm:hover:-rotate-1">
        {/* Project Media (Video or Image) */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.videoUrl && !videoError ? (
            <video
              ref={videoRef}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              poster={project.image}
              preload="metadata"
              muted
              loop
              playsInline
              onError={() => setVideoError(true)}
              onLoadStart={() => process.env.NODE_ENV === 'development' && console.log('Video loading started')}
              onCanPlay={() => process.env.NODE_ENV === 'development' && console.log('Video can play')}
            >
              <source src={project.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : !imageError ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-700"
              onError={() => setImageError(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 flex items-center justify-center">
              <div className="text-center text-slate-500">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  {videoError ? (
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  ) : (
                    <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  )}
                </div>
                <p className="text-xs sm:text-sm font-medium">
                  {videoError ? 'Video unavailable' : 'Project Preview'}
                </p>
              </div>
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          {/* Featured Badge */}
          {project.featured && (
            <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-yellow-400 to-yellow-500 text-black px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg">
              ⭐ Featured
            </div>
          )}
          
          {/* Video Play Indicator */}
          {project.videoUrl && (
            <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-black/70 backdrop-blur-sm text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg flex items-center gap-1">
              <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
              Video
            </div>
          )}
          
          {/* Category Badge */}
          <div className={`absolute ${project.videoUrl ? 'top-12 right-3 sm:top-16 sm:right-4' : 'top-3 right-3 sm:top-4 sm:right-4'} bg-white/90 backdrop-blur-sm text-slate-800 px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg`}>
            {project.category}
          </div>
          
          {/* Hover Overlay with Quick Actions - Hidden on mobile */}
          <div className={`hidden sm:flex absolute inset-0 items-center justify-center transition-all duration-500 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <div className="flex gap-3">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white text-slate-800 px-6 py-3 rounded-full font-semibold shadow-xl hover:bg-yellow-400 hover:text-black transition-all duration-300 transform hover:scale-110"
              >
                View Live
              </a>
              {project.videoUrl && !videoError && (
                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.play().catch(console.error);
                    }
                  }}
                  className="bg-black/70 text-white px-6 py-3 rounded-full font-semibold shadow-xl hover:bg-black transition-all duration-300 transform hover:scale-110 flex items-center gap-2"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Play Video
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Project Content */}
        <div className="p-3 sm:p-4 md:p-5">
          <div className="mb-2 sm:mb-3">
            <Heading level={3} size="lg" className="text-slate-800 group-hover:text-yellow-600 transition-colors duration-300 text-base sm:text-lg md:text-xl">
              {project.title}
            </Heading>
          </div>
          
          <p className="text-slate-600 mb-3 sm:mb-4 leading-relaxed text-xs sm:text-sm md:text-base line-clamp-2">
            {project.description}
          </p>


          {/* Technologies */}
          <div className="flex flex-wrap gap-1 sm:gap-1.5 mb-3 sm:mb-4">
            {project.technologies.slice(0, 2).map((tech) => (
              <span 
                key={tech}
                className="px-2 py-1 bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 text-xs rounded-full font-medium border border-slate-200"
              >
                {tech}
              </span>
            ))}
            {project.technologies.length > 2 && (
              <span className="px-2 py-1 bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 text-xs rounded-full font-medium border border-yellow-200">
                +{project.technologies.length - 2}
              </span>
            )}
          </div>

          {/* Mobile Action Button */}
          <div className="sm:hidden mb-3">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-slate-800 to-slate-900 text-white px-3 py-2 rounded-lg text-center font-semibold hover:from-slate-900 hover:to-black transition-all duration-300 text-sm"
            >
              View Live
            </a>
          </div>

          {/* Bottom Action Bar */}
          <div className="flex items-center justify-between pt-2 sm:pt-3 border-t border-slate-200">
            <div className="flex items-center gap-1 text-slate-600">
              <Clock className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs">2w</span>
            </div>
            <div className="flex items-center gap-1 text-green-600">
              <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="text-xs font-medium">Live</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className={`absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transition-all duration-500 ${
        isHovered ? 'scale-125 opacity-60' : 'scale-100 opacity-0'
      }`}></div>
      <div className={`absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full transition-all duration-700 ${
        isHovered ? 'scale-110 opacity-60' : 'scale-100 opacity-0'
      }`}></div>
    </div>
  );
}
