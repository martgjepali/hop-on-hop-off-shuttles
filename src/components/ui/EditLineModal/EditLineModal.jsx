"use client"

import { useState } from "react";
import { updateLine } from "@/services/lineService";
import toast from "react-hot-toast";

export default function EditLineModal({ line, onClose, onUpdated }) {
  const [formData, setFormData] = useState({
    Name: line.Name || "",
    TripLabel: line.TripLabel || "",
    Description: line.Description || "",
    StartLocation: line.StartLocation || "",
    Itinerary: line.Itinerary || "",
    ItineraryDescription: line.ItineraryDescription || "",
    ShortDescription: line.ShortDescription || "",
    Included: line.Included || "",
    NotIncluded: line.NotIncluded || "",
    Faq: line.Faq || "",
    Price: line.Price || "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    const payload = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      payload.append(key, value);
    });

    try {
      await updateLine(line.LineID, payload);
      toast.success("Line updated!");
      onUpdated(); // trigger refresh
      onClose();   // close modal
    } catch (error) {
      toast.error("Failed to update line");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white w-full max-w-3xl p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-4">Edit Line - {line.Name}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4 max-h-[65vh] overflow-y-auto pr-2">
          {Object.keys(formData).map((field) => (
            <div key={field} className="flex flex-col">
              <label className="font-medium text-sm mb-1">{field}</label>
              <textarea
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border rounded px-2 py-1 text-sm"
                rows={field === "ItineraryDescription" ? 5 : 2}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
