"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  const [showMore, setShowMore] = useState(false);

  return (
    <section className="relative isolate px-6 pt-5 sm:pt-10 lg:px-8">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 top-[-10%] w-[40rem] sm:w-[60rem] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F5A623] to-[#FFDC91] opacity-40"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Flex container for 2 columns */}
      <div className="mx-auto max-w-7xl py-20 lg:py-28 flex flex-col lg:flex-row items-center gap-12">
        {/* Left Column: Text */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl text-center sm:text-5xl font-semibold tracking-tight text-gray-900 opacity-0 animate-fade-up animate-fade-delay-1">
            Welcome to KMG Hop-On Hop-Off Shuttles
          </h1>

          <div className="flex justify-center mt-6 opacity-0 animate-fade-up animate-fade-delay-2">
            <Image
              src="kgm-logo.png" // 👈 just the filename
              alt="Logo"
              width={180}
              height={80}
            />
          </div>

          <p className="mt-6 text-lg text-gray-600 sm:text-xl opacity-0 animate-fade-up animate-fade-delay-3">
            Discover Saranda&apos;s hidden gems with KMG – your trusted and
            officially registered transportation companion. We combine comfort,
            convenience, and unbeatable prices to give you the best travel
            experience on the market.
          </p>

          <div className="mt-4 text-gray-600 text-lg sm:text-xl opacity-0 animate-fade-up animate-fade-delay-4">
            <p>
              KMG was born from the need for smarter, affordable sightseeing
              options.
              <span
                className={`block transition-opacity duration-500 ease-in-out ${
                  showMore
                    ? "opacity-100 max-h-[1000px]"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                {" "}
                After experiencing the high costs of multi-stop tours with
                unnecessary guides, and the discomfort of navigating irregular
                transport options, we knew there had to be a better way. Our
                service offers the best of both worlds – low-cost travel with
                the flexibility to explore multiple sites in a single day using
                guidebooks and audio guides. Whether you&apos;re visiting for a
                day, a week, or longer, KMG ensures your journey is smooth,
                memorable, and budget-friendly.
              </span>
              <button
                onClick={() => setShowMore((prev) => !prev)}
                className="ml-1 text-[#00537E] underline hover:text-[#F5A623] transition"
              >
                {showMore ? "Read less" : "Read more"}
              </button>
            </p>
          </div>

          <div className="mt-8 flex justify-center gap-4 opacity-0 animate-fade-up animate-fade-delay-4">
            <Link
              href="/lines"
              className="rounded-md bg-[#00537E] px-5 py-2 text-sm font-semibold text-white shadow hover:bg-[#F5A623] transition"
            >
              Book Now
            </Link>
            <Link
              href="/fleet"
              className="rounded-md px-5 py-2 text-sm font-semibold text-[#00537E] hover:text-[#F5A623] transition border border-transparent hover:border-[#F5A623]"
            >
              Learn More →
            </Link>
          </div>
        </div>

        {/* Right Column: Image */}
        <div className="lg:w-1/2 opacity-0 animate-fade-up animate-fade-delay-4">
          <Image
            src="/images/fleet4.jpeg"
            alt="KMG Team"
            width={800}
            height={600}
            className="rounded-2xl shadow-xl object-cover w-full"
          />
          <p className="mt-4 text-sm text-gray-500 italic text-center lg:text-left">
            Meet the passionate KMG team behind your unforgettable adventures.
          </p>
        </div>
      </div>
    </section>
  );
}
