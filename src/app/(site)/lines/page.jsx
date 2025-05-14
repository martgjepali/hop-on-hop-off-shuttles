import LinesPageClient from "./LinesPageClient";

export const metadata = {
  title: "Explore All Shuttle Lines – KMG Shuttles",
  description:
    "View all available shuttle lines in Saranda and beyond. Affordable, flexible, and scenic tours with KMG.",
  openGraph: {
    title: "Explore All Shuttle Lines – KMG",
    description: "Affordable, scenic shuttle tours through Albania.",
    url: "https://kmgshuttles.al/lines",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function LinesPage() {
  return <LinesPageClient />;
}
