"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createLine, createLineSchedule } from "@/services/lineService";

export default function LineForm() {
  // -- Line fields --
  const [Name, setName] = useState("");
  const [Description, setDescription] = useState("");
  const [StartLocation, setStartLocation] = useState("");
  const [EndLocation, setEndLocation] = useState("");
  const [Duration, setDuration] = useState(0);
  const [Price, setPrice] = useState(0);

  // -- Schedules: each object will be { StartDateTime: "2025-03-20T10:34:12.206Z" } in ISO form
  const [schedules, setSchedules] = useState([{ StartDateTime: "" }]);

  // Loading state for form submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper: Convert ISO string to JavaScript Date (or null)
  function isoToDate(isoString) {
    if (!isoString) return null;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  }

  // Update schedule date/time in state
  function handleScheduleDateChange(index, dateObj) {
    const newSchedules = [...schedules];
    newSchedules[index].StartDateTime = dateObj ? dateObj.toISOString() : "";
    setSchedules(newSchedules);
  }

  // Add another schedule entry
  function handleAddSchedule() {
    setSchedules([...schedules, { StartDateTime: "" }]);
  }

  // Remove a schedule entry
  function handleRemoveSchedule(index) {
    const newSchedules = schedules.filter((_, i) => i !== index);
    setSchedules(newSchedules);
  }

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // 1) Create the line
      const lineData = {
        Name,
        Description,
        StartLocation,
        EndLocation,
        Duration: Number(Duration),
        Price: Number(Price),
      };
      const createdLine = await createLine(lineData);

      // 2) Create schedules if any
      const lineId = createdLine.id || createdLine.LineID; // Adjust based on your API response
      const validSchedules = schedules.filter((s) => s.StartDateTime !== "");
      if (validSchedules.length > 0) {
        await createLineSchedule(lineId, validSchedules);
      }

      alert("Line and schedules created successfully!");

      // Reset form
      setName("");
      setDescription("");
      setStartLocation("");
      setEndLocation("");
      setDuration(0);
      setPrice(0);
      setSchedules([{ StartDateTime: "" }]);
    } catch (error) {
      console.error("Error creating line or schedules:", error);
      alert("Failed to create line or schedules. Check console for details.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm sm:max-w-md md:max-w-2xl mt-2 space-y-4"
    >
      <h1 className="text-2xl font-bold mb-4">Add Line</h1>
      {/* Line Fields */}
      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="Name"
          id="Name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent 
                     border-0 border-b-2 border-gray-300 appearance-none 
                     focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="Name"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                     top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                     peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Name
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="Description"
          id="Description"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent 
                     border-0 border-b-2 border-gray-300 appearance-none 
                     focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="Description"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                     top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                     peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Description
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="StartLocation"
          id="StartLocation"
          value={StartLocation}
          onChange={(e) => setStartLocation(e.target.value)}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent 
                     border-0 border-b-2 border-gray-300 appearance-none 
                     focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="StartLocation"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                     top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                     peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Start Location
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="text"
          name="EndLocation"
          id="EndLocation"
          value={EndLocation}
          onChange={(e) => setEndLocation(e.target.value)}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent 
                     border-0 border-b-2 border-gray-300 appearance-none 
                     focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="EndLocation"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                     top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                     peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          End Location
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="number"
          name="Duration"
          id="Duration"
          value={Duration}
          onChange={(e) => setDuration(e.target.value)}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent 
                     border-0 border-b-2 border-gray-300 appearance-none 
                     focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="Duration"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                     top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                     peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Duration (minutes or hours)
        </label>
      </div>

      <div className="relative z-0 w-full group">
        <input
          type="number"
          name="Price"
          id="Price"
          value={Price}
          onChange={(e) => setPrice(e.target.value)}
          className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent 
                     border-0 border-b-2 border-gray-300 appearance-none 
                     focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
        />
        <label
          htmlFor="Price"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                     top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                     peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Price
        </label>
      </div>

      {/* Line Schedules */}
      <div className="space-y-4">
        <p className="font-semibold text-lg">Line Schedules</p>
        {schedules.map((schedule, index) => {
          const selectedDate = isoToDate(schedule.StartDateTime);
          return (
            <div key={index} className="mb-4 flex items-center gap-4">
              <div className="flex-1">
                <label className="block font-semibold mb-1">
                  Schedule {index + 1}
                </label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => handleScheduleDateChange(index, date)}
                  showTimeSelect
                  dateFormat="dd/MM/yyyy HH:mm"
                  placeholderText="Select date & time"
                  className="border-b-2 border-gray-300 py-2 px-0 w-full 
                             focus:border-blue-600 focus:outline-none"
                />
              </div>
              {schedules.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSchedule(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Remove
                </button>
              )}
            </div>
          );
        })}
        {/* Single "Add Schedule" Button */}
        <button
          type="button"
          onClick={handleAddSchedule}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
        >
          + Add Schedule
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`text-white bg-blue-700 hover:bg-blue-800 
                   focus:ring-4 focus:outline-none focus:ring-blue-300 
                   font-medium rounded-lg text-sm w-full sm:w-auto 
                   px-5 py-2.5 text-center ${
                     isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                   }`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
