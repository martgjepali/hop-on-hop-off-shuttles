"use client";

import { useState } from "react";
import { deleteBookings } from "@/services/bookingService";

const Table = ({ data, onAccept, onDecline, onBookingsDeleted }) => {
  // Number of rows to show per page
  const ITEMS_PER_PAGE = 5;

  // Track the current page
  const [currentPage, setCurrentPage] = useState(1);

  // New state for filtering by date (in "YYYY-MM-DD" format)
  const [filterDate, setFilterDate] = useState("");

  // State to track selected booking IDs for deletion
  const [selectedBookings, setSelectedBookings] = useState([]);

  // Handler for date filter input changes
  const handleFilterChange = (e) => {
    setFilterDate(e.target.value);
    // Reset current page when filter changes
    setCurrentPage(1);
  };

  // Filter data by Booking Date if a filter is set
  const filteredData = filterDate
    ? data.filter((booking) => {
        // Convert booking date/time to YYYY-MM-DD
        const bookingDate = new Date(booking.BookingDateTime)
          .toISOString()
          .slice(0, 10);
        return bookingDate === filterDate;
      })
    : data;

  // Calculate total pages based on filtered data
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  // Calculate start and end indices for the current page slice
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  // Slice the filtered data for the current page
  const currentData = filteredData.slice(startIndex, endIndex);

  // Go to the previous page
  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  // Go to the next page
  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Format datetime for display using toLocaleString
  const formatDateTime = (dateString) => {
    const options = { dateStyle: "medium", timeStyle: "short" };
    const dt = new Date(dateString);
    return dt.toLocaleString("en-US", options);
  };

  // Handle selection changes from checkboxes
  const handleCheckboxChange = (bookingId, isChecked) => {
    setSelectedBookings((prev) => {
      if (isChecked) {
        return [...prev, bookingId];
      } else {
        return prev.filter((id) => id !== bookingId);
      }
    });
  };

  // Delete all selected bookings and refresh the table
  const handleDeleteSelected = async () => {
    if (selectedBookings.length === 0) return;
    try {
      // Call the API to delete the selected bookings
      await deleteBookings(selectedBookings);

      // Call the parent's callback to remove deleted bookings from state
      if (onBookingsDeleted) {
        onBookingsDeleted(selectedBookings);
      }
      // Clear the selection after deletion
      setSelectedBookings([]);
    } catch (error) {
      console.error("Error deleting multiple bookings:", error);
      alert(error.message || "Failed to delete bookings");
    }
  };

  return (
    <div className="my-6 w-full">
      {/* Filter and Delete Selected Controls */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label htmlFor="filterDate" className="mr-2 font-medium">
            Filter by Booking Date:
          </label>
          <input
            id="filterDate"
            type="date"
            value={filterDate}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <button
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          disabled={selectedBookings.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
        <table className="w-full border-collapse table-auto text-sm">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wide">
            <tr>
              {/* Checkbox column header */}
              <th className="px-4 py-2 font-semibold">Select</th>
              <th className="px-4 py-2 font-semibold">Booking ID</th>
              <th className="px-4 py-2 font-semibold">Line Type</th>
              <th className="px-4 py-2 font-semibold">Full Name</th>
              <th className="px-4 py-2 font-semibold">Email</th>
              <th className="px-4 py-2 font-semibold">Age</th>
              <th className="px-4 py-2 font-semibold">Phone Number</th>
              <th className="px-4 py-2 font-semibold">Number of People</th>
              <th className="px-4 py-2 font-semibold">Status</th>
              <th className="px-4 py-2 font-semibold">
                Booking Date &amp; Time
              </th>
              <th className="px-4 py-2 font-semibold">Companions</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((booking, idx) => (
              <tr
                key={booking.BookingID}
                className={`border-b text-gray-800 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                {/* Checkbox cell */}
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedBookings.includes(booking.BookingID)}
                    onChange={(e) =>
                      handleCheckboxChange(booking.BookingID, e.target.checked)
                    }
                  />
                </td>
                <td className="px-4 py-2">{booking.BookingID}</td>
                <td className="px-4 py-2">{booking.LineType}</td>
                <td className="px-4 py-2">{booking.FullName}</td>
                <td className="px-4 py-2">{booking.Email}</td>
                <td className="px-4 py-2">{booking.Age}</td>
                <td className="px-4 py-2">{booking.PhoneNumber}</td>
                <td className="px-4 py-2">{booking.NumberOfPeople}</td>
                <td className="px-4 py-2">{booking.Status}</td>
                <td className="px-4 py-2">
                  {formatDateTime(booking.BookingDateTime)}
                </td>
                <td className="px-4 py-2 align-top">
                  {Array.isArray(booking.companions) &&
                  booking.companions.length > 0 ? (
                    <ul className="space-y-4">
                      {booking.companions.map((companion, index) => (
                        <li
                          key={index}
                          className="p-4 border border-gray-200 rounded shadow-sm bg-gray-50"
                        >
                          <p className="font-semibold mb-2">
                            Companion {index + 1}
                          </p>
                          <p>
                            <strong>Name:</strong> {companion.FullName}
                          </p>
                          <p>
                            <strong>Age:</strong> {companion.Age}
                          </p>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>No companions</span>
                  )}
                </td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => onAccept(booking.BookingID)}
                    className="bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => onDecline(booking.BookingID)}
                    className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600 transition-colors"
                  >
                    Decline
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-center py-4 space-x-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>

        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>

        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Table;
