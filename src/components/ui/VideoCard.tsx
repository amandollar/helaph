"use client";
import { useState, useRef } from "react";

interface VideoCardProps {
  title: string;
  videoUrl: string;
  thumbnail: string;
  className?: string;
}

export default function VideoCard({
  title,
  videoUrl,
  thumbnail,
  className = ""
}: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [showPlaceholder, setShowPlaceholder] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = async () => {
    if (isLoading || isPlaying) return;
    
    // If video already has an error, show placeholder
    if (videoError) {
      setShowPlaceholder(true);
      return;
    }
    
    setIsLoading(true);
    try {
      if (videoRef.current) {
        await videoRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.warn('Video play failed:', error);
      setVideoError(true);
      setShowPlaceholder(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePause = () => {
    if (!isPlaying) return;
    
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      className={`group cursor-pointer tv-card ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* TV Frame */}
      <div className="relative bg-slate-800 rounded-xl p-3 tv-glow">
        {/* TV Screen Bezel */}
        <div className="bg-slate-900 rounded-lg p-1.5 shadow-inner">
          {/* TV Screen */}
          <div className="relative aspect-video bg-black rounded-md overflow-hidden tv-screen-glow">
            {/* Thumbnail Image - Shows when video is not playing */}
            {!isPlaying && !isLoading && !showPlaceholder && !thumbnailError && (
              <img
                src={thumbnail}
                alt={title}
                className="w-full h-full object-cover"
                onError={() => {
                  console.warn(`Thumbnail ${thumbnail} failed to load`);
                  setThumbnailError(true);
                }}
              />
            )}

            {/* Fallback background when thumbnail fails to load */}
            {!isPlaying && !isLoading && !showPlaceholder && thumbnailError && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center">
                <div className="text-center text-white/60">
                  <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-3 border border-white/20">
                    <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium">{title}</p>
                </div>
              </div>
            )}

            {/* Video Element - Only visible when playing */}
            <video
              ref={videoRef}
              className={`w-full h-full object-cover ${isPlaying ? 'block' : 'hidden'}`}
              muted
              loop
              onPlay={() => {
                setIsPlaying(true);
                setIsLoading(false);
              }}
              onPause={() => {
                setIsPlaying(false);
                setIsLoading(false);
              }}
              onError={() => {
                console.warn(`Video ${videoUrl} failed to load`);
                setVideoError(true);
                setIsLoading(false);
                // Only show placeholder if we actually tried to play a video
                if (isPlaying) {
                  setShowPlaceholder(true);
                }
              }}
              onLoadStart={() => setIsLoading(true)}
              onCanPlay={() => setIsLoading(false)}
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* TV Screen Glow Effect */}
            <div className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none"></div>

            {/* Placeholder for missing video */}
            {showPlaceholder && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-white/20">
                    <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  <p className="text-sm opacity-80 font-medium">Click to View Demo</p>
                </div>
              </div>
            )}

            {/* TV Channel Info Overlay */}
            <div className="absolute top-2 left-2 bg-black/70 text-white px-1.5 py-0.5 rounded text-xs font-mono">
              {title.toUpperCase()}
            </div>

            {/* Play/Pause Overlay */}
            <div 
              className="absolute inset-0 flex items-center justify-center bg-black/50 transition-all duration-300"
              style={{ 
                opacity: (isHovered && !isPlaying && !isLoading && !showPlaceholder) ? 1 : 0,
                backdropFilter: (isHovered && !isPlaying && !isLoading && !showPlaceholder) ? 'blur(2px)' : 'none'
              }}
              onClick={isLoading ? undefined : (isPlaying ? handlePause : handlePlay)}
            >
              <div className={`w-14 h-14 bg-white/95 rounded-full flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-200 shadow-xl ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-slate-800 border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <svg className="w-6 h-6 text-slate-800" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-slate-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </div>
            </div>

            {/* TV Controls */}
            <div className="absolute bottom-2 right-2 flex gap-1">
              <button
                onClick={isLoading ? undefined : (isPlaying ? handlePause : handlePlay)}
                disabled={isLoading}
                className={`w-6 h-6 bg-black/70 hover:bg-black/90 rounded-full flex items-center justify-center transition-colors duration-200 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="w-3 h-3 border border-white border-t-transparent rounded-full animate-spin"></div>
                ) : isPlaying ? (
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
                  </svg>
                ) : (
                  <svg className="w-3 h-3 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                )}
              </button>
            </div>

            {/* TV Scan Lines Effect */}
            <div className="absolute inset-0 pointer-events-none tv-scan-lines"></div>
          </div>
        </div>

        {/* TV Stand */}
        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-slate-700 rounded-full"></div>
      </div>

    </div>
  );
}
