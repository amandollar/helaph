import type { Metadata } from "next";
import { 
  Indie_Flower
} from "next/font/google";
import { LoadingProvider } from "../contexts/LoadingContext";
import "./globals.css";

const indieFlower = Indie_Flower({
  variable: "--font-indie-flower",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "helaph Solutions - Web Development & Digital Solutions",
    template: "%s | helaph Solutions"
  },
  description: "Professional web development services including full-stack applications, mobile apps, landing pages, and portfolio websites. Turning ideas into impact with modern technology.",
  keywords: [
    "web development",
    "full-stack development", 
    "mobile app development",
    "landing pages",
    "portfolio websites",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript"
  ],
  authors: [{ name: "helaph Solutions" }],
  creator: "helaph Solutions",
  publisher: "helaph Solutions",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://helaph.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://helaph.com',
    title: 'helaph Solutions - Web Development & Digital Solutions',
    description: 'Professional web development services including full-stack applications, mobile apps, landing pages, and portfolio websites.',
    siteName: 'helaph Solutions',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'helaph Solutions - Web Development Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'helaph Solutions - Web Development & Digital Solutions',
    description: 'Professional web development services including full-stack applications, mobile apps, landing pages, and portfolio websites.',
    images: ['/images/twitter-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${indieFlower.variable} antialiased`}
      >
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </body>
    </html>
  );
}
