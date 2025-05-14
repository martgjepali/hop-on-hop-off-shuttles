"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LineCard({
  title,
  itinerary,
  route,
  images,
  description,
  linkHref,
  index = 0,
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (!images || images.length === 0) return;
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000); // 3 seconds per image

    return () => clearInterval(interval);
  }, [images]);

  const delay = `${index * 150}ms`; // 150ms stagger per card

  return (
    <div
      className="group bg-white hover:bg-[#F5A623] rounded-2xl border border-transparent hover:border-[#00537E] shadow-md hover:shadow-2xl overflow-hidden transition-all duration-300 opacity-0 animate-fade-up transform hover:scale-[1.02]"
      style={{ animationDelay: delay }}
    >
      {/* Card Image Carousel */}
      <div className="relative w-full h-75">
        {images && images.length > 0 ? (
          <Image
            src={images[currentImageIndex]}
            alt={title}
            fill
            className="object-cover transition-opacity duration-1000 ease-in-out"
          />
        ) : (
          <Image
            src="/kgm-logo.png"
            alt={title}
            fill
            className="object-cover"
          />
        )}
      </div>

      {/* Card Content */}
      <div className="px-6 py-4">
        <div className="font-bold text-xl text-[#F5A623] group-hover:text-[#00537E] transition-colors duration-300 mb-2">
          {title}
        </div>

        <div className="text-gray-500 text-base mb-6">
          {itinerary
            .split(".")
            .map((sentence, index) =>
              sentence.trim() ? <p key={index}>{sentence.trim()}.</p> : null
            )}
        </div>

        <Link
          href={linkHref || "#"}
          className="inline-block px-6 py-3 text-md font-semibold text-white bg-[#00537E] rounded-lg hover:bg-[#00436A] transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}
