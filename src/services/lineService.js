// src/services/lineService.js

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;
console.log("BASE_URL:", BASE_URL);


/**
 * Creates a new line using the FastAPI endpoint.
 *
 * @param {Object} lineData - The data for the new line.
 * @returns {Promise<Object>} - The newly created line object.
 * @throws {Error} - If the creation fails.
 */
export async function createLine(lineData) {
  const response = await fetch(`${BASE_URL}/lines/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lineData),
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
