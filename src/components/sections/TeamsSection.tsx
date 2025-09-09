"use client";
import { useState } from "react";
import { Users, Target, Trophy, Zap } from "lucide-react";
import Heading from "../ui/Heading";
import { TEAM_MEMBERS } from "../../constants";

export default function TeamsSection() {
  const [activeMember, setActiveMember] = useState<string | null>(null);
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);
  
  // Get featured team members only
  const featuredMembers = TEAM_MEMBERS.filter(member => member.featured);

  return (
    <section id="team" className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="text-sm font-semibold text-yellow-400 bg-yellow-400/10 px-6 py-3 rounded-full border border-yellow-400/20 backdrop-blur-sm flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Our Dream Team
            </span>
          </div>
          
          <Heading 
            level={2} 
            size="5xl" 
            className="text-white mb-6 leading-tight"
          >
            Meet the
            <span className="block bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Visionaries
            </span>
          </Heading>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed mb-12">
            A powerhouse team of creative minds, technical wizards, and strategic thinkers 
            who turn ambitious ideas into digital masterpieces.
          </p>
        </div>

        {/* Team Grid - Hexagonal Layout */}
        <div className="max-w-7xl mx-auto">
          {/* Featured Members - Center Stage */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-16">
            {featuredMembers.map((member, index) => (
              <div
                key={member.id}
                className={`transform transition-all duration-500 hover:scale-110 ${
                  index === 1 ? 'order-1' : index === 0 ? 'order-2' : 'order-3'
                }`}
                style={{
                  animationDelay: `${index * 0.2}s`
                }}
              >
                <HexagonCard 
                  member={member}
                  isActive={activeMember === member.id}
                  isHovered={hoveredMember === member.id}
                  onHover={() => setHoveredMember(member.id)}
                  onLeave={() => setHoveredMember(null)}
                  onClick={() => setActiveMember(activeMember === member.id ? null : member.id)}
                  featured={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Team Stats - Floating Cards */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <FloatingStatCard 
            number="3"
            label="Core Team"
            icon={<Users className="w-8 h-8" />}
            delay="0s"
          />
          <FloatingStatCard 
            number="15+"
            label="Years Combined"
            icon={<Target className="w-8 h-8" />}
            delay="0.2s"
          />
          <FloatingStatCard 
            number="50+"
            label="Projects Delivered"
            icon={<Trophy className="w-8 h-8" />}
            delay="0.4s"
          />
          <FloatingStatCard 
            number="24/7"
            label="Always On"
            icon={<Zap className="w-8 h-8" />}
            delay="0.6s"
          />
        </div>
      </div>
    </section>
  );
}

// Hexagon Card for Featured Members
interface HexagonCardProps {
  member: (typeof TEAM_MEMBERS)[number];
  isActive: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  onClick: () => void;
  featured: boolean;
}

function HexagonCard({ member, isActive, isHovered, onHover, onLeave, onClick }: HexagonCardProps) {
  const [imageError, setImageError] = useState(false);
  
  return (
    <div 
      className="group relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      {/* Hexagon Container */}
      <div className="relative w-48 h-48 mx-auto">
        {/* Hexagon Shape */}
        <div className={`absolute inset-0 bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 rounded-full transform transition-all duration-500 ${
          isActive ? 'scale-110 rotate-12' : 'scale-100 rotate-0'
        } ${isHovered ? 'shadow-2xl' : 'shadow-xl'}`}>
          <div className="absolute inset-2 bg-slate-900 rounded-full flex items-center justify-center overflow-hidden">
            {!imageError ? (
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                <div className="text-center text-slate-400">
                  <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-xs font-medium">Team Member</p>
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Floating Info Card */}
        <div className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-white rounded-xl shadow-2xl p-4 min-w-[200px] transition-all duration-500 ${
          isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}>
          <div className="text-center">
            <h3 className="font-bold text-slate-800 text-lg mb-1">{member.name}</h3>
            <p className="text-yellow-600 font-semibold text-sm mb-2">{member.role}</p>
            <p className="text-slate-600 text-xs leading-relaxed mb-3">{member.bio}</p>
            <div className="flex flex-wrap gap-1 justify-center">
              {member.skills.slice(0, 2).map((skill) => (
                <span key={skill} className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Name and Role */}
      <div className="text-center mt-4">
        <h3 className="text-white font-bold text-lg mb-1">{member.name}</h3>
        <p className="text-yellow-400 font-semibold text-sm">{member.role}</p>
      </div>
    </div>
  );
}


// Floating Stat Card
interface FloatingStatCardProps {
  number: string;
  label: string;
  icon: React.ReactNode;
  delay: string;
}

function FloatingStatCard({ number, label, icon, delay }: FloatingStatCardProps) {
  return (
    <div 
      className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-center border border-slate-700 hover:border-yellow-400/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      style={{
        animationDelay: delay,
        animation: 'fadeInUp 0.6s ease-out forwards'
      }}
    >
      <div className="flex justify-center mb-2 text-yellow-400">{icon}</div>
      <div className="text-2xl font-bold text-white mb-1">{number}</div>
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}
