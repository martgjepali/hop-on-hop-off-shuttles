"use client";

import { useState } from "react";
import { testimonials } from "@/constants/testimonials";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () =>
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prevTestimonial = () =>
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );

  const current = testimonials[currentIndex];

  return (
    <section className="py-14 px-4 sm:px-8 bg-gradient-to-br from-[#fff8ee] to-[#fffdf6]">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5A623] mb-2">
            What people say
          </span>
          <h2 className="text-2xl font-bold text-gray-900">Testimonials</h2>
        </div>
        <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 px-6 pt-8 pb-6">
          <div className="flex justify-center gap-0.5 mb-4">
            {[...Array(5)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-[#F5A623]" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.95 2.878c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.064 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69L9.049 2.927z" />
              </svg>
            ))}
          </div>
          <blockquote className="text-center text-gray-700 text-sm sm:text-base leading-relaxed italic">
            &ldquo;{current.quote}&rdquo;
          </blockquote>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#00537E] flex items-center justify-center text-white text-xs font-bold shrink-0">
              {current.name.charAt(0)}
            </div>
            <span className="font-semibold text-gray-900 text-sm">{current.name}</span>
          </div>
          <div className="mt-6 flex items-center justify-center gap-4">
            <button onClick={prevTestimonial} aria-label="Previous" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#00537E] hover:text-white hover:border-[#00537E] transition-all">&#8249;</button>
            <div className="flex gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className={`rounded-full transition-all ${i === currentIndex ? "w-5 h-2 bg-[#F5A623]" : "w-2 h-2 bg-gray-300 hover:bg-gray-400"}`}
                />
              ))}
            </div>
            <button onClick={nextTestimonial} aria-label="Next" className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-[#00537E] hover:text-white hover:border-[#00537E] transition-all">&#8250;</button>
          </div>
        </div>
      </div>
    </section>
  );
}
