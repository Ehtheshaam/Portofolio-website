"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

export function Portrait() {
  const [hasImage, setHasImage] = useState(true);

  return (
    <div className="relative w-full max-w-[420px] lg:max-w-[480px] mx-auto lg:mr-0">
      {/* Portrait container with rounded-top pill shape */}
      <div
        className="relative w-full overflow-hidden bg-[#D8D5CC]"
        style={{
          borderRadius: "220px 220px 28px 28px",
          aspectRatio: "4/5",
        }}
      >
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src="/portrait.jpg"
            alt="Shaik Ehthe Shaam"
            className="w-full h-full object-cover object-top"
            onError={() => setHasImage(false)}
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-black/30 text-center px-8">
            <div className="w-20 h-20 rounded-full bg-black/10 flex items-center justify-center text-3xl font-black text-black/30 mb-3">
              ES
            </div>
            <span className="text-xs text-black/35">Add portrait.jpg to /public</span>
          </div>
        )}
      </div>
    </div>
  );
}
