import Image from "next/image";
import { fleetData } from "@/constants/fleetData";

export default function OurFleet() {
  return (
    <section className="relative isolate py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8">
      {/* Background Shape */}
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 top-[-40%] w-[40rem] sm:w-[60rem] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F5A623] to-[#FFDC91] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      {/* Heading */}
      <div className="max-w-4xl mx-auto text-center">
        {/* <Image
          src="/images/fleet-banner.jpg"
          alt="KMG Fleet Banner"
          width={1000}
          height={500}
          className="w-full h-auto object-cover rounded-2xl shadow-xl mb-10"
        /> */}
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Our Fleet
        </h2>
        <p className="mt-4 text-lg leading-7 text-gray-700">
          We’re proud to present a premium selection of vehicles tailored for
          luxury, comfort, and reliability.
        </p>
      </div>

      {/* Fleet Cards */}
      <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-2 max-w-5xl mx-auto animate-jump-in">
        {fleetData.map((vehicle, index) => {
          const delayClass = `animate-fade-delay-${index + 1}`;

          return (
            <div
              key={index}
              className={`flex flex-col items-center text-center bg-[#00537E] p-5 rounded-xl shadow-lg text-white opacity-0 animate-fade-up ${delayClass} transition-colors duration-300 hover:bg-[#F5A623]`}
            >
              {vehicle.image && (
                <Image
                  src={vehicle.image}
                  alt={vehicle.name}
                  width={400}
                  height={240}
                  className="w-full h-60 object-cover rounded-md"
                />
              )}
              <div className="mt-4">
                <h3 className="text-xl font-semibold">{vehicle.name}</h3>
                <p className="text-sm mt-1">{vehicle.role}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
