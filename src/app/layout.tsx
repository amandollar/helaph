import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import SmoothScrollProvider from "../components/ui/SmoothScrollProvider";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "helaph — We Build Digital Products That Scale",
    template: "%s | helaph"
  },
  description: "We build full-stack web apps, mobile experiences, and high-converting landing pages. From MVPs to enterprise platforms — turning your vision into reality.",
  keywords: [
    "web development agency",
    "full-stack development",
    "mobile app development",
    "landing pages",
    "portfolio websites",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "helaph",
    "coding agency"
  ],
  authors: [{ name: "helaph" }],
  creator: "helaph",
  publisher: "helaph",
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
    title: 'helaph — We Build Digital Products That Scale',
    description: 'Full-stack web apps, mobile experiences, and high-converting landing pages.',
    siteName: 'helaph',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'helaph — Digital Products That Scale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'helaph — We Build Digital Products That Scale',
    description: 'Full-stack web apps, mobile experiences, and high-converting landing pages.',
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.variable} font-dm-sans antialiased`}
        style={{ fontFamily: 'var(--font-dm-sans), system-ui, sans-serif' }}
      >
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
