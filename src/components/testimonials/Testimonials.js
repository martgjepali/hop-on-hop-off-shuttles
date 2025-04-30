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

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-r from-[#F5A623] to-[#FFDC91] px-6 py-24 sm:py-32 lg:px-8">
      {/* Decorative Background Gradients */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,#FFDC91,#F5A623)] opacity-20" />
      <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-gradient-to-r from-[#F5A623] to-[#FFDC91] shadow-xl ring-1 ring-[#F5A623]/10 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

      {/* Section Title */}
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">
          Testimonials
        </h2>
      </div>

      {/* Testimonial Content */}
      <div className="mx-auto max-w-2xl lg:max-w-4xl mt-12">
        <figure>
          <blockquote className="text-center text-lg sm:text-2xl font-medium text-gray-800 italic">
            <p>“{currentTestimonial.quote}”</p>
          </blockquote>

          <figcaption className="mt-10 flex flex-col items-center text-center">
            <div className="mt-3 font-semibold text-gray-900 text-base">
              {currentTestimonial.name}
            </div>
          </figcaption>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-center gap-4">
            <button
              onClick={prevTestimonial}
              aria-label="Previous testimonial"
              className="rounded-md bg-[#00537E] px-4 py-2 text-sm font-medium text-white hover:bg-[#F5A623] hover:text-gray-800 transition"
            >
              Previous
            </button>
            <button
              onClick={nextTestimonial}
              aria-label="Next testimonial"
              className="rounded-md bg-[#00537E] px-4 py-2 text-sm font-medium text-white hover:bg-[#F5A623] hover:text-gray-800 transition"
            >
              Next
            </button>
          </div>
        </figure>
      </div>
    </section>
  );
}
