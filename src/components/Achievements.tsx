"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, Trophy, Languages, TrendingUp } from "lucide-react";

interface AchievementCardProps {
  title: string;
  subtitle: string;
  metric?: string;
  icon: React.ReactNode;
  delay: number;
}

function AchievementCard({ title, subtitle, metric, icon, delay }: AchievementCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      className="bg-white/60 border border-black/8 rounded-3xl p-8 md:p-10 flex flex-col gap-8 hover:border-black/15 hover:shadow-sm transition-all duration-300 group w-full"
    >
      <div className="flex items-center justify-between">
        <div className="w-14 h-14 rounded-2xl bg-black/6 border border-black/8 flex items-center justify-center text-black/50">
          {icon}
        </div>
        {metric && (
          <span className="text-3xl md:text-4xl font-black text-black">
            {metric}
          </span>
        )}
      </div>

      <div>
        <h4 className="font-black text-lg md:text-xl text-black mb-3 group-hover:text-black/80 transition-colors duration-300">
          {title}
        </h4>
        <p className="text-sm md:text-base text-black/50 leading-relaxed">
          {subtitle}
        </p>
      </div>
    </motion.div>
  );
}

export function Achievements() {
  const titleRef = useRef(null);
  const isTitleInView = useInView(titleRef, { once: true, margin: "-100px" });

  const achievementsData = [
    {
      title: "Best Student of the Year",
      subtitle: "Awarded for 3 consecutive academic years at Dhaanish Ahmed College of Engineering for excellence in academics, technical leadership, and peer mentoring.",
      icon: <Trophy className="w-6 h-6" />,
    },
    {
      title: "Runner-up — Serve-A-Thon 2025",
      subtitle: "Secured 2nd place in the national hackathon by prototyping a community aid distribution solution utilizing a low-latency Flask synchronization framework.",
      icon: <Award className="w-6 h-6" />,
    },
    {
      title: "B2 Aptis English Certification",
      subtitle: "Certified by the British Council, representing high proficiency in oral communication, business writing, and professional vocabulary.",
      icon: <Languages className="w-6 h-6" />,
    },
    {
      title: "Academic Grade Point",
      subtitle: "Consistent academic standing in Computer Science Engineering, maintaining a high percentage across core, mathematical, and algorithmic subjects.",
      metric: "CGPA 9.04",
      icon: <TrendingUp className="w-6 h-6" />,
    },
  ];

  return (
    <section id="achievements" className="py-16 md:py-24 relative overflow-hidden bg-[#EAEAE4]">
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
              Accolades
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4"
          >
            Achievements
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-black/50 max-w-xl leading-relaxed"
          >
            Milestones and recognition reflecting academic commitment, competitive spirit, and clear communications.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {achievementsData.map((item, idx) => (
            <AchievementCard
              key={idx}
              title={item.title}
              subtitle={item.subtitle}
              metric={(item as any).metric}
              icon={item.icon}
              delay={0.1 * idx}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
