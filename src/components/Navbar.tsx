"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const lenis = (window as any).lenis;
      if (lenis) {
        lenis.scrollTo(targetElement, { offset: -80 });
      } else {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = targetElement.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ease-out ${isScrolled
          ? "py-3 md:py-4 bg-[#EAEAE4]/90 backdrop-blur-xl border-b border-black/5"
          : "py-5 md:py-6 bg-transparent"
          }`}
      >
        <div className="max-w-[1550px] mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-4 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full border border-black/20 bg-black flex items-center justify-center font-bold text-base text-white tracking-wider transition-all duration-300 group-hover:bg-black/80">
              E
            </div>
            <span className="font-bold tracking-widest text-sm uppercase text-black hidden sm:inline-block transition-colors duration-300">
              EHTHE SHAAM
            </span>
          </a>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="relative px-5 py-2.5 rounded-full font-semibold text-base text-black/60 hover:text-black transition-colors duration-200 select-none"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Let's Talk CTA button */}
          <div className="hidden lg:block">
            <a
              href="#contact"
              onClick={(e) => handleLinkClick(e, "#contact")}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white font-bold text-base tracking-wide transition-all duration-300 hover:bg-black/80 select-none group"
            >
              Let&apos;s Talk
              <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-full border border-black/15 bg-white/60 text-black hover:bg-white active:scale-95 transition-all duration-300 z-50 relative"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100%" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 w-full h-screen bg-[#EAEAE4]/98 backdrop-blur-xl flex flex-col justify-between p-8 pt-28"
          >
            <div className="max-w-7xl mx-auto w-full px-6 flex flex-col gap-8 mt-8">
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/40">
                Navigation
              </span>
              <nav className="flex flex-col gap-5">
                {NAV_ITEMS.map((item, idx) => (
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 * idx + 0.15, duration: 0.4 }}
                    key={item.label}
                  >
                    <a
                      href={item.href}
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="font-bold text-4xl md:text-5xl tracking-tight text-black/80 hover:text-black transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </motion.div>
                ))}
              </nav>
            </div>

            <div className="max-w-7xl mx-auto w-full px-6 border-t border-black/10 py-6 flex flex-col sm:flex-row justify-between gap-4 text-xs text-black/40">
              <div className="flex gap-4">
                <a href="mailto:skehtheshaam2006@gmail.com" className="hover:text-black transition-colors duration-200">Email</a>
                <a href="https://github.com/Ehtheshaam" className="hover:text-black transition-colors duration-200">GitHub</a>
                <a href="https://www.linkedin.com/in/shaik-ehthe-shaam-99762837b" className="hover:text-black transition-colors duration-200">LinkedIn</a>
              </div>
              <span>© {new Date().getFullYear()} Shaik Ehthe Shaamulhaq</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
