"use client";

import { useEffect, useState } from "react";
import { getLines, deleteLines } from "@/services/lineService";
import EditLineModal from "../EditLineModal/EditLineModal";

export default function LineTable() {
  const [lines, setLines] = useState([]);
  const [selectedLines, setSelectedLines] = useState([]);
  const [selectedLineForEdit, setSelectedLineForEdit] = useState(null);
  const [filterText, setFilterText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  const fetchLines = async () => {
    try {
      const data = await getLines();
      setLines(data);
    } catch (err) {
      console.error("Error fetching lines:", err);
    }
  };

  useEffect(() => {
    fetchLines();
  }, []);

  const filteredLines = filterText
    ? lines.filter((line) =>
        line.Name.toLowerCase().includes(filterText.toLowerCase())
      )
    : lines;

  const totalPages = Math.ceil(filteredLines.length / ITEMS_PER_PAGE);
  const currentData = filteredLines.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCheckboxChange = (id, checked) => {
    setSelectedLines((prev) =>
      checked ? [...prev, id] : prev.filter((lineId) => lineId !== id)
    );
  };

  const handleDeleteSelected = async () => {
    if (selectedLines.length === 0) return;

    const confirm = window.confirm(
      `Are you sure you want to delete ${selectedLines.length} line(s)?`
    );
    if (!confirm) return;

    try {
      await deleteLines(selectedLines);
      alert("Lines deleted successfully!");

      // Refresh the list
      await fetchLines();

      // Clear selection
      setSelectedLines([]);
    } catch (err) {
      console.error("Error deleting lines:", err);
      alert("Failed to delete lines. Please try again.");
    }
  };

  const handleFilterChange = (e) => {
    setFilterText(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="my-6 w-full">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <label htmlFor="filterName" className="mr-2 font-medium">
            Filter by Name:
          </label>
          <input
            id="filterName"
            type="text"
            value={filterText}
            onChange={handleFilterChange}
            className="border border-gray-300 rounded px-2 py-1"
          />
        </div>
        <button
          onClick={handleDeleteSelected}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-colors disabled:opacity-50"
          disabled={selectedLines.length === 0}
        >
          Delete Selected
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded shadow-sm">
        <table className="w-full border-collapse table-auto text-sm">
          <thead className="bg-gray-50 text-gray-700 text-xs uppercase tracking-wide">
            <tr>
              <th className="px-4 py-2 font-semibold">Select</th>
              <th className="px-4 py-2 font-semibold">Line ID</th>
              <th className="px-4 py-2 font-semibold">Name</th>
              <th className="px-4 py-2 font-semibold">Trip Label</th>
              <th className="px-4 py-2 font-semibold">Included</th>
              <th className="px-4 py-2 font-semibold">Not Included</th>
              <th className="px-4 py-2 font-semibold">Faq</th>
              <th className="px-4 py-2 font-semibold">Short Label</th>
              <th className="px-4 py-2 font-semibold">Itinerary</th>
              <th className="px-4 py-2 font-semibold">Itinerary Description</th>
              <th className="px-4 py-2 font-semibold">Price</th>
              <th className="px-4 py-2 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((line, idx) => (
              <tr
                key={line.LineID}
                className={`border-b text-gray-800 ${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="px-4 py-2">
                  <input
                    type="checkbox"
                    checked={selectedLines.includes(line.LineID)}
                    onChange={(e) =>
                      handleCheckboxChange(line.LineID, e.target.checked)
                    }
                  />
                </td>
                <td className="px-4 py-2">{line.LineID}</td>
                <td className="px-4 py-2">{line.Name}</td>
                <td className="px-4 py-2">{line.TripLabel}</td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {line.Included}
                </td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {line.NotIncluded}
                </td>
                <td className="px-4 py-2 max-w-[200px] truncate">{line.Faq}</td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {line.ShortLabel}
                </td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {line.Itinerary}
                </td>
                <td className="px-4 py-2 max-w-[200px] truncate">
                  {line.ItineraryDescription}
                </td>
                <td className="px-4 py-2">{line.Price}€</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedLineForEdit(line)}
                    className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-center py-4 space-x-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Prev
        </button>
        <span>
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages, prev + 1))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300"
        >
          Next
        </button>
      </div>
      {selectedLineForEdit && (
        <EditLineModal
          line={selectedLineForEdit}
          onClose={() => setSelectedLineForEdit(null)}
          onUpdated={fetchLines} // or whatever function you use to refresh
        />
      )}
    </div>
  );
}
