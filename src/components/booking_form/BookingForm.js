"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { createBooking } from "@/services/bookingService";
import toast from "react-hot-toast";

export default function ReservationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // We read the lineName (the actual line name), plus the hidden IDs and date
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
    // User-facing fields:
    FullName: "",
    Email: "",
    Age: 0,
    Nationality: "",
    PhoneNumber: "",
    NumberOfPeople: 1,

    // Optional companions array:
    companions: [],
    Status: "pending",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Generic handler for top-level fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ["Age", "NumberOfPeople", "LineID", "ScheduleID"].includes(name)
        ? Number(value)
        : value,
    }));
  };

  // For companions
  const handleCompanionChange = (index, e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const updated = [...prev.companions];
      updated[index] = {
        ...updated[index],
        [name]: name === "Age" ? Number(value) : value,
      };
      return { ...prev, companions: updated };
    });
  };

  const addCompanion = () => {
    setFormData((prev) => ({
      ...prev,
      companions: [
        ...prev.companions,
        {
          FullName: "",
          Email: "",
          Age: 0,
          Nationality: "",
          PhoneNumber: "",
        },
      ],
    }));
  };

  const removeCompanion = (index) => {
    setFormData((prev) => {
      const updated = prev.companions.filter((_, i) => i !== index);
      return { ...prev, companions: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Construct final payload
      const bookingPayload = {
        ...formData,
        // Ensure numeric fields are actually numbers
        Age: Number(formData.Age),
        NumberOfPeople: Number(formData.NumberOfPeople),
        LineID: Number(formData.LineID),
        ScheduleID: Number(formData.ScheduleID),
      };

      const result = await createBooking(bookingPayload);

      if (!result.ok) {
        const errData = await result.json();
        if (errData?.detail === "Not enough capacity on this schedule.") {
          toast.error(
            "🚫 This trip is fully booked. Please select another schedule."
          );
        } else {
          toast.error(errData?.detail || "Booking failed. Please try again.");
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

  // Utility function to format date and time
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
    <section className="relative isolate px-6 pt-5 py-6 sm:p-35">
      {/* Background gradient */}
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 top-[-40%] w-[40rem] sm:w-[60rem] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F5A623] to-[#FFDC91] opacity-30"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-2xl mx-auto bg- rounded-md shadow p-6">
        <h1 className="text-2xl font-bold mb-4">Book Your Trip</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit}>
          {/* Hidden fields for IDs and BookingDateTime */}
          <input type="hidden" name="LineID" value={formData.LineID} />
          <input type="hidden" name="ScheduleID" value={formData.ScheduleID} />
          {/* <input
            type="hidden"
            name="BookingDateTime"
            value={formData.BookingDateTime}
          /> */}

          {/* Display the line name if you want, or hide it as well */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Line Name
            </label>
            <input
              type="text"
              name="LineType"
              value={formData.LineType}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* FullName */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="FullName"
              value={formData.FullName}
              onChange={handleChange}
              placeholder="Your full name"
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              placeholder="Your email"
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Age */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Age
            </label>
            <input
              type="number"
              name="Age"
              value={formData.Age}
              onChange={handleChange}
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Nationality */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nationality
            </label>
            <input
              type="text"
              name="Nationality"
              value={formData.Nationality}
              onChange={handleChange}
              placeholder="Your nationality"
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* PhoneNumber */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
              placeholder="Your phone number"
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Scheduled Start Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Start Time
            </label>
            <input
              type="text"
              name="BookingDateTime"
              value={formatDateTime(formData.BookingDateTime)}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* Scheduled End Time */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              End Time
            </label>
            <input
              type="text"
              name="EndDateTime"
              value={formatDateTime(formData.EndDateTime)}
              readOnly
              className="w-full border rounded p-2 bg-gray-100"
            />
          </div>

          {/* NumberOfPeople */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Number of People
            </label>
            <input
              type="number"
              name="NumberOfPeople"
              value={formData.NumberOfPeople}
              onChange={handleChange}
              min="1"
              className="w-full border rounded p-2"
              required
            />
          </div>

          {/* Companion Details if NumberOfPeople > 1 */}
          {formData.NumberOfPeople > 1 && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-2">Companion Details</h2>
              {formData.companions.map((comp, index) => (
                <div
                  key={index}
                  className="border p-3 mb-3 rounded relative bg-gray-50"
                >
                  {/* Companion FullName */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="FullName"
                      value={comp.FullName}
                      onChange={(e) => handleCompanionChange(index, e)}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>

                  {/* Companion Email */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      name="Email"
                      value={comp.Email}
                      onChange={(e) => handleCompanionChange(index, e)}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>

                  {/* Companion Age */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      name="Age"
                      value={comp.Age}
                      onChange={(e) => handleCompanionChange(index, e)}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>

                  {/* Companion Nationality */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Nationality
                    </label>
                    <input
                      type="text"
                      name="Nationality"
                      value={comp.Nationality}
                      onChange={(e) => handleCompanionChange(index, e)}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>

                  {/* Companion PhoneNumber */}
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      name="PhoneNumber"
                      value={comp.PhoneNumber}
                      onChange={(e) => handleCompanionChange(index, e)}
                      className="w-full border rounded p-2"
                      required
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => removeCompanion(index)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addCompanion}
                className="bg-[#F5A623] text-white px-3 py-2 rounded hover:bg-[#ff9d00] transition"
              >
                Add Companion
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-[#00537E] text-white px-4 py-2 rounded hover:bg-[#F5A623] disabled:opacity-50  transition-colors"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Booking"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
