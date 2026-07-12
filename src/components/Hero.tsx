"use client";

import React from "react";
import { motion, type Transition } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";

export function Hero() {
  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80 });
      } else {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const easing: Transition["ease"] = [0.16, 1, 0.3, 1];

  return (
    <motion.section
      id="home"
      initial={{ scale: 1.05, filter: "blur(8px)", backgroundColor: "#FFFFFF" }}
      animate={{ scale: 1, filter: "blur(0px)", backgroundColor: "#EAEAE4" }}
      transition={{ duration: 1.4, ease: easing }}
      className="min-h-screen relative flex items-center overflow-hidden"
    >
      <div className="max-w-[1550px] mx-auto w-full px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center pt-24 pb-12 lg:pt-0 lg:pb-0 min-h-screen relative z-10">

        {/* Left: Text Content */}
        <div className="lg:col-span-6 flex flex-col justify-center text-left order-2 lg:order-1 z-20">

          {/* Hi, I'm */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: easing }}
            className="text-xl md:text-2xl font-medium text-black/75 mb-2"
          >
            Hi, I&apos;m
          </motion.p>

          {/* Name - Single Line effect */}
          <div className="overflow-hidden py-1 mb-6">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ delay: 0.4, duration: 0.9, ease: easing }}
              className="text-[38px] sm:text-5xl md:text-6xl lg:text-6xl xl:text-[76px] font-black tracking-tight text-black leading-[1] whitespace-nowrap"
            >
              Shaik Ehthe Shaam
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8, ease: easing }}
            className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-black/60 mb-8"
          >
            Computer Science Engineering Student
          </motion.p>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: easing }}
            className="text-base md:text-lg text-black/55 leading-relaxed max-w-xl mb-12"
          >
            Building AI-powered applications, learning continuously,
            and solving real-world problems through technology.
          </motion.p>

          {/* Buttons - Staggered */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Primary: View Projects */}
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: easing }}
              onClick={() => handleScrollTo("#projects")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-black text-white font-bold text-base tracking-wide hover:bg-black/80 transition-all duration-300 active:scale-95 group"
            >
              View Projects
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </motion.button>

            {/* Secondary: Resume */}
            <motion.a
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: easing }}
              href="/resume.pdf"
              download="Shaik_Ehthe_Shaamulhaq_Resume.pdf"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black/25 bg-transparent text-black font-bold text-base tracking-wide hover:border-black hover:bg-black/5 transition-all duration-300 active:scale-95 group"
            >
              Resume
              <Download className="w-5 h-5" />
            </motion.a>

            {/* Tertiary: Contact */}
            <motion.button
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: easing }}
              onClick={() => handleScrollTo("#contact")}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-black/25 bg-transparent text-black font-bold text-base tracking-wide hover:border-black hover:bg-black/5 transition-all duration-300 active:scale-95 group"
            >
              Contact Me
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </motion.button>
          </div>
        </div>

        {/* Right: Portrait Image (Transparent) */}
        <div className="lg:col-span-6 flex justify-center lg:justify-end items-end order-1 lg:order-2 w-full h-full lg:self-end pt-12 lg:pt-0 relative z-10">
          <motion.img
            initial={{ opacity: 0, x: 80 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            src="/portrait.png"
            alt="Shaik Ehthe Shaam"
            className="w-[105%] sm:w-[100%] md:w-[95%] lg:w-[130%] xl:w-[140%] max-w-[550px] lg:max-w-[850px] xl:max-w-[950px] h-auto max-h-[75vh] lg:max-h-[95vh] object-contain object-bottom drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] lg:mr-[-5%] xl:mr-[-10%]"
          />
        </div>

      </div>
    </motion.section>
  );
}
