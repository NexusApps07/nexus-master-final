import type { Metadata, Viewport } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";

// --- FONT CONFIGURATION ---
// Outfit: Modern, clean sans-serif for UI and readability
const sans = Outfit({ 
  subsets: ["latin"], 
  variable: '--font-sans',
  display: 'swap',
});

// Playfair Display: High-end luxury serif for headings and branding
const serif = Playfair_Display({ 
  subsets: ["latin"], 
  variable: '--font-serif',
  display: 'swap',
});

// --- DEPLOYMENT CONSTANTS ---
// These ensure the PWA manifest and icons are found on GitHub Pages
const APP_NAME = process.env.NEXT_PUBLIC_BUSINESS_NAME || "Nexus Master Lab";
const THEME_COLOR = process.env.NEXT_PUBLIC_THEME_COLOR || "#38bdf8";
const REPO_NAME = "nexus-master-final";
const isProd = process.env.NODE_ENV === 'production';
const BASE_PATH = isProd ? `/${REPO_NAME}` : "";

// --- METADATA & PWA BRAIN ---
export const metadata: Metadata = {
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: "Premium Client Portal - Nexus Master Final",
  manifest: `${BASE_PATH}/manifest.json`, 
  icons: {
    icon: `${BASE_PATH}/favicon.ico`,
    apple: `${BASE_PATH}/icon-192x192.png`, 
  },
};

// --- VIEWPORT CONFIGURATION ---
export const viewport: Viewport = {
  themeColor: THEME_COLOR,
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false, // Prevents zooming to maintain "Native App" feel
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
        {/* Persistent background gradient for the luxury aesthetic */}
        <div className="fixed inset-0 bg-gradient-to-b from-black via-slate-950 to-black pointer-events-none -z-50" />
        
        {children}
      </body>
    </html>
  );
}