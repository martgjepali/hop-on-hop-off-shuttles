// ✅ page.jsx or page.js
import LineDetailsClient from "../LineDetailsClient";
import { notFound } from "next/navigation";
import { getLineById } from "@/services/lineService";

// ✅ Make generateMetadata fully async-safe
export async function generateMetadata(props) {
  const params = await props.params;
  const id = params.id;

  if (!id) return { title: "Not Found", robots: { index: false } };

  try {
    const line = await getLineById(id);
    return {
      title:
        line.Name === "Culture Line"
          ? "Gjirokaster Tour & Blue Eye Shuttle Tour – Culture Line | KMG Shuttles"
          : line.Name === "Sea Line"
          ? "Albanian Riviera Shuttle – Sea Line | KMG Shuttles"
          : line.Name === "Sun Line"
          ? "Blue Eye Shuttle Tour – Sun Line | Tours From Saranda to Blue Eye by KMG"
          : `${line.Name} Shuttle Line | KMG Shuttles`,
      openGraph: {
        title: `${line.Name} – Shuttle Line | KMG`,
        description:
          line.Name === "Culture Line"
            ? "Join our Culture Line shuttle tour to Gjirokaster, Blue Eye, Lekuresi Castle, and Mesopotam Monastery. Departing from Saranda daily."
            : line.Name === "Sea Line"
            ? "Take the Albanian Riviera Shuttle – Sea Line, visiting Porto Palermo, Himare, and Borsh from Saranda. Scenic beach experience guaranteed!"
            : line.Name === "Sun Line"
            ? "Hop on the Sun Line for direct shuttles from Saranda to the Blue Eye. Fast, convenient, and perfect for day trips."
            : line.ShortDescription ||
              line.Description ||
              "Explore Albania's beautiful shuttle routes with KMG.",

        url: `https://kmgshuttles.al/lines/${id}`,
        type: "article",
        images:
          line.Images?.map((src) => ({
            url: `https://kmgshuttles.al${src}`,
            width: 1200,
            height: 630,
            alt: line.Name,
          })) || [],
      },
      robots: { index: true, follow: true },
    };
  } catch (err) {
    console.error("Metadata generation failed:", err);
    return {
      title: "Line Not Found | KMG",
      description: "This line could not be found.",
      robots: { index: false, follow: false },
    };
  }
}

// ✅ Mark page as dynamic
export const dynamic = "force-dynamic";

// ✅ Main Page
export default async function Page(props) {
  const params = await props.params;
  const id = params.id;

  if (!id) return notFound();

  try {
    const line = await getLineById(id);
    return <LineDetailsClient line={line} />;
  } catch (error) {
    console.error("Error fetching line:", error);
    return notFound();
  }
}
