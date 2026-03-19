"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "500+", label: "Happy Travelers" },
  { value: "4", label: "Unique Routes" },
  { value: "5★", label: "Avg. Rating" },
];

const carouselImages = [
  { src: "/images/background_img.jpg", alt: "KMG Shuttle" },
  { src: "/images/background_img_2.jpg", alt: "KMG Adventure" },
  { src: "/images/team_photo_1.jpeg", alt: "Team 1" },
  { src: "/images/team_photo_2.jpeg", alt: "Team 2" },
  { src: "/images/team_photo_3.jpeg", alt: "Team 3" },
];

export default function Hero() {
  const [showMore, setShowMore] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const touchStartX = useRef(null);

  function handleTouchStart(e) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e) {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) < 30) return; // ignore tiny taps
    if (diff > 0) {
      setActiveSlide((prev) => (prev + 1) % carouselImages.length);
    } else {
      setActiveSlide((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
    }
    touchStartX.current = null;
  }

  return (
    <section className="relative isolate overflow-hidden px-6 pt-5 sm:pt-10 lg:px-8">
      {/* Animated background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="hero-blob-1 absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#F5A623] opacity-20 blur-3xl" />
        <div className="hero-blob-2 absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-[#00537E] opacity-10 blur-3xl" />
        <div className="hero-blob-3 absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#FFDC91] opacity-25 blur-2xl" />
      </div>

      {/* Main layout */}
      <div className="mx-auto max-w-7xl py-16 lg:py-24 flex flex-col lg:flex-row items-center gap-12">

        {/* ── Left Column ── */}
        <div className="lg:w-1/2 text-center lg:text-left">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#F5A623]/10 border border-[#F5A623]/30 text-[#00537E] text-xs font-semibold px-3 py-1 rounded-full mb-5 opacity-0 animate-fade-up animate-fade-delay-1">
            <span className="w-2 h-2 rounded-full bg-[#F5A623] animate-pulse" />
            Official Transportation Partner – Saranda
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 leading-tight opacity-0 animate-fade-up animate-fade-delay-1">
            Explore Albania<br />
            <span className="text-[#F5A623]">Your Way</span>
          </h1>

          <div className="flex justify-center lg:justify-start mt-5 opacity-0 animate-fade-up animate-fade-delay-2">
            <Image src="/images/kmg-logo.png" alt="KMG Logo" width={140} height={60} />
          </div>

          <p className="mt-5 text-base text-gray-600 sm:text-lg leading-relaxed opacity-0 animate-fade-up animate-fade-delay-3">
            Discover Saranda&apos;s hidden gems with KMG — your trusted and
            officially registered transportation companion. Comfort, convenience,
            and unbeatable prices.
          </p>

          <div className="mt-3 text-gray-600 text-base sm:text-lg opacity-0 animate-fade-up animate-fade-delay-4">
            <p>
              KMG was born from the need for smarter, affordable sightseeing options.
              <span
                className={`block transition-all duration-500 ease-in-out ${
                  showMore ? "opacity-100 max-h-[600px] mt-2" : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                After experiencing the high costs of multi-stop tours with unnecessary
                guides, we knew there had to be a better way. Our service offers the
                best of both worlds — low-cost travel with full flexibility. Whether
                you&apos;re visiting for a day or a week, KMG ensures a smooth,
                memorable, and budget-friendly journey.
              </span>
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="ml-1 text-[#00537E] underline hover:text-[#F5A623] transition font-medium"
              >
                {showMore ? "Read less" : "Read more"}
              </button>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3 opacity-0 animate-fade-up animate-fade-delay-4">
            <Link
              href="/lines"
              className="rounded-xl bg-[#00537E] px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-[#F5A623] hover:shadow-[#F5A623]/30 hover:shadow-xl transition-all duration-300"
            >
              Book Now
            </Link>
            <Link
              href="/fleet"
              className="rounded-xl px-6 py-3 text-sm font-semibold text-[#00537E] border border-[#00537E]/30 hover:border-[#F5A623] hover:text-[#F5A623] transition-all duration-300"
            >
              Learn More →
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-10 flex gap-6 justify-center lg:justify-start opacity-0 animate-fade-up animate-fade-delay-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-2xl font-bold text-[#00537E]">{s.value}</div>
                <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Column ── */}
        <div className="w-full lg:w-1/2 opacity-0 animate-fade-up animate-fade-delay-4">

          {/* Mobile: swipe carousel */}
          <div className="lg:hidden select-none">
            <div
              className="relative w-full h-56 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              {carouselImages.map((img, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-opacity duration-500 ${i === activeSlide ? "opacity-100 z-10" : "opacity-0 z-0"}`}
                >
                  <Image src={img.src} alt={img.alt} fill className="object-cover" />
                </div>
              ))}
              {activeSlide === 1 && (
                <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-semibold text-[#00537E] shadow">
                  🚌 Departing every 30 min
                </div>
              )}
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-3">
              {carouselImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  aria-label={`Slide ${i + 1}`}
                  className={`rounded-full transition-all duration-300 ${i === activeSlide ? "bg-[#00537E] w-5 h-2" : "bg-gray-300 w-2 h-2"}`}
                />
              ))}
            </div>
          </div>

          {/* Desktop: staggered two-row layout */}
          <div className="hidden lg:block">
            {/* Top two images — taller, one offset */}
            <div className="flex flex-row gap-4 items-end">
              <div className="relative w-1/2 h-64 rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <Image src="/images/background_img.jpg" alt="KMG Shuttle" fill className="object-cover" />
              </div>
              <div className="relative w-1/2 h-52 rounded-2xl overflow-hidden shadow-xl ring-1 ring-black/5 mb-4">
                <Image src="/images/background_img_2.jpg" alt="KMG Adventure" fill className="object-cover" />
                <div className="absolute bottom-3 left-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-semibold text-[#00537E] shadow">
                  🚌 Departing every 30 min
                </div>
              </div>
            </div>

            {/* Bottom three team photos */}
            <div className="mt-4 flex gap-3">
              {["/images/team_photo_1.jpeg", "/images/team_photo_2.jpeg", "/images/team_photo_3.jpeg"].map((src, i) => (
                <div key={i} className="relative flex-1 h-28 rounded-xl overflow-hidden shadow-md ring-1 ring-black/5">
                  <Image src={src} alt={`Team ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          <p className="mt-3 text-xs text-gray-400 italic text-center">
            Discover our comfortable fleet and the stunning places we take you.
          </p>
        </div>

      </div>
    </section>
  );
}
