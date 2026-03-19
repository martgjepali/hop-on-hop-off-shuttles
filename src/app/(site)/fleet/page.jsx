import Image from "next/image";
import { fleetData } from "@/constants/fleetData";

export const metadata = {
  title: "Our Fleet - KMG Hop-On Hop-Off Shuttles",
  description:
    "Explore our modern and comfortable fleet, designed to give you the best sightseeing experience in Saranda.",
  robots: { index: true, follow: true },
};

const vehicleDetails = [
  { seats: 7,  tags: ["A/C", "Luxury", "Private"] },
  { seats: 19, tags: ["A/C", "Group", "Spacious"] },
  { seats: 19, tags: ["A/C", "Group", "Comfortable"] },
  { seats: 8,  tags: ["A/C", "Compact", "Flexible"] },
];

export default function OurFleet() {
  return (
    <section className="relative isolate min-h-screen py-20 sm:py-28 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-[#f0f8ff] via-white to-[#fff8ee]">

      {/* Decorative background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#F5A623] opacity-10 blur-3xl" />
        <div className="absolute top-1/2 -right-32 w-80 h-80 rounded-full bg-[#00537E] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#FFDC91] opacity-20 blur-2xl" />
      </div>

      {/* Header */}
      <div className="max-w-3xl mx-auto text-center mb-14">
        <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5A623] mb-3">
          Premium Vehicles
        </span>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900">
          Our <span className="text-[#00537E]">Fleet</span>
        </h1>
        <p className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed">
          Every journey deserves a comfortable ride. Explore our handpicked
          vehicles built for safety, space, and style.
        </p>
      </div>

      {/* Fleet Cards */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-8">
        {fleetData.map((vehicle, index) => {
          const details = vehicleDetails[index] ?? { seats: null, tags: [] };
          return (
            <div
              key={index}
              className="group bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Image area */}
              <div className="bg-gradient-to-br from-gray-50 to-white px-6 pt-6 pb-2">
                <div className="relative w-full h-52">
                  {vehicle.image && (
                    <Image
                      src={vehicle.image}
                      alt={vehicle.name}
                      fill
                      className="object-contain drop-shadow-md"
                    />
                  )}
                </div>
              </div>

              {/* Info area */}
              <div className="px-6 pb-6 pt-2">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#00537E] transition-colors">
                      {vehicle.name}
                    </h3>
                    <p className="text-sm text-[#F5A623] font-semibold mt-0.5">
                      {vehicle.role}
                    </p>
                  </div>
                  {details.seats && (
                    <span className="shrink-0 inline-flex items-center gap-1 bg-[#00537E]/10 text-[#00537E] text-xs font-semibold px-2.5 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                      </svg>
                      {details.seats} seats
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2">
                  {details.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs bg-gray-100 text-gray-600 font-medium px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}