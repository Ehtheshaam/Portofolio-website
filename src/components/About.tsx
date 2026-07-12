"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Calendar, Award } from "lucide-react";

interface TimelineItemProps {
  degree: string;
  institution: string;
  cgpa: string;
  period: string;
  description?: string;
  delay: number;
}

function TimelineItem({ degree, institution, cgpa, period, description, delay }: TimelineItemProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: 30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative pl-10 md:pl-14 pb-12 last:pb-0 group w-full"
    >
      {/* Circle indicator on timeline */}
      <div className="absolute left-0 top-2.5 w-4.5 h-4.5 rounded-full border-2 border-black bg-[#EAEAE4] z-10 transition-transform duration-500 group-hover:scale-125" />

      {/* Card */}
      <div className="bg-white/60 border border-black/8 p-8 md:p-10 rounded-3xl transition-all duration-300 hover:border-black/15 hover:shadow-sm w-full">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="font-black text-lg md:text-xl text-black">
            {degree}
          </span>
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-black/5 border border-black/8 text-xs sm:text-sm font-semibold text-black/60">
            <Calendar className="w-4 h-4" />
            {period}
          </span>
        </div>

        <span className="block text-base text-black/60 mb-5 font-medium">{institution}</span>

        <div className="flex items-center gap-2.5 text-base text-black/55">
          <Award className="w-5 h-5 text-black/40" />
          <span>CGPA: <strong className="text-black font-bold">{cgpa}</strong></span>
        </div>

        {description && (
          <p className="mt-5 text-sm text-black/45 leading-relaxed border-t border-black/6 pt-5">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const isTextInView = useInView(textRef, { once: true, margin: "-100px" });

  const timelineData = [
    {
      degree: "B.E. Computer Science Engineering",
      institution: "Dhaanish Ahmed College of Engineering",
      cgpa: "9.04",
      period: "2023 – 2027",
      description: "Focused on core Computer Science methodologies, Algorithms, Database Management, and specializing in Artificial Intelligence, Machine Learning and Data Engineering pipelines.",
    },
    {
      degree: "Intermediate (MPC)",
      institution: "Raos Junior College",
      cgpa: "9.0",
      period: "2021 – 2023",
      description: "Mathematics, Physics, Chemistry stream. Developed strong foundations in logic, numerical analytics, and rational problem-solving.",
    },
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-16 md:py-24 relative overflow-hidden bg-[#EAEAE4]"
    >
      <div className="max-w-[1550px] mx-auto px-6 md:px-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Side: Story */}
        <div ref={textRef} className="lg:col-span-5 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-black/40" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
              About Me
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-black mb-8 leading-tight"
          >
            A curious engineer shaping the future of AI & Data.
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6 text-base md:text-lg text-black/55 leading-relaxed"
          >
            <p>
              I am a final-year Computer Science Engineering student with a deep fascination for the mechanisms of intelligence and big data. My passion lies at the intersection of Artificial Intelligence and Data Science.
            </p>
            <p>
              Rather than just coding interfaces, I love solving backend bottlenecks, engineering robust data flows, and designing scalable machine learning pipelines. I thrive on logical problem solving and value continuous learning above all else.
            </p>
            <p>
              Currently, I&apos;m seeking hands-on internship opportunities to apply my programming skills, collaborate with engineering teams, and learn best practices in industry-level Data Engineering.
            </p>
          </motion.div>
        </div>

        {/* Right Side: Education Timeline */}
        <div className="lg:col-span-7 flex flex-col w-full">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={isTextInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="inline-flex items-center gap-3 mb-10 text-black/50"
          >
            <GraduationCap className="w-6 h-6 text-black/40" />
            <span className="text-sm md:text-base font-bold uppercase tracking-wider text-black/60">
              Education Timeline
            </span>
          </motion.div>

          <div className="relative border-l border-black/15 ml-2 w-full">
            {timelineData.map((item, idx) => (
              <TimelineItem
                key={idx}
                degree={item.degree}
                institution={item.institution}
                cgpa={item.cgpa}
                period={item.period}
                description={item.description}
                delay={0.4 + idx * 0.2}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
