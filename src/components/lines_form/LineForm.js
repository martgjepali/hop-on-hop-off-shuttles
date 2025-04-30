"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { createLine, createLineSchedule } from "@/services/lineService";

export default function LineForm() {
  const [Name, setName] = useState("");
  const [TripLabel, setTripLabel] = useState("");
  const [Description, setDescription] = useState("");
  const [StartLocation, setStartLocation] = useState("");
  const [EndLocation, setEndLocation] = useState("");
  const [Price, setPrice] = useState(0);
  const [Included, setIncluded] = useState("");
  const [NotIncluded, setNotIncluded] = useState("");
  const [Faq, setFaq] = useState("");
  const [ShortLabel, setShortLabel] = useState("");
  const [Itinerary, setItinerary] = useState("");
  const [ItineraryDescription, setItineraryDescription] = useState("");
  const [ShortDescription, setShortDescription] = useState("");
  const [Images, setImages] = useState([]);

  const [schedules, setSchedules] = useState([{ StartDateTime: "" }]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isoToDate = (isoString) => {
    if (!isoString) return null;
    const date = new Date(isoString);
    return isNaN(date.getTime()) ? null : date;
  };

  const handleScheduleDateChange = (index, dateObj) => {
    const newSchedules = [...schedules];
    newSchedules[index].StartDateTime = dateObj?.toISOString() || "";
    setSchedules(newSchedules);
  };

  const handleAddSchedule = () => {
    setSchedules([...schedules, { StartDateTime: "" }]);
  };

  const handleRemoveSchedule = (index) => {
    const updated = schedules.filter((_, i) => i !== index);
    setSchedules(updated);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("Selected files:", files); // optional debug
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("Name", Name);
      formData.append("TripLabel", TripLabel);
      formData.append("Description", Description);
      formData.append("StartLocation", StartLocation);
      formData.append("EndLocation", EndLocation);
      formData.append("Price", Price.toString());
      formData.append("Included", Included);
      formData.append("NotIncluded", NotIncluded);
      formData.append("Faq", Faq);
      formData.append("ShortLabel", ShortLabel);
      formData.append("Itinerary", Itinerary);
      formData.append("ItineraryDescription", ItineraryDescription);
      formData.append("ShortDescription", ShortDescription);
      Images.forEach((file) => formData.append("images", file));

      const createdLine = await createLine(formData);
      const lineId = createdLine.LineID || createdLine.id;

      const validSchedules = schedules.filter((s) => s.StartDateTime !== "");
      if (validSchedules.length > 0) {
        await createLineSchedule(lineId, validSchedules);
      }

      alert("Line and schedules created successfully!");
      resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      alert("Something went wrong. See console.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setTripLabel("");
    setDescription("");
    setStartLocation("");
    setEndLocation("");
    setPrice(0);
    setIncluded("");
    setNotIncluded("");
    setFaq("");
    setShortLabel("");
    setItinerary("");
    setItineraryDescription("");
    setShortDescription("");
    setImages([]);
    setSchedules([{ StartDateTime: "" }]);
  };

  const renderInput = (
    label,
    value,
    setter,
    type = "text",
    required = false
  ) => (
    <div className="relative z-0 w-full group">
      <input
        type={type}
        name={label}
        id={label}
        value={value}
        onChange={(e) => setter(e.target.value)}
        className="block w-full py-2.5 px-0 text-sm text-gray-900 bg-transparent 
                   border-0 border-b-2 border-gray-300 appearance-none 
                   focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        placeholder=" "
        required={required}
      />
      <label
        htmlFor={label}
        className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 
                   top-3 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 
                   peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 
                   peer-focus:scale-75 peer-focus:-translate-y-6"
      >
        {label.replace(/([A-Z])/g, " $1").trim()}
      </label>
    </div>
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm sm:max-w-md md:max-w-2xl mt-2 space-y-4"
    >
      <h1 className="text-2xl font-bold mb-4">Add Line</h1>

      {/* Line Fields */}
      {renderInput("Name", Name, setName, "text", true)}
      {renderInput("TripLabel", TripLabel, setTripLabel)}
      {renderInput("Description", Description, setDescription, "text", true)}
      {renderInput(
        "StartLocation",
        StartLocation,
        setStartLocation,
        "text",
        true
      )}
      {renderInput("EndLocation", EndLocation, setEndLocation, "text", true)}
      {renderInput("Price", Price, setPrice, "number", true)}
      {renderInput("Included", Included, setIncluded)}
      {renderInput("NotIncluded", NotIncluded, setNotIncluded)}
      {renderInput("Faq", Faq, setFaq)}
      {renderInput("ShortLabel", ShortLabel, setShortLabel)}
      {renderInput("Itinerary", Itinerary, setItinerary)}
      {renderInput(
        "ItineraryDescription",
        ItineraryDescription,
        setItineraryDescription
      )}
      {renderInput("ShortDescription", ShortDescription, setShortDescription)}

      <div className="relative z-0 w-full group">
        <input
          type="file"
          name="images"
          id="images"
          multiple
          onChange={handleImageChange} // <-- now using your defined function
          className="block w-full text-sm text-gray-900 border-0 
         file:mr-4 file:py-2.5 file:px-4 file:border-0 
         file:text-sm file:font-semibold 
         file:bg-blue-50 file:text-blue-700 
         hover:file:bg-blue-100"
        />

        {Images.length > 0 && (
          <ul className="text-sm text-gray-600 list-disc pl-5">
            {Images.map((file, idx) => (
              <li key={idx}>{file.name}</li>
            ))}
          </ul>
        )}
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
        <button
          type="button"
          onClick={handleAddSchedule}
          className="bg-gray-200 text-gray-700 px-3 py-1 rounded hover:bg-gray-300"
        >
          + Add Schedule
        </button>
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className={`text-white bg-blue-700 hover:bg-blue-800 
             focus:ring-4 focus:outline-none focus:ring-blue-300 
             font-medium rounded-lg text-sm w-full 
             px-5 py-2.5 text-center mb-6 pb-4
             ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
}
