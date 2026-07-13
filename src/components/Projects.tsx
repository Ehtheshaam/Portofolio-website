"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, Code, ArrowUpRight } from "lucide-react";

interface ProjectItemProps {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  techStack: string[];
  imageSrc: string;
  liveUrl: string;
  githubUrl: string;
  isReversed?: boolean;
  delay: number;
}

function ProjectItem({
  title,
  subtitle,
  description,
  highlights,
  techStack,
  imageSrc,
  liveUrl,
  githubUrl,
  isReversed = false,
  delay,
}: ProjectItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center py-12 md:py-16"
    >
      {/* Image Side */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1.0, delay, ease: [0.16, 1, 0.3, 1] }}
        className={`col-span-1 lg:col-span-7 w-full ${isReversed ? "lg:order-2" : "lg:order-1"}`}
      >
        <div className="relative w-full overflow-hidden rounded-2xl aspect-[16/10] group">
          <img
            src={imageSrc}
            alt={`${title} Preview`}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity duration-500" />
          <span className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-white/90 border border-black/10 text-[10px] font-bold uppercase tracking-wider text-black/60">
            Selected Work
          </span>
        </div>
      </motion.div>

      {/* Description Side */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.16, 1, 0.3, 1] }}
        className={`col-span-1 lg:col-span-5 flex flex-col ${isReversed ? "lg:order-1" : "lg:order-2"}`}
      >
        <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-black/50 mb-3">
          {subtitle}
        </span>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-black mb-5 tracking-tight">
          {title}
        </h3>

        <p className="text-base md:text-lg text-black/55 leading-relaxed mb-6">
          {description}
        </p>

        {/* Highlights */}
        <div className="mb-7">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-black/35 mb-3 block">
            Key Architecture
          </span>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-black/60">
                <span className="w-1.5 h-1.5 rounded-full bg-black/40 shrink-0" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Badges */}
        <div className="mb-8 flex flex-wrap gap-2">
          {techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 rounded-xl bg-black/6 border border-black/8 text-xs font-semibold text-black/55 hover:bg-black hover:text-white hover:border-black transition-colors duration-300 select-none cursor-default"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          <a
            href={liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-black text-white font-bold text-base hover:bg-black/80 transition-all duration-300 active:scale-95"
          >
            <Eye className="w-4 h-4" />
            Live Demo
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-black/25 text-black font-bold text-base hover:border-black hover:bg-black/5 transition-all duration-300 active:scale-95"
          >
            <Code className="w-4 h-4" />
            GitHub
          </a>
        </div>
      </motion.div>
    </div>
  );
}

export function Projects() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const projectsData = [
    {
      title: "VOGA",
      subtitle: "AI Product Recommendation System",
      description: "An intelligent recommendation engine utilizing a vector-space similarity framework to match fashion products from the Amazon Fashion Dataset. Features gender-aware sorting, real-time query encoding, and custom 3D catalog items.",
      highlights: [
        "TF-IDF Vectorization",
        "Cosine Similarity",
        "Flask Microframework",
        "Scikit-learn Pipeline",
        "Render Deployment",
        "Amazon Fashion Dataset",
        "3D Product Cards",
        "Gender-aware Filtering",
      ],
      techStack: ["Python", "Scikit-learn", "Flask", "React", "Tailwind CSS", "GSAP"],
      imageSrc: "/voga.png",
      liveUrl: "https://product-recommendation-five.vercel.app/",
      githubUrl: "https://github.com/Ehtheshaam/VOGA",
      isReversed: false,
    },
    {
      title: "HealthConnect",
      subtitle: "AI-Powered Telemedicine App",
      description: "A low-bandwidth, offline-first mobile healthcare platform designed for rural connectivity. Runs an embedded ML algorithm to analyze patient symptoms and predict clinical conditions prior to establishing doctor triage.",
      highlights: [
        "React Native (Expo)",
        "Random Forest Classifier",
        "Flask API Endpoint",
        "Symptom Prediction",
        "Rural Healthcare Focus",
        "Low Bandwidth Design",
        "Offline-first Storage",
        "Encrypted Health Data",
      ],
      techStack: ["React Native", "Expo", "Python", "Flask", "Scikit-learn", "SQLite"],
      imageSrc: "/healthconnect.png",
      liveUrl: "https://github.com/Ehtheshaam/HealthConnect",
      githubUrl: "https://github.com/Ehtheshaam/HealthConnect",
      isReversed: true,
    },
  ];

  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden bg-white/30">
      <div className="max-w-[1550px] mx-auto px-6 md:px-10 relative z-10">

        {/* Section Header */}
        <div ref={titleRef} className="flex flex-col mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-black/40" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
              Featured Work
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4"
          >
            Selected Projects
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-black/50 max-w-xl leading-relaxed"
          >
            A look at complex practical projects designed to address real-world constraints, build reliable pipelines, and test machine learning concepts.
          </motion.p>
        </div>

        {/* Projects List */}
        <div className="divide-y divide-black/8">
          {projectsData.map((project, idx) => (
            <ProjectItem
              key={idx}
              title={project.title}
              subtitle={project.subtitle}
              description={project.description}
              highlights={project.highlights}
              techStack={project.techStack}
              imageSrc={project.imageSrc}
              liveUrl={project.liveUrl}
              githubUrl={project.githubUrl}
              isReversed={project.isReversed}
              delay={0.1 * idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
