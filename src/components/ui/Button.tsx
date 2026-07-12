"use client";

import React, { ReactNode } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { ArrowUpRight } from "lucide-react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "outline";
  magnetic?: boolean;
  magneticStrength?: number;
  icon?: boolean;
  href?: string;
  download?: boolean | string;
}

export function Button({
  children,
  onClick,
  variant = "primary",
  magnetic = true,
  magneticStrength = 0.3,
  icon = true,
  href,
  download,
}: ButtonProps) {
  const magneticRef = useMagnetic(magnetic ? magneticStrength : 0);

  const buttonClasses = {
    primary:
      "bg-accent-indigo hover:bg-accent-purple text-white border-transparent",
    secondary:
      "bg-white/10 hover:bg-white/20 text-white border-white/10 hover:border-white/20",
    outline:
      "bg-transparent hover:bg-white hover:text-black text-white border-white/20 hover:border-white",
  };

  const baseStyles =
    "relative inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-sans font-medium text-sm transition-all duration-500 ease-out border backdrop-blur-sm select-none group active:scale-95";

  const renderContent = () => (
    <span className="relative flex items-center justify-center gap-2 z-10">
      {children}
      {icon && (
        <span className="transition-transform duration-500 ease-out group-hover:rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
          <ArrowUpRight className="w-4 h-4" />
        </span>
      )}
    </span>
  );

  const containerClasses = magnetic ? "inline-block" : "inline-block";

  if (href) {
    return (
      <div ref={magneticRef as any} className={containerClasses}>
        <a
          href={href}
          onClick={onClick}
          download={download}
          className={`${baseStyles} ${buttonClasses[variant]}`}
        >
          {/* Subtle button radial glow */}
          <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-accent-indigo/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-0" />
          {renderContent()}
        </a>
      </div>
    );
  }

  return (
    <div ref={magneticRef as any} className={containerClasses}>
      <button
        onClick={onClick}
        className={`${baseStyles} ${buttonClasses[variant]}`}
      >
        <span className="absolute inset-0 w-full h-full rounded-full bg-gradient-to-r from-accent-indigo/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm -z-0" />
        {renderContent()}
      </button>
    </div>
  );
}
