import LineTable from "@/components/ui/LineTable/LineTable";

export default function LinesPage() {
  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-sky-800">Manage Lines</h1>
      <LineTable />
    </main>
  );
}
