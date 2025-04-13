const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Fetches booking data by ID from the FastAPI backend.
 *
 * @param {string|number} bookingId - The ID of the booking to retrieve.
 * @returns {Promise<Object>} - The booking data.
 * @throws {Error} - If the fetch fails.
 */
export async function getBookingById(bookingId) {
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch booking with ID ${bookingId}`);
  }
  return await response.json();
}

/**
 * Fetches all bookings from the FastAPI backend.
 *
 * @returns {Promise<Array>} - A list of booking data objects.
 * @throws {Error} - If the fetch fails.
 */
export async function getAllBookings() {
    const response = await fetch(`${BASE_URL}/bookings/`);
    if (!response.ok) {
      throw new Error('Failed to fetch all bookings');
    }
    return await response.json();
  }

/**
 * Updates the booking status for a given booking ID.
 *
 * @param {string|number} bookingId - The ID of the booking to update.
 * @param {string} newStatus - The new status to apply to the booking.
 * @returns {Promise<Object>} - The updated booking data.
 * @throws {Error} - If the update fails.
 */
export async function updateBookingStatus(bookingId, newStatus) {
  const response = await fetch(`${BASE_URL}/bookings/${bookingId}/status?new_status=${encodeURIComponent(newStatus)}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    }
    // No body is needed if the parameter is in the query string.
  });
  if (!response.ok) {
    throw new Error(`Failed to update booking status for booking ${bookingId}`);
  }
  return await response.json();
}


/**
 * Creates a new booking.
 *
 * @param {Object} bookingData - The booking data to create.
 * @returns {Promise<Object>} - The newly created booking data.
 * @throws {Error} - If the creation fails.
 */
export async function createBooking(bookingData) {
    const response = await fetch(`${BASE_URL}/bookings/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookingData)
    });
    if (!response.ok) {
      throw new Error('Failed to create booking');
    }
    return await response.json();
  }

/**
 * Deletes multiple bookings.
 *
 * @param {Array<number>} bookingIds - An array of booking IDs to delete.
 * @returns {Promise<Object>} - An object containing details about the deletion (for example, the number of bookings deleted).
 * @throws {Error} - If the deletion fails.
 */
export async function deleteBookings(bookingIds) {
  const response = await fetch(`${BASE_URL}/bookings`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ booking_ids: bookingIds })
  });

  if (!response.ok) {
    // Attempt to read error details from the response body
    const errorData = await response.json();
    throw new Error(errorData.detail || 'Failed to delete bookings');
  }

  return await response.json();
}
