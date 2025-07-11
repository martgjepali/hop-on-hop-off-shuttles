"use client";
import React, { useEffect, useState } from "react";
import {
  getSchedules,
  deleteLineSchedules,
  updateLineSchedule,
} from "@/services/lineService";

export default function ScheduleTable({ lineId }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5; // 5 items per page

  useEffect(() => {
    async function fetchSchedules() {
      setLoading(true);
      try {
        const response = await getSchedules(lineId);
        console.log("Fetched schedules:", response);
        setSchedules(response);
        setCurrentPage(1); // reset to first page when lineId changes
      } catch (error) {
        console.error("Failed to fetch schedules:", error);
      } finally {
        setLoading(false);
      }
    }

    if (lineId) {
      fetchSchedules();
    }
  }, [lineId]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return (
      date.toLocaleDateString("en-GB") +
      " " +
      date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
    );
  };

  const totalPages = Math.ceil(schedules.length / pageSize);
  const paginatedSchedules = schedules.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handleEditClick = (schedule) => {
    setSelectedSchedule(schedule);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (scheduleId) => {
    if (confirm("Are you sure you want to delete this schedule?")) {
      try {
        await deleteLineSchedules([scheduleId]);
        // Refresh schedules
        const response = await getSchedules(lineId);
        setSchedules(response);
      } catch (error) {
        console.error("Failed to delete schedule:", error);
      }
    }
  };

  return (
    <div className="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
      <table className="min-w-full divide-y divide-gray-300">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Schedule ID
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Scheduled Date Time
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Capacity
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                Loading...
              </td>
            </tr>
          ) : paginatedSchedules.length === 0 ? (
            <tr>
              <td colSpan="4" className="px-6 py-4 text-center text-gray-500">
                No schedules found.
              </td>
            </tr>
          ) : (
            paginatedSchedules.map((schedule) => (
              <tr key={schedule.ScheduleID}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {schedule.ScheduleID}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {formatDate(schedule.StartDateTime)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {schedule.Capacity}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <button
                    onClick={() => handleEditClick(schedule)}
                    className="text-indigo-600 hover:text-indigo-900 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(schedule.ScheduleID)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      {!loading && schedules.length > pageSize && (
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50">
          <button
            onClick={handlePrev}
            disabled={currentPage === 1}
            className={`px-4 py-2 border rounded ${
              currentPage === 1
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            }`}
          >
            Previous
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 border rounded ${
              currentPage === totalPages
                ? "text-gray-400 border-gray-300 cursor-not-allowed"
                : "text-indigo-600 border-indigo-600 hover:bg-indigo-50"
            }`}
          >
            Next
          </button>
        </div>
      )}
      {isEditModalOpen && selectedSchedule && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow w-full max-w-md relative">
            <h2 className="text-lg font-bold mb-4">Edit Schedule</h2>

            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  await updateLineSchedule(selectedSchedule.ScheduleID, {
                    StartDateTime: selectedSchedule.StartDateTime,
                    Capacity: selectedSchedule.Capacity,
                    LineID: selectedSchedule.LineID,
                  });
                  // Refresh list after update
                  const response = await getSchedules(lineId);
                  setSchedules(response);
                  setIsEditModalOpen(false);
                } catch (error) {
                  console.error("Failed to update schedule:", error);
                }
              }}
            >
              <label className="block mb-2">
                Start Date Time
                <input
                  type="datetime-local"
                  value={selectedSchedule.StartDateTime.slice(0, 16)}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      StartDateTime: e.target.value,
                    })
                  }
                  className="w-full border px-2 py-1 mt-1 rounded"
                />
              </label>

              <label className="block mb-4">
                Capacity
                <input
                  type="number"
                  value={selectedSchedule.Capacity}
                  onChange={(e) =>
                    setSelectedSchedule({
                      ...selectedSchedule,
                      Capacity: parseInt(e.target.value),
                    })
                  }
                  className="w-full border px-2 py-1 mt-1 rounded"
                />
              </label>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 border rounded text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
