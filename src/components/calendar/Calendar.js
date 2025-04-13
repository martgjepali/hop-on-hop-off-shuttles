"use client";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Calendar({ selectedDate, onDateChange }) {
  return (
    <div className="w-full">
      <DatePicker
        selected={selectedDate}
        onChange={onDateChange}
        dateFormat="MMMM d, yyyy"
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-orange-500"
      />
    </div>
  );
}
