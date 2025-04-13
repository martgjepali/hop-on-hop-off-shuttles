// components/BookingTabs.js
import { useState } from "react";

const BookingTabs = ({ seaLineTable, cultureLineTable }) => {
  // "sea" or "culture"
  const [activeTab, setActiveTab] = useState("sea");

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="flex space-x-4">
          <button
            onClick={() => setActiveTab("sea")}
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === "sea"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:border-gray-300"
            }`}
          >
            Sea Line Bookings
          </button>
          <button
            onClick={() => setActiveTab("culture")}
            className={`py-2 px-4 text-sm font-medium border-b-2 ${
              activeTab === "culture"
                ? "text-blue-600 border-blue-600"
                : "text-gray-500 border-transparent hover:border-gray-300"
            }`}
          >
            Culture Line Bookings
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "sea" && (
          <div>
            {seaLineTable}
          </div>
        )}
        {activeTab === "culture" && (
          <div>
            {cultureLineTable}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingTabs;
