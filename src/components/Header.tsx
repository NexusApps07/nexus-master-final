"use client";

import { useState, useEffect } from "react";
// REMOVED: import { usePathname } from "next/navigation"; (Unused import causing warning)

export default function Header() {
  const [businessName, setBusinessName] = useState("Loading...");

  useEffect(() => {
    // 1. Safety Check: Stop execution if not in browser
    if (typeof window === "undefined") return;

    // 2. Get the current URL path safely
    const path = window.location.pathname;
    
    // 3. Extract the repo name
    // The filter(Boolean) removes empty strings from the split array
    const parts = path.split("/").filter(Boolean);
    
    // If on localhost (root /), parts might be empty.
    // If on GitHub Pages (/repo-name/), parts[0] is the repo name.
    const slug = parts.length > 0 ? parts[0] : null;

    if (slug) {
      // 4. Format it
      const formattedName = slug
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      setBusinessName(formattedName);
    } else {
      setBusinessName("Nexus Portal"); // Fallback for localhost
    }
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/50 backdrop-blur-md border-b border-white/10">
      <div className="max-w-md mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* The Smart Business Name */}
        <h1 className="font-serif text-xl text-white tracking-wide">
          {businessName}
        </h1>

        {/* Menu Icon */}
        <button className="p-2 text-white/80 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
