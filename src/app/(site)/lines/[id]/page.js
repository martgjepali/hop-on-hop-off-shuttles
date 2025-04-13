import LineDetailsClient from "../LineDetailsClient";
import { notFound } from "next/navigation";
import { getLineById } from "@/services/lineService";

export const dynamic = "force-dynamic"; // ✅ Disable static export

export default async function Page(props) {
  const { id } = await props.params; // ✅ Await the params object

  if (!id) return notFound();

  try {
    const line = await getLineById(id);
    return <LineDetailsClient line={line} />;
  } catch (error) {
    console.error("Error fetching line:", error);
    return notFound();
  }
}
