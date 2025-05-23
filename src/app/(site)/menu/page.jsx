import Image from "next/image";

export default function MenuSection() {
  const menuImages = [
    "/images/menu/1.png",
    "/images/menu/2.png",
    "/images/menu/3.png",
    "/images/menu/4.png",
    "/images/menu/5.png",
    "/images/menu/6.png",
    "/images/menu/7.png",
  ];

  return (
    <section className="bg-black py-12 text-center relative">
      {/* Decorative blur background */}
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

      {/* Main heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#F5A623] mb-2">
        AMF PUB - BEST Pre-Drinking place in Saranda!
      </h1>

      {/* Subheading */}
      <p className="text-white text-base sm:text-lg mb-8 max-w-xl mx-auto leading-relaxed">
        Daily music and Karaoke <br />
        Albanian night once per week! <br />
        <span className="text-[#F5A623] font-semibold">
          ALL COCKTAILS, LONG DRINKS AND SHOTS 1€ - 5€
        </span>
      </p>

      {/* Menu grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4">
        {menuImages.map((src, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden"
          >
            <Image
              src={src}
              alt={`Menu page ${index + 1}`}
              width={768}
              height={1536}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
