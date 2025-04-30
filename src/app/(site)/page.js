import Hero from "@/components/hero/Hero";
import Testimonials from "@/components/testimonials/Testimonials";

export const metadata = {
  title:
    "KMG Shuttles – Explore Saranda with Albania’s Trusted Hop-On Hop-Off Service",
  description:
    "Discover Saranda’s beauty with KMG’s affordable, flexible hop-on hop-off shuttle service. Explore hidden gems in comfort with no guides, just freedom and savings.",
  keywords: [
    "Saranda transport",
    "hop-on hop-off Albania",
    "KMG shuttles",
    "sightseeing Saranda",
    "travel Albania",
    "Blue Eye shuttle",
  ],
  openGraph: {
    title: "KMG Shuttles – Explore Saranda the Smart Way",
    description:
      "Hop-on hop-off shuttle tours in Saranda with the best flexibility and prices.",
    url: "https://kmgshuttles.al",
    type: "website",
    images: [
      {
        url: "https://kmgshuttles.al/images/fleet4.jpeg",
        width: 1200,
        height: 630,
        alt: "KMG Shuttle Fleet in Saranda",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HomePage() {
  return (
    <main className="pt-0min-h-screen">
      {/* Hero Section (two-column layout) */}
      <Hero />

      {/* Testimonials Section */}
   
        <Testimonials />

    </main>
  );
}
