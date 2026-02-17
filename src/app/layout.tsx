import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

// 1. IMPORT BRANDING (Tab Title) 
// Note: We REMOVED "Navbar" so the fixed header is gone.
import DynamicBranding from "@/components/DynamicBranding";

const sans = Outfit({ 
  subsets: ["latin"], 
  variable: '--font-sans',
  display: 'swap',
});

const serif = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-serif',
  display: 'swap',
});

// Deployment Constants
const APP_NAME = "Loading Portal..."; 
const THEME_COLOR = process.env.NEXT_PUBLIC_THEME_COLOR || "#38bdf8";
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

export const metadata: Metadata = {
  title: APP_NAME,
  description: "Premium Client Portal",
  manifest: `${BASE_PATH}/manifest.json`, 
  icons: {
    icon: `${BASE_PATH}/favicon.ico`,
    apple: `${BASE_PATH}/icon-192x192.png`, 
  },
};

export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-black overscroll-none scroll-smooth">
      <body 
        className={`
          ${sans.variable} 
          ${serif.variable} 
          font-sans 
          antialiased 
          text-neutral-200 
          selection:bg-nexusBlue/30 
          min-h-screen
          bg-[#050505]
        `}
      >
        {/* This updates the Browser Tab Title (e.g. "Island Dog | Portal") */}
        <DynamicBranding />

        {/* Navbar removed as requested to keep original design */}

        <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-950 to-black pointer-events-none -z-50" />
        
        {children}
      </body>
    </html>
  );
}
