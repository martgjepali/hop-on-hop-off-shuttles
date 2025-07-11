// src/services/lineService.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("BASE_URL:", BASE_URL);

/**
 * Creates a new line using the FastAPI endpoint.
 *
 * @param {Object} formData - The data for the new line.
 * @returns {Promise<Object>} - The newly created line object.
 * @throws {Error} - If the creation fails.
 */
export async function createLine(formData) {
  const response = await fetch(`${BASE_URL}/lines/`, {
    method: "POST",
    body: formData, // ✅ Let the browser handle headers
  });

  if (!response.ok) {
    throw new Error("Failed to create line");
  }
  return await response.json();
}

/**
 * Creates one or more line schedules for a given line.
 *
 * @param {string|number} lineId - The ID of the line to schedule.
 * @param {Array<Object>} schedules - An array of schedule objects to create.
 * @returns {Promise<Array>} - A list of created schedule objects.
 * @throws {Error} - If the creation fails.
 */
export async function createLineSchedule(lineId, schedules) {
  const response = await fetch(`${BASE_URL}/lines/${lineId}/schedules/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(schedules),
  });
  if (!response.ok) {
    throw new Error(`Failed to create schedules for line ${lineId}`);
  }
  return await response.json();
}

/**
 * Fetches all line schedules from the FastAPI backend.
 *
 * @returns {Promise<Array>} - A list of line objects.
 * @throws {Error} - If the fetch fails.
 */
export async function getSchedules() {
  const response = await fetch(`${BASE_URL}/lines/schedules/`);
  if (!response.ok) {
    throw new Error("Failed to fetch schedules");
  }
  return await response.json();
}

/**
 * Updates a line schedule.
 *
 * @param {number} scheduleId - The schedule ID to update.
 * @param {Object} scheduleData - The updated schedule data.
 * @returns {Promise<Object>} - The updated schedule object.
 * @throws {Error} - If the update fails.
 */
export async function updateLineSchedule(scheduleId, scheduleData) {
  const response = await fetch(`${BASE_URL}/lines/schedules/${scheduleId}/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(scheduleData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to update schedule");
  }

  return await response.json();
}

/**
 * Deletes multiple line schedules.
 *
 * @param {Array<number>} scheduleIds - An array of schedule IDs to delete.
 * @returns {Promise<Object>} - Deletion result.
 * @throws {Error} - If the deletion fails.
 */
export async function deleteLineSchedules(scheduleIds) {
  const response = await fetch(`${BASE_URL}/lines/schedules/`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ schedule_ids: scheduleIds }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete schedules");
  }

  return await response.json();
}

/**
 * Fetches all lines from the FastAPI backend.
 *
 * @returns {Promise<Array>} - A list of line objects.
 * @throws {Error} - If the fetch fails.
 */
export async function getLines() {
  const response = await fetch(`${BASE_URL}/lines/`);
  if (!response.ok) {
    throw new Error("Failed to fetch lines");
  }
  return await response.json();
}

/**
 * Fetches a single line by ID from the FastAPI backend.
 *
 * @param {string|number} lineId - The ID of the line to retrieve.
 * @returns {Promise<Object>} - The line object with its associated schedules.
 * @throws {Error} - If the fetch fails.
 */
export async function getLineById(lineId) {
  const response = await fetch(`${BASE_URL}/lines/${lineId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch line with ID ${lineId}`);
  }
  return await response.json();
}

/**
 * Update a line using the FastAPI endpoint.
 *
 * @param {string|number} lineId - The ID of the line to retrieve.
 * @returns {Promise<Object>} - The newly updated line object.
 * @throws {Error} - If the creation fails.
 */
export async function updateLine(lineId, formData) {
  const response = await fetch(`${BASE_URL}/lines/${lineId}`, {
    method: "PUT",
    body: formData, // ✅ Let the browser handle headers
  });

  if (!response.ok) {
    throw new Error("Failed to create line");
  }
  return await response.json();
}

/**
 * Deletes multiple lines.
 *
 * @param {Array<number>} linesIds - An array of line IDs to delete.
 * @returns {Promise<Object>} - An object containing details about the deletion (for example, the number of lines deleted).
 * @throws {Error} - If the deletion fails.
 */
export async function deleteLines(linesIds) {
  const response = await fetch(`${BASE_URL}/lines`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ lines_ids: linesIds }),
  });

  if (!response.ok) {
    // Attempt to read error details from the response body
    const errorData = await response.json();
    throw new Error(errorData.detail || "Failed to delete bookings");
  }

  return await response.json();
}
