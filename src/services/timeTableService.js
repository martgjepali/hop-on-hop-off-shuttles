const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetch all timetables from the FastAPI backend.
 *
 * @returns {Promise<Array>} - A list of timetable objects.
 * @throws {Error} - If the fetch fails.
 */
export async function getAllTimeTables() {
  const response = await fetch(`${BASE_URL}/timetable/`);
  if (!response.ok) {
    throw new Error("Failed to fetch all timetables");
  }
  return await response.json();
}

/**
 * Fetch a single timetable by ID.
 *
 * @param {string|number} id - The ID of the timetable to retrieve.
 * @returns {Promise<Object>} - The timetable object.
 * @throws {Error} - If the fetch fails.
 */
export async function getTimeTableById(id) {
  const response = await fetch(`${BASE_URL}/timetable/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch timetable with ID ${id}`);
  }
  return await response.json();
}

/**
 * Update a timetable by ID.
 *
 * @param {string|number} id - The ID of the timetable to update.
 * @param {Object} data - The new timetable data (must match the schema).
 * @returns {Promise<Object>} - The updated timetable object.
 * @throws {Error} - If the update fails.
 */
export async function updateTimeTable(id, data) {
  const response = await fetch(`${BASE_URL}/timetable/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update timetable with ID ${id}`);
  }
  return await response.json();
}
