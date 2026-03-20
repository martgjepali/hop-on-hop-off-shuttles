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
    }, 3000);
    return () => clearInterval(interval);
  }, [images]);

  const delay = `${index * 120}ms`;

  const badge = title?.includes("Culture")
    ? "Culture"
    : title?.includes("Sun")
    ? "Shuttle"
    : title?.includes("Sea")
    ? "Coastal"
    : title?.includes("City")
    ? "City"
    : "Tour";

  return (
    <div
      className="group flex flex-col bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 opacity-0 animate-fade-up hover:-translate-y-1"
      style={{ animationDelay: delay }}
    >
      {/* Image */}
      <div className="relative w-full h-52 shrink-0 overflow-hidden">
        {images && images.length > 0 ? (
          <Image
            src={images[currentImageIndex]}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center">
            <span className="text-gray-300 text-sm">No image</span>
          </div>
        )}
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        {/* Badge */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[#00537E] text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
          {badge}
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 px-5 py-4">
        <h3 className="text-base font-bold text-gray-900 group-hover:text-[#00537E] transition-colors duration-200 mb-1">
          {title}
        </h3>

        <p className="text-sm text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {title === "Sun Line" || title?.startsWith("Sun")
            ? "Direct rides from Saranda every 30 minutes to the breathtaking Blue Eye spring."
            : title === "Sea Line" || title?.startsWith("Sea")
            ? "Visit Porto Palermo Castle, Himare, and Borsh beach in one relaxing coastal tour."
            : title === "Culture Line" || title?.startsWith("Culture")
            ? "Explore UNESCO Gjirokaster, Blue Eye spring, and Lekuresi Castle by shuttle."
            : itinerary || description || ""}
        </p>

        <div className="mt-auto">
          <Link
            href={linkHref || "#"}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 text-sm font-semibold text-white bg-[#00537E] rounded-xl hover:bg-[#F5A623] transition-colors duration-200 shadow-sm"
          >
            View Details
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
