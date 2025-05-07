"use client";

import { useEffect, useState } from "react";
import TimeTableCard from "@/components/timetable_card/TimeTableCard";
import Spinner from "@/components/spinner/Spinner";
import { getAllTimeTables } from "@/services/timeTableService";

const TimeTableClient = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTimetables() {
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

    fetchTimetables();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600 mt-20"><Spinner /></p>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 py-6 sm:py-12">
      {tables.map((tbl) => (
        <div key={tbl.ID} className="mb-12">
          <h3 className="text-2xl font-bold text-[#00537E] mb-2">
            {tbl.LineName}
          </h3>
          <p className="text-sm italic mb-4 text-gray-600">{tbl.Route}</p>
          <TimeTableCard data={tbl} readOnly />
        </div>
      ))}
    </div>
  );
};

export default TimeTableClient;
