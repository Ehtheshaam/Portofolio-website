"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code, Database, Wrench, Palette, Lightbulb } from "lucide-react";

interface SkillBadgeProps {
  name: string;
}

function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <div className="inline-block">
      <div className="px-5 py-3 rounded-2xl bg-black/5 border border-black/8 text-black/70 text-sm md:text-base font-semibold transition-all duration-300 hover:bg-black hover:text-white hover:border-black select-none cursor-default">
        {name}
      </div>
    </div>
  );
}

interface SkillCategoryProps {
  title: string;
  icon: React.ReactNode;
  skills: string[];
  delay: number;
}

function SkillCategory({ title, icon, skills, delay }: SkillCategoryProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/60 border border-black/8 rounded-3xl p-8 md:p-10 flex flex-col gap-8 hover:border-black/15 hover:shadow-sm transition-all duration-300 w-full"
    >
      <div className="flex items-center gap-5">
        <div className="w-14 h-14 rounded-2xl bg-black/8 flex items-center justify-center text-black/60">
          {icon}
        </div>
        <h4 className="font-black text-lg md:text-xl text-black">
          {title}
        </h4>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {skills.map((skill, index) => (
          <SkillBadge key={index} name={skill} />
        ))}
      </div>
    </motion.div>
  );
}

export function Skills() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const categories = [
    {
      title: "Programming",
      icon: <Code className="w-6 h-6" />,
      skills: ["Python", "Java (Basic)"],
    },
    {
      title: "Data Science",
      icon: <Database className="w-6 h-6" />,
      skills: ["Data Analysis", "Data Cleaning", "Basic Machine Learning", "Data Preprocessing"],
    },
    {
      title: "Tools & Tech",
      icon: <Wrench className="w-6 h-6" />,
      skills: ["Git", "GitHub", "Power BI", "MS Office"],
    },
    {
      title: "Design",
      icon: <Palette className="w-6 h-6" />,
      skills: ["Canva", "Microsoft PowerPoint"],
    },
    {
      title: "Concepts",
      icon: <Lightbulb className="w-6 h-6" />,
      skills: ["Logical Problem Solving", "AI-assisted Development"],
    },
  ];

  return (
    <section id="skills" className="py-16 md:py-24 relative overflow-hidden bg-[#EAEAE4]">
      <div className="max-w-[1550px] mx-auto px-6 md:px-10 relative z-10">

        {/* Section Header */}
        <div ref={titleRef} className="flex flex-col mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-black/40" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
              Capabilities
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4"
          >
            Skills & Toolkit
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-black/50 max-w-xl leading-relaxed"
          >
            A compilation of libraries, languages, tools, and methodologies I study and actively apply to engineer systems.
          </motion.p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {categories.map((cat, idx) => (
            <SkillCategory
              key={idx}
              title={cat.title}
              icon={cat.icon}
              skills={cat.skills}
              delay={0.1 * idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
