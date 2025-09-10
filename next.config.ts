import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable experimental features
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.pravatar.cc',
        port: '',
        pathname: '/**',
      },
    ],
  },
  
  // Compression
  compress: true,
  
  // Performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  
  // Bundle analyzer (uncomment when needed)
  // bundleAnalyzer: {
  //   enabled: process.env.ANALYZE === 'true',
  // },
};

export default nextConfig;
