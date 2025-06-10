    'use client';
import React, { useState } from 'react';
import ScheduleTabs from '@/components/ui/schedule_tabs/ScheduleTabs';
import ScheduleTable from '@/components/ui/schedule_table/ScheduleTable';

export default function schedulesPage() {
  const [selectedLineId, setSelectedLineId] = useState(3); // Default to LineID 3

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Schedule Management</h1>

      <ScheduleTabs
        selectedLineId={selectedLineId}
        onSelectLineId={setSelectedLineId}
      />

      <ScheduleTable lineId={selectedLineId} />
    </div>
  );
}
