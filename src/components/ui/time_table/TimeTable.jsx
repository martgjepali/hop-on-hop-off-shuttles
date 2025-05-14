export default function TimeTable({ timetable }) {
  if (!timetable || timetable.length === 0) return null;

  const headers = Object.keys(timetable[0]);

  return (
    <div className="mt-10 border border-gray-300 rounded-lg shadow p-6 bg-white">
      <h3 className="text-2xl font-semibold text-center text-[#00537E] mb-4">
        UP TO DATE TIMETABLE
      </h3>
      <div className="overflow-x-auto mb-6">
        <table className="min-w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="border border-gray-300 px-4 py-2 capitalize"
                >
                  {header.replace(/([A-Z])/g, " $1").trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((row, idx) => (
              <tr key={idx}>
                {headers.map((header) => (
                  <td key={header} className="border border-gray-300 px-4 py-2">
                    {row[header] || "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
