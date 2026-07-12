"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const GREETINGS = [
  "Hello",
  "Hola",
  "Bonjour",
  "مرحبا",
  "नमस्ते",
  "こんにちは",
  "안녕하세요",
  "Olá",
  "Hallo",
  "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
  "నమస్కారం",
  "வணக்கம்"
];

interface PreloaderProps {
  onComplete: () => void;
}

export function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const w = window.innerWidth;
    const h = window.innerHeight;

    if (pathRef.current) {
      pathRef.current.setAttribute("d", `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} Z`);
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        onComplete();
      }
    });

    // Logo phase
    tl.fromTo(logoRef.current,
      { opacity: 0, scale: 0.8, filter: "blur(10px)" },
      { opacity: 1, scale: 1, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
    );
    tl.to(logoRef.current, {
      scale: 1.05,
      duration: 0.6,
      yoyo: true,
      repeat: 1,
      ease: "power1.inOut"
    }, "-=0.2");
    tl.to(logoRef.current,
      { opacity: 0, scale: 1.1, filter: "blur(10px)", duration: 0.6, ease: "power3.in" }
    );

    // Greetings phase starts
    const intervalTime = 160;
    const totalGreetingTime = GREETINGS.length * intervalTime;

    tl.fromTo(textRef.current,
      { opacity: 0, y: 20, filter: "blur(5px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.4, ease: "power3.out" },
      "+=0.1"
    );

    let greetingTimer: NodeJS.Timeout;
    tl.add(() => {
      let currentIndex = 0;
      greetingTimer = setInterval(() => {
        if (currentIndex < GREETINGS.length - 1) {
          currentIndex++;
          setIndex(currentIndex);
        } else {
          clearInterval(greetingTimer);
        }
      }, intervalTime);
    }, "-=0.2");

    tl.to({}, { duration: totalGreetingTime / 1000 + 0.2 });

    tl.to(textRef.current, {
      opacity: 0,
      scale: 0.9,
      filter: "blur(10px)",
      duration: 0.4,
      ease: "power3.in"
    });

    // Slide up liquid transition
    const curveHeight = 120;

    tl.to(pathRef.current, {
      attr: { d: `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h - curveHeight} 0 ${h} Z` },
      duration: 0.35,
      ease: "power2.in"
    });

    tl.to(containerRef.current, {
      y: -h - curveHeight,
      duration: 0.85,
      ease: "power4.inOut"
    }, "-=0.1");

    tl.to(pathRef.current, {
      attr: { d: `M0 0 L${w} 0 L${w} 0 Q${w / 2} 0 0 0 Z` },
      duration: 0.85,
      ease: "power4.inOut"
    }, "-=" + 0.85);

    const handleResize = () => {
      const rw = window.innerWidth;
      const rh = window.innerHeight;
      if (pathRef.current && containerRef.current) {
        const currentY = gsap.getProperty(containerRef.current, "y") as number;
        if (currentY === 0) {
          pathRef.current.setAttribute("d", `M0 0 L${rw} 0 L${rw} ${rh} Q${rw / 2} ${rh} 0 ${rh} Z`);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearInterval(greetingTimer);
      window.removeEventListener("resize", handleResize);
    };
  }, [onComplete]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full z-[99] flex items-center justify-center select-none"
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* Background SVG — light cream color */}
      <svg
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        style={{ height: "calc(100% + 120px)", fill: "#EAEAE4" }}
      >
        <path ref={pathRef} />
      </svg>

      {/* 1. Logo */}
      <div ref={logoRef} className="absolute z-10 flex flex-col items-center gap-4 opacity-0 pointer-events-none">
        <div className="relative w-20 h-20 flex items-center justify-center rounded-full border border-black/15 bg-black shadow-2xl">
          <span className="font-bold text-2xl tracking-widest text-white">E</span>
        </div>
        <span className="text-xs font-semibold uppercase tracking-[0.25em] text-black/50">
          Ehthe Shaamulhaq
        </span>
      </div>

      {/* 2. Greetings */}
      <div
        ref={textRef}
        className="absolute z-10 flex flex-col items-center opacity-0 pointer-events-none"
      >
        <h1
          className="text-5xl md:text-7xl font-black text-black flex items-center gap-4 select-none tracking-tight"
        >
          <span className="inline-block w-3 h-3 rounded-full bg-black/30" />
          {GREETINGS[index]}
        </h1>
      </div>
    </div>
  );
}
