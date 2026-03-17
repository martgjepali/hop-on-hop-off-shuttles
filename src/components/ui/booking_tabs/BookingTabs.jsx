// components/BookingTabs.js
import { useState } from "react";

const BookingTabs = ({ seaLineTable, cultureLineTable, ksamilSeaLineTable, ksamilCultureLineTable }) => {
  const [activeTab, setActiveTab] = useState("sea");

  const tabs = [
    { key: "sea", label: "Saranda Sea Line Bookings" },
    { key: "culture", label: "Saranda Culture Line Bookings" },
    { key: "ksamil-sea", label: "Ksamil Sea Line Bookings" },
    { key: "ksamil-culture", label: "Ksamil Culture Line Bookings" },
  ];

  return (
    <div className="p-4">
      {/* Tab Navigation */}
      <div className="mb-4 border-b border-gray-200">
        <nav className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-4 text-sm font-medium border-b-2 ${
                activeTab === tab.key
                  ? "text-blue-600 border-blue-600"
                  : "text-gray-500 border-transparent hover:border-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="mt-4">
        {activeTab === "sea" && <div>{seaLineTable}</div>}
        {activeTab === "culture" && <div>{cultureLineTable}</div>}
        {activeTab === "ksamil-sea" && <div>{ksamilSeaLineTable}</div>}
        {activeTab === "ksamil-culture" && <div>{ksamilCultureLineTable}</div>}
      </div>
    </div>
  );
};

export default BookingTabs;
