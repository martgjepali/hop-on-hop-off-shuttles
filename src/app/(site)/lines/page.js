"use client";

import { useEffect, useState } from "react";
import LineCard from "@/components/line_card/LineCard";
import Spinner from "@/components/spinner/Spinner";
import { getLines } from "@/services/lineService";

export default function LinesPage() {
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
    <main className="min-h-screen py-10 sm:py-35">
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
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#F5A623] mb-8">Our Lines</h1>
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
