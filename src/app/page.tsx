import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Achievements } from "@/components/Achievements";
import { Certificates } from "@/components/Certificates";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-[#EAEAE4]">
      {/* 1. Header Navigation */}
      <Navbar />

      {/* 2. Core Page Sections */}
      <main className="flex-grow">
        {/* Fullscreen Hero Introduction */}
        <Hero />
        
        {/* Authentic Student Narrative & Education timeline */}
        <About />
        
        {/* Selected Project Cases (VOGA & HealthConnect) */}
        <Projects />
        
        {/* Capabilities Grid */}
        <Skills />
        
        {/* Academic / Competition Achievements */}
        <Achievements />
        
        {/* Verification Seals & Slider */}
        <Certificates />
        
        {/* Touchpoint Form & Coordinates */}
        <Contact />
      </main>

      {/* 3. Footer Copyright & Creds */}
      <Footer />
    </div>
  );
}
