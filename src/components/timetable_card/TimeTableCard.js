import { useState } from "react";

const TimeTableCard = ({ data, onUpdate, readOnly = false }) => {
  const [isEditing, setIsEditing] = useState(!readOnly);
  const [draftRows, setDraftRows] = useState(data.table);

  const isSunLine = data.LineName === "Sun Line";
  let headers = Object.keys(draftRows[0] ?? {});

  // Remove SarandaStart and BlueEyeStart for non-Sun lines
  if (!isSunLine) {
    headers = headers.filter((h) => h !== "SarandaStart" && h !== "BlueEyeStart");
  }
  
  // Remove ID column in readOnly mode
  if (readOnly) {
    headers = headers.filter((h) => h !== "ID");
  }

  if (isSunLine) {
    headers = headers.filter((h) => h !== "Frequency" && h !== "StartTime" && h !== "EndTime")
  }

  // Handlers -------------------------------------------------------------
  const handleCellChange = (rowIdx, key, value) => {
    setDraftRows((prev) => {
      const copy = [...prev];
      copy[rowIdx] = { ...copy[rowIdx], [key]: value };
      return copy;
    });
  };

  const handleSave = () => {
    onUpdate(draftRows); // push changes up
    setIsEditing(false);
  };

  const handleAddRow = () => {
    const blank = {};
    headers.forEach((h) => (blank[h] = ""));
    setDraftRows((prev) => [...prev, blank]);
  };

  // ---------------------------------------------------------------------
  return (
    <section className="mb-12">
      {/* <h2 className="text-2xl font-semibold text-sky-800 mb-1">{data.line}</h2>
      <p className="italic text-sm mb-4 text-gray-600">{data.route}</p> */}

      <div className="border rounded-lg shadow-sm p-6">
        <h3 className="text-center font-bold text-sky-800 mb-4">
          UP TO DATE TIMETABLE
        </h3>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 text-sm">
            <thead className="bg-gray-100">
              <tr>
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-4 py-2 font-semibold text-gray-700 whitespace-nowrap"
                  >
                    {h.replace(/([a-z])([A-Z])/g, "$1 $2")}{" "}
                    {/* Turns SarandaStart → Saranda Start */}
                  </th>
                ))}

                {isEditing && <th className="px-4 py-2" />}
              </tr>
            </thead>
            <tbody>
              {draftRows.map((row, rowIdx) => (
                <tr key={rowIdx} className="text-center border-b last:border-0">
                  {headers.map((key) => (
                    <td key={key} className="px-4 py-2 whitespace-nowrap">
                      {isEditing ? (
                        <input
                          type="text"
                          value={row[key] ?? ""}
                          onChange={(e) =>
                            handleCellChange(rowIdx, key, e.target.value)
                          }
                          className="border rounded px-2 py-1 w-24 text-center"
                        />
                      ) : (
                        row[key] || "-"
                      )}
                    </td>
                  ))}
                  {isEditing && (
                    <td className="px-2 py-2">
                      <button
                        className="text-red-500 text-xs hover:underline"
                        onClick={() =>
                          setDraftRows((prev) =>
                            prev.filter((_, i) => i !== rowIdx)
                          )
                        }
                      >
                        Delete
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!readOnly &&
          (isEditing ? (
            <div className="flex gap-2 mt-4 justify-end">
              <button
                onClick={handleAddRow}
                className="px-3 py-1 bg-gray-200 rounded text-sm"
              >
                + Row
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-1 rounded bg-gray-300 hover:bg-gray-400 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1 rounded bg-emerald-600 hover:bg-emerald-700 text-white text-sm"
              >
                Save
              </button>
            </div>
          ) : (
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-1 rounded bg-sky-600 hover:bg-sky-700 text-white text-sm"
              >
                Edit
              </button>
            </div>
          ))}
      </div>
    </section>
  );
};

export default TimeTableCard;
