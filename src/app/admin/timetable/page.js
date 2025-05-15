"use client";

import { useEffect, useState } from "react";
import TimeTableCard from "@/components/timetable_card/TimeTableCard";
import Spinner from "@/components/ui/spinner/Spinner";
import { getAllTimeTables, updateTimeTable } from "@/services/timeTableService";

export default function EditTimeTablePage() {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getAllTimeTables();
        const normalized = data.map((item) => ({
          ...item,
          table: item.rows,
        }));
        setTables(normalized);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch timetables:", error);
      }
    }

    fetchData();
  }, []);

  const updateTable = async (idx, newRows) => {
    try {
      const updated = { ...tables[idx], rows: newRows };
      const response = await updateTimeTable(tables[idx].ID, updated);

      setTables((prev) => {
        const copy = [...prev];
        copy[idx] = { ...response, table: response.rows };
        return copy;
      });
    } catch (err) {
      console.error("Failed to update timetable:", err);
    }
  };

  if (loading)
    return (
      <div className="text-center text-gray-600 mt-20">
        <Spinner />
      </div>
    );
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-sky-800 mb-8">Edit Timetables</h1>

      {tables.map((tbl, idx) => (
        <div key={tbl.ID} className="mb-12">
          <h2 className="text-2xl font-bold text-sky-800">{tbl.LineName}</h2>
          <p className="italic text-gray-600 text-sm mb-4">{tbl.Route}</p>
          <TimeTableCard
            data={tbl}
            onUpdate={(rows) => updateTable(idx, rows)}
          />
        </div>
      ))}
    </div>
  );
}
