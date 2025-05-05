import LineDetailsClient from "../LineDetailsClient";
import { notFound } from "next/navigation";
import { getLineById } from "@/services/lineService";

// 🔹 Dynamic metadata function
export async function generateMetadata({ params }) {
  try {
    const line = await getLineById(params.id);

    return {
      title: `${line.Name} – Shuttle Line | KMG`,
      description: line.ShortDescription || line.Description || "Explore one of our exciting shuttle lines with KMG Shuttles.",
      openGraph: {
        title: `${line.Name} – Shuttle Line | KMG`,
        description: line.ShortDescription || line.Description,
        url: `https://kmgshuttles.al/lines/${params.id}`,
        type: "article",
        images: line.Images?.map((src) => ({
          url: `https://kmgshuttles.al${src}`,
          width: 1200,
          height: 630,
          alt: line.Name,
        })) || [],
      },
      robots: { index: true, follow: true },
    };
  } catch (err) {
    console.error("Failed to generate metadata for line:", err);
    return {
      title: "Line Not Found | KMG",
      description: "This line could not be found.",
      robots: { index: false, follow: false },
    };
  }
}

// 🔹 Mark page as dynamic
export const dynamic = "force-dynamic";

// 🔹 Main component
export default async function Page({ params }) {
  const { id } = params;

  if (!id) return notFound();

  try {
    const line = await getLineById(id);
    return <LineDetailsClient line={line} />;
  } catch (error) {
    console.error("Error fetching line:", error);
    return notFound();
  }
}
