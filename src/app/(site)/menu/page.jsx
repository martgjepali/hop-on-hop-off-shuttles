const restaurants = [
  {
    name: "Restaurant Boulevard '90",
    location: "Saranda Main Promenade",
    description: "Mediteranean/Pizza Cuisine, Daily live music",
    mapUrl: "https://share.google/vwDslaM3hgCKBHUkg",
  },
  {
    name: "Pontil Restaurant",
    location: "Saranda Main Promenade",
    description: "Italian Cuisine, Daily live music",
    mapUrl: "https://share.google/JZ0T6IpUQGoseX9IA",
  },
  {
    name: "Allegro Restaurant",
    location: "Saranda Main Promenade",
    description: "Grill House",
    mapUrl: "https://share.google/TVEuQ6IGbETr6mRab",
  },
  {
    name: "BiT",
    location: "Ksamil main road",
    description:
      "WOK, Sushi, Fried Sea Food, Waffles, Ice-cream, Fresh Juices, Cocktails.",
    highlight: "ALL <6€",
    mapUrl: null,
  },
];

export default function MenuSection() {
  return (
    <section className="bg-black py-12 px-4 relative">
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

      {/* Section heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-[#F5A623] mb-10 text-center">
        Our Restaurants and other Services include:
      </h1>

      {/* Restaurant cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {restaurants.map((r) => (
          <div
            key={r.name}
            className="bg-gray-900 border border-gray-700 rounded-xl p-6 flex flex-col gap-3 shadow-lg"
          >
            <h2 className="text-xl font-bold text-[#F5A623]">{r.name}</h2>
            <p className="text-gray-400 text-sm font-medium">{r.location}</p>
            <p className="text-white text-sm leading-relaxed">{r.description}</p>
            {r.highlight && (
              <p className="text-[#F5A623] font-semibold text-sm">{r.highlight}</p>
            )}
            {r.mapUrl && (
              <a
                href={r.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block text-center bg-[#F5A623] hover:bg-[#e09610] text-black font-semibold text-sm py-2 px-4 rounded-lg transition-colors"
              >
                View on Maps
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
