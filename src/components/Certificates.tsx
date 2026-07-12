"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRightLeft, ShieldCheck } from "lucide-react";

interface CertificateCardProps {
  title: string;
  issuer: string;
  skills: string[];
}

function CertificateCard({ title, issuer, skills }: CertificateCardProps) {
  return (
    <div className="w-[340px] md:w-[420px] h-[260px] shrink-0">
      <div className="relative w-full h-full rounded-3xl p-8 flex flex-col justify-between overflow-hidden group select-none bg-white/70 border border-black/8 hover:border-black/15 hover:shadow-sm transition-all duration-300">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-1">
            <span className="font-black text-lg md:text-xl text-black group-hover:text-black/80 transition-colors duration-300">
              {title}
            </span>
            <span className="text-sm text-black/50">{issuer}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-black/5 border border-black/8 flex items-center justify-center text-black/40">
            <ShieldCheck className="w-6 h-6" />
          </div>
        </div>

        {/* Decorative ring */}
        <div className="absolute right-[-20px] bottom-[-20px] w-36 h-36 opacity-5 border border-dashed border-black rounded-full group-hover:scale-110 transition-transform duration-700 ease-out pointer-events-none" />

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-4 z-10">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="px-3 py-1.5 rounded-lg bg-black/5 text-xs text-black/50 border border-black/6 group-hover:text-black/60 group-hover:border-black/10 transition-colors duration-300"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function Certificates() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isTitleInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current && containerRef.current) {
        const scrollW = sliderRef.current.scrollWidth;
        const offsetW = containerRef.current.offsetWidth;
        setWidth(scrollW - offsetW + 48);
      }
    };

    const timer = setTimeout(handleResize, 100);
    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const certificatesData = [
    {
      title: "HP Life Certification",
      issuer: "HP Foundation",
      skills: ["Business Communications", "Presentation Skills", "Strategic Planning"],
    },
    {
      title: "Infosys Springboard",
      issuer: "Infosys",
      skills: ["Python Programming", "OOP Principles", "Data Structures"],
    },
    {
      title: "Deloitte Virtual Experience",
      issuer: "Deloitte / Forage",
      skills: ["Technology Consulting", "Data Analysis", "Feasibility Analysis"],
    },
    {
      title: "SkillUp Learning Path",
      issuer: "Simplilearn",
      skills: ["Data Science Basics", "Intro to Data Science", "Data Modeling"],
    },
  ];

  return (
    <section
      id="certificates"
      ref={containerRef}
      className="py-16 md:py-24 relative overflow-hidden bg-white/30"
    >
      <div className="max-w-[1550px] mx-auto px-6 md:px-10 relative z-10">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="w-8 h-[1px] bg-black/40" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
                Validations
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4"
            >
              Certificates
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base md:text-lg text-black/50 max-w-xl leading-relaxed"
            >
              Verified certifications earned through extra-curricular learning paths and virtual consulting programs.
            </motion.p>
          </div>

          {/* Drag hint */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isTitleInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center gap-2 text-black/40 text-xs border border-black/10 rounded-full px-4 py-2 bg-black/3"
          >
            <ArrowRightLeft className="w-4 h-4" />
            <span>Drag / Swipe to navigate</span>
          </motion.div>
        </div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative overflow-visible cursor-grab active:cursor-grabbing"
        >
          <motion.div
            ref={sliderRef}
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            whileTap={{ cursor: "grabbing" }}
            className="flex gap-6 pr-12 w-max"
          >
            {certificatesData.map((cert, idx) => (
              <CertificateCard
                key={idx}
                title={cert.title}
                issuer={cert.issuer}
                skills={cert.skills}
              />
            ))}
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
