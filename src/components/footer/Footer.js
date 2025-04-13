import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative isolate px-4 py-10 text-gray-800">
      {/* Background Gradient */}
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

      <div className="md:w-2/3 w-full mx-auto flex flex-col">
        {/* Large Heading */}
        <div className="text-4xl font-bold">
          <h1 className="w-full md:w-2/3">
            Plan your next trip with us. Get in touch!
          </h1>
        </div>

        {/* Main Row: Info + Contact Button */}
        <div className="flex mt-8 flex-col md:flex-row md:justify-between">
          <p className="w-full md:w-2/3 text-gray-800">
            We offer comfortable shuttle services and guided tours across
            Sarande, Porto Palermo, Borsh, Gjirokaster, Lukove, and more. Let us
            handle your transport and tour needs so you can focus on having an
            unforgettable journey.
          </p>
          <div className="w-44 pt-6 md:pt-0">
            <Link
              href="/contact"
              className="bg-[#00537E] text-white rounded-lg shadow px-10 py-3 flex items-center justify-center hover:bg-[#F5A623] transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Footer Navigation & Socials */}
        <div className="flex flex-col">
          <div className="flex mt-24 mb-12 flex-row justify-between items-center">
            {/* Footer Nav Links */}
            <nav className="hidden md:flex space-x-6">
              <Link
                href="/fleet"
                className="cursor-pointer text-gray-800 hover:text-[#F5A623] uppercase"
              >
                Fleet
              </Link>
              <Link
                href="/lines"
                className="cursor-pointer text-gray-800 hover:text-[#F5A623] uppercase"
              >
                Lines
              </Link>
              <Link
                href="/contact"
                className="cursor-pointer text-gray-800 hover:text-[#F5A623] uppercase"
              >
                Contact
              </Link>
            </nav>

            {/* Social Icons */}
            <div className="flex flex-row space-x-6 items-center text-gray-800">
              {/* Facebook, Instagram, and YouTube icons remain unchanged */}
            </div>
          </div>

          <hr className="border-gray-400" />

          <p className="w-full text-center my-12 text-gray-800">
            © {new Date().getFullYear()} Hop On Hop Off Shuttles. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
