"use client";

import React, { useState, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { useMousePosition } from "@/hooks/useMousePosition";
import { Preloader } from "./Preloader";
import Lenis from "lenis";

interface AppWrapperProps {
  children: ReactNode;
}

export function AppWrapper({ children }: AppWrapperProps) {
  const [loading, setLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(false);

  const { mouse, smoothMouse } = useMousePosition();

  // 1. Lenis Smooth Scroll Initialization
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1.05,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
      cancelAnimationFrame(rafId);
    };
  }, [loading]);

  // 2. Custom Cursor Mouseover Event Listeners
  useEffect(() => {
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.getAttribute("role") === "button";

      if (isInteractive) setIsHovered(true);
    };

    const handleMouseOut = () => setIsHovered(false);
    const handleMouseEnterWindow = () => setCursorVisible(true);
    const handleMouseLeaveWindow = () => setCursorVisible(false);

    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);

    if (typeof window !== "undefined" && window.innerWidth > 0) {
      setCursorVisible(true);
    }

    return () => {
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
    };
  }, []);

  // Sync cursor body class list
  useEffect(() => {
    if (typeof document !== "undefined") {
      if (cursorVisible && !loading) {
        document.documentElement.classList.add("custom-cursor-active");
      } else {
        document.documentElement.classList.remove("custom-cursor-active");
      }
    }
  }, [cursorVisible, loading]);

  return (
    <>
      {/* 1. Loading Preloader Overlay */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}

      {/* 2. Custom Cursor (desktop only) */}
      {!loading && cursorVisible && (
        <div className="hidden lg:block pointer-events-none">
          {/* Inner Dot */}
          <motion.div
            style={{ x: mouse.x, y: mouse.y }}
            className="fixed w-1.5 h-1.5 bg-black rounded-full z-50 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none mix-blend-multiply"
          />
          {/* Outer Ring */}
          <motion.div
            style={{ x: smoothMouse.x, y: smoothMouse.y }}
            initial={{
              scale: 1,
              backgroundColor: "rgba(0, 0, 0, 0)",
              borderColor: "rgba(0, 0, 0, 0.3)",
            }}
            animate={{
              scale: isHovered ? 1.6 : 1,
              backgroundColor: isHovered ? "rgba(0, 0, 0, 0.08)" : "rgba(0, 0, 0, 0)",
              borderColor: isHovered ? "rgba(0, 0, 0, 0.5)" : "rgba(0, 0, 0, 0.3)",
            }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="fixed w-9 h-9 border rounded-full z-50 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          />
        </div>
      )}

      {/* 3. Main Site Layout */}
      <div className={loading ? "hidden" : "block"}>
        {children}
      </div>
    </>
  );
}
