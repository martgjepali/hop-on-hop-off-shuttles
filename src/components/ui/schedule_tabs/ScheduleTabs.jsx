'use client';
import React, { useState } from 'react';

export default function ScheduleTabs({ selectedLineId, onSelectLineId }) {
  const tabs = [
    { id: 3, label: 'Line 3 Schedules' },
    { id: 4, label: 'Line 4 Schedules' },
    // You can add more LineIDs here if needed
  ];

  return (
    <div className="border-b border-gray-200 mb-4">
      <nav className="flex space-x-8" aria-label="Tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelectLineId(tab.id)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
              selectedLineId === tab.id
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
