import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SEO News Hub - Latest Search Engine Optimization News & Insights",
    template: "%s | SEO News Hub"
  },
  description: "Real-time SEO news aggregator covering Google algorithm updates, Core Web Vitals, ranking factors, and search optimization trends. Expert analysis and insights updated every 4 hours.",
  keywords: [
    "SEO news",
    "Google algorithm updates",
    "search engine optimization",
    "Core Web Vitals",
    "ranking factors",
    "SEO trends 2026",
    "Google Search Central",
    "E-E-A-T",
    "technical SEO",
    "local SEO"
  ],
  authors: [{ name: "SEO News Hub Team", url: "https://peta-simple-website.vercel.app" }],
  creator: "SEO News Hub",
  publisher: "SEO News Hub",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://peta-simple-website.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "SEO News Hub - Latest Search Engine Optimization News",
    description: "Real-time SEO news covering Google updates, Core Web Vitals, and ranking factors. Updated every 4 hours.",
    url: 'https://peta-simple-website.vercel.app',
    siteName: 'SEO News Hub',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'SEO News Hub - Real-time SEO News Aggregator',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SEO News Hub - Latest SEO News & Updates',
    description: 'Real-time SEO news covering Google algorithm changes, Core Web Vitals, and optimization trends.',
    images: ['/og-image.png'],
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
    // Add Google Search Console verification when available
    // google: 'your-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
