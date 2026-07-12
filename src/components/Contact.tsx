"use client";

import React, { useRef, useState, FormEvent } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Check, ArrowUpRight } from "lucide-react";

function Github({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function Linkedin({ className, ...props }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" rx="1" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export function Contact() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;
    setStatus("submitting");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // Hardcoded Web3Forms Access Key
          access_key: "d9502cf7-fe8d-42ba-8f94-af6235c9a1b3",
          name: formState.name,
          email: formState.email,
          message: formState.message,
          subject: `New Portfolio Message from ${formState.name}`,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus("success");
        setFormState({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 4000);
      } else {
        console.error(result);
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const contactDetails = [
    {
      label: "Email Me",
      value: "skehtheshaam2006@gmail.com",
      href: "mailto:skehtheshaam2006@gmail.com",
      icon: <Mail className="w-5 h-5" />,
    },
    {
      label: "GitHub Profile",
      value: "github.com/Ehtheshaam",
      href: "https://github.com/Ehtheshaam",
      icon: <Github className="w-5 h-5" />,
    },
    {
      label: "LinkedIn Connection",
      value: "linkedin.com/in/shaik-ehthe-shaam-99762837b",
      href: "https://www.linkedin.com/in/shaik-ehthe-shaam-99762837b",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      label: "My Location",
      value: "Chennai, Tamil Nadu, India",
      href: "https://maps.google.com/?q=Chennai,India",
      icon: <MapPin className="w-5 h-5" />,
    },
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="py-16 md:py-24 relative overflow-hidden bg-[#EAEAE4]"
    >
      <div className="max-w-[1550px] mx-auto px-6 md:px-10 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

        {/* Left: Contact Info */}
        <div className="lg:col-span-5 flex flex-col justify-start">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <span className="w-8 h-[1px] bg-black/40" />
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-black/50">
              Get In Touch
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-black tracking-tight text-black mb-8 leading-tight"
          >
            Let&apos;s build something impactful together.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base md:text-lg text-black/55 leading-relaxed mb-10"
          >
            I&apos;m currently seeking internship opportunities in AI, Data Science, and Data Engineering. If you have questions, project proposals, or just want to connect, feel free to drop a message!
          </motion.p>

          {/* Contact Links */}
          <div className="flex flex-col gap-6">
            {contactDetails.map((detail, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + idx * 0.1 }}
                className="flex items-center gap-4 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-black/6 border border-black/8 flex items-center justify-center text-black/45 transition-all duration-300 group-hover:bg-black group-hover:text-white group-hover:border-black shrink-0">
                  {detail.icon}
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-black/35 mb-0.5">
                    {detail.label}
                  </span>
                  <a
                    href={detail.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-base font-semibold text-black/70 group-hover:text-black transition-colors duration-300"
                  >
                    {detail.value}
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right: Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 w-full"
        >
          <div className="bg-white/70 p-10 md:p-12 rounded-3xl border border-black/8 relative overflow-hidden shadow-sm w-full">
            <form onSubmit={handleSubmit} className="flex flex-col gap-10">

              {/* Name Field */}
              <div className="flex flex-col gap-2 relative group">
                <input
                  type="text"
                  name="name"
                  value={formState.name}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/15 py-4 text-black text-base focus:outline-none focus:border-black transition-colors duration-300 pt-6 placeholder-shown:pt-4"
                />
                <label className="absolute left-0 top-4 text-black/40 text-base tracking-wide transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-black/70 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs">
                  Your Name
                </label>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2 relative group">
                <input
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleInputChange}
                  required
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/15 py-4 text-black text-base focus:outline-none focus:border-black transition-colors duration-300 pt-6 placeholder-shown:pt-4"
                />
                <label className="absolute left-0 top-4 text-black/40 text-base tracking-wide transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-black/70 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs">
                  Your Email Address
                </label>
              </div>

              {/* Message Field */}
              <div className="flex flex-col gap-2 relative group">
                <textarea
                  name="message"
                  value={formState.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  placeholder=" "
                  className="peer w-full bg-transparent border-b border-black/15 py-4 text-black text-base focus:outline-none focus:border-black transition-colors duration-300 resize-none pt-6 placeholder-shown:pt-4"
                />
                <label className="absolute left-0 top-4 text-black/40 text-base tracking-wide transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-xs peer-focus:text-black/70 peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:text-xs">
                  How can I help you?
                </label>
              </div>

              {/* Submit Button */}
              <div className="mt-2">
                <button
                  type="submit"
                  disabled={status === "submitting" || status === "success"}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-black text-white font-bold text-base hover:bg-black/80 transition-all duration-300 active:scale-95 disabled:opacity-70 group"
                >
                  {status === "idle" && (
                    <>
                      Send Message
                      <ArrowUpRight className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
                    </>
                  )}
                  {status === "submitting" && (
                    <>
                      <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <Check className="w-5 h-5 text-green-400" />
                      Message Sent!
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
