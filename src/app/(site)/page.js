import Image from "next/image";
import Hero from "@/components/hero/Hero";
import Testimonials from "@/components/testimonials/Testimonials";

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
