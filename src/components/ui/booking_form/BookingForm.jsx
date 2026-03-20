"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createBooking } from "@/services/bookingService";
import toast from "react-hot-toast";

function InputField({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-widest text-gray-400">
        {label}
      </label>
      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00537E]/40 focus:border-[#00537E] transition";

const readOnlyClass =
  "w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-3 text-sm text-gray-500 cursor-default";

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialLineName = searchParams.get("LineType") || "";
  const initialLineID = searchParams.get("LineID") || "0";
  const initialScheduleID = searchParams.get("ScheduleID") || "0";
  const initialBookingDateTime = searchParams.get("BookingDateTime") || "";
  const initialEndDateTime = searchParams.get("EndDateTime") || "";

  const [formData, setFormData] = useState({
    LineType: initialLineName,
    LineID: parseInt(initialLineID),
    ScheduleID: parseInt(initialScheduleID),
    BookingDateTime: initialBookingDateTime,
    EndDateTime: initialEndDateTime,
    FullName: "",
    Email: "",
    Age: 0,
    PhoneNumber: "",
    NumberOfPeople: 1,
    companions: [],
    Status: "pending",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["Age", "NumberOfPeople", "LineID", "ScheduleID"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleCompanionChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = [...prev.companions];
      updated[index] = { ...updated[index], [name]: name === "Age" ? Number(value) : value };
      return { ...prev, companions: updated };
    });
  };

  const addCompanion = () => {
    setFormData((prev) => ({
      ...prev,
      companions: [...prev.companions, { FullName: "", Age: 0 }],
    }));
  };

  const removeCompanion = (index) => {
    setFormData((prev) => ({
      ...prev,
      companions: prev.companions.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const bookingPayload = {
        ...formData,
        Age: Number(formData.Age),
        NumberOfPeople: Number(formData.NumberOfPeople),
        LineID: Number(formData.LineID),
        ScheduleID: Number(formData.ScheduleID),
      };
      const { ok, data } = await createBooking(bookingPayload);
      if (!ok) {
        if (data.detail === "Not enough capacity on this schedule.") {
          toast.error("🚫 This trip is fully booked. Please select another schedule.");
        } else {
          toast.error(data.detail || "Booking failed. Please try again.");
        }
        return;
      }
      router.push("/thank_you");
    } catch (err) {
      console.error("Error creating booking:", err);
      setError("Failed to create booking. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  function formatDateTime(dateString) {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    if (isNaN(dateObj.getTime())) return dateString;
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    const hours = String(dateObj.getHours()).padStart(2, "0");
    const minutes = String(dateObj.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  return (
    <section className="relative isolate min-h-screen px-4 pt-6 sm:pt-28 pb-16 lg:px-8">
      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[#F5A623] opacity-10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-[#00537E] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-72 h-72 rounded-full bg-[#FFDC91] opacity-20 blur-2xl" />
      </div>

      <div className="max-w-xl mx-auto opacity-0 animate-fade-up">
        {/* Header */}
        <div className="mb-8 text-center">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5A623] mb-2">
            Reservation
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Book Your Trip</h1>
          <p className="mt-2 text-sm text-gray-500">Fill in your details below to secure your seat.</p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-gray-100 shadow-md px-6 py-8 space-y-5">
          <input type="hidden" name="LineID" value={formData.LineID} />
          <input type="hidden" name="ScheduleID" value={formData.ScheduleID} />

          {/* Line Name */}
          <InputField label="Line">
            <input type="text" name="LineType" value={formData.LineType} readOnly className={readOnlyClass} />
          </InputField>

          {/* Start / End Time */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Departure">
              <input type="text" value={formatDateTime(formData.BookingDateTime)} readOnly className={readOnlyClass} />
            </InputField>
            <InputField label="Return">
              <input type="text" value={formatDateTime(formData.EndDateTime)} readOnly className={readOnlyClass} />
            </InputField>
          </div>

          <div className="border-t border-gray-100 pt-2" />

          {/* Full Name */}
          <InputField label="Full Name">
            <input
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              placeholder="Your full name"
              className={inputClass}
              required
            />
          </InputField>

          {/* Email */}
          <InputField label="Email">
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="you@example.com"
              className={inputClass}
              required
            />
          </InputField>

          {/* Age + Phone */}
          <div className="grid grid-cols-2 gap-4">
            <InputField label="Age">
              <input
                type="number"
                name="Age"
                value={formData.Age}
                onChange={handleChange}
                className={inputClass}
                required
              />
            </InputField>
            <InputField label="Phone Number">
              <input
                type="text"
                name="PhoneNumber"
                value={formData.PhoneNumber}
                onChange={handleChange}
                placeholder="+355 ..."
                className={inputClass}
                required
              />
            </InputField>
          </div>

          {/* Number of People */}
          <InputField label="Number of People">
            <input
              type="number"
              name="NumberOfPeople"
              value={formData.NumberOfPeople}
              onChange={handleChange}
              min="1"
              className={inputClass}
              required
            />
          </InputField>

          {/* Companions */}
          {formData.NumberOfPeople > 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-bold text-gray-700">Companion Details</h2>
                <button
                  type="button"
                  onClick={addCompanion}
                  className="text-xs font-semibold text-[#00537E] hover:text-[#F5A623] transition-colors"
                >
                  + Add companion
                </button>
              </div>
              {formData.companions.map((comp, index) => (
                <div key={index} className="relative rounded-2xl border border-gray-100 bg-gray-50 p-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => removeCompanion(index)}
                    className="absolute top-3 right-3 text-xs text-red-400 hover:text-red-600 transition"
                  >
                    Remove
                  </button>
                  <InputField label="Full Name">
                    <input
                      type="text"
                      name="FullName"
                      value={comp.FullName}
                      onChange={(e) => handleCompanionChange(index, e)}
                      className={inputClass}
                      required
                    />
                  </InputField>
                  <InputField label="Age">
                    <input
                      type="number"
                      name="Age"
                      value={comp.Age}
                      onChange={(e) => handleCompanionChange(index, e)}
                      className={inputClass}
                      required
                    />
                  </InputField>
                </div>
              ))}
            </div>
          )}

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#00537E] hover:bg-[#F5A623] disabled:opacity-50 text-white font-bold rounded-2xl py-4 text-sm shadow-lg hover:shadow-[#F5A623]/30 hover:shadow-xl transition-all duration-300"
            >
              {loading ? "Submitting..." : "Confirm Booking"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
