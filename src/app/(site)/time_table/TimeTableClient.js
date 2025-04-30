"use client";

import TimetableTable from "@/components/time_table/TimeTable";
import { timetableData } from "@/constants/timeTableData";

const TimeTableClient = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 py-6 sm:py-35">
      {timetableData.map((entry, idx) => (
        <div key={idx} className="mb-10">
          <h3 className="text-2xl font-bold text-[#00537E] mb-2">
            {entry.line}
          </h3>
          <p className="text-sm italic mb-4 text-gray-600">{entry.route}</p>
          <TimetableTable timetable={entry.table} />
        </div>
      ))}
    </div>
  );
};

export default TimeTableClient;
