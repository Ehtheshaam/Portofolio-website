"use client";

import React from "react";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="py-10 border-t border-black/8 bg-[#EAEAE4] relative z-10">
      <div className="max-w-[1550px] mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
        {/* Left: Copyright */}
        <div className="flex flex-col gap-1">
          <span className="text-base font-black text-black tracking-wide">
            Shaik Ehthe Shaamulhaq
          </span>
          <span className="text-sm text-black/40">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>

        {/* Center: Quote */}
        <div className="text-sm text-black/40 flex items-center gap-1.5 justify-center">
          <span>Made with</span>
          <Heart className="w-4 h-4 text-black/40 fill-black/30 animate-pulse" />
          <span>, curiosity, and continuous learning.</span>
        </div>

        {/* Right: Credit */}
        <div className="text-sm text-black/40">
          <span>Designed & Developed by </span>
          <span className="text-black font-bold">Ehthe Shaam</span>
        </div>
      </div>
    </footer>
  );
}
