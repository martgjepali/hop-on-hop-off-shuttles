"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 1800);
    const hideTimer = setTimeout(() => setVisible(false), 2400);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-600 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Animated ring */}
      <div className="relative flex items-center justify-center">
        <span className="absolute w-32 h-32 rounded-full border-4 border-[#F5A623]/30 animate-ping" />
        <span className="absolute w-24 h-24 rounded-full border-2 border-[#00537E]/20 animate-ping" style={{ animationDelay: "0.3s" }} />
        <div className="loading-logo relative z-10 w-24 h-24 flex items-center justify-center">
          <Image
            src="/images/kmg-logo.png"
            alt="KMG Logo"
            width={96}
            height={96}
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Brand name */}
      <p className="mt-6 text-sm font-semibold tracking-widest text-[#00537E] uppercase loading-text">
        KMG Shuttles
      </p>

      {/* Progress bar */}
      <div className="mt-4 w-40 h-0.5 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#F5A623] loading-bar rounded-full" />
      </div>
    </div>
  );
}
