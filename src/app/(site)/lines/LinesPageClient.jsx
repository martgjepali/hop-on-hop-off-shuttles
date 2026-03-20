"use client";

import { useEffect, useState } from "react";
import LineCard from "@/components/ui/line_card/LineCard";
import Spinner from "@/components/ui/spinner/Spinner";
import { getLines } from "@/services/lineService";

export default function LinesPageClient() {
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

  const [lines, setLines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Record the start time
    const start = Date.now();

    const fetchLines = async () => {
      try {
        const data = await getLines();
        setLines(data);
      } catch (error) {
        console.error("Error fetching lines:", error);
        setError("Failed to load lines");
      } finally {
        // Calculate elapsed time
        const elapsed = Date.now() - start;
        // Ensure at least 3500ms (3.5 seconds) of loading time
        const delay = Math.max(2000 - elapsed, 0);
        setTimeout(() => {
          setLoading(false);
        }, delay);
      }
    };

    fetchLines();
  }, []);

  if (loading) {
    return (
      // Center the spinner vertically and horizontally
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <main className="relative min-h-screen py-10 sm:py-28 px-4 sm:px-6 lg:px-8">

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F5A623] opacity-10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-[#00537E] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#FFDC91] opacity-20 blur-2xl" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5A623] mb-3">
            Explore Albania
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
            Our <span className="text-[#00537E]">Lines</span>
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-500 max-w-xl mx-auto leading-relaxed">
            Choose your route and hop on board. Comfortable shuttles departing daily from Saranda and Ksamil.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lines.map((line, index) => (
            <LineCard
              key={line.LineID}
              title={line.Name}
              itinerary={line.TripLabel}
              route={`${line.StartLocation} - ${line.EndLocation}`}
              index={index}
              images={
                line.Images?.map(
                  (filename) =>
                    `${BASE_URL}/lines/uploads/${encodeURIComponent(filename)}`
                ) || []
              }
              linkHref={`/lines/${line.LineID}`}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
