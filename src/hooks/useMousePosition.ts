"use client";

import { useEffect } from "react";
import { useMotionValue, useSpring } from "framer-motion";

export function useMousePosition() {
  const mouse = {
    x: useMotionValue(0),
    y: useMotionValue(0),
  };

  const springConfig = { damping: 30, stiffness: 150, mass: 0.5 };
  
  const smoothMouse = {
    x: useSpring(mouse.x, springConfig),
    y: useSpring(mouse.y, springConfig),
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x.set(e.clientX);
      mouse.y.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouse.x, mouse.y]);

  return { mouse, smoothMouse };
}
