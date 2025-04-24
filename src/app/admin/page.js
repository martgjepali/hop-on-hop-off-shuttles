"use client";

import { useEffect, useState } from "react";
import Table from "@/components/table/Table";
import BookingTabs from "@/components/booking_tabs/BookingTabs";
import AuthGuard from "@/components/auth/AuthGuard";
import { getAllBookings, updateBookingStatus } from "@/services/bookingService";

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const data = await getAllBookings();
        setBookings(data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    }
    fetchBookings();
  }, []);

  const handleAccept = async (bookingId) => {
    try {
      const updatedBooking = await updateBookingStatus(bookingId, "approved");
      // Update local state so the UI reflects the new status
      setBookings((prev) =>
        prev.map((b) =>
          b.BookingID === bookingId ? { ...b, ...updatedBooking } : b
        )
      );
    } catch (error) {
      console.error("Error accepting booking:", error);
    }
  };

  // Handle Decline: update status on the server, then update local state
  const handleDecline = async (bookingId) => {
    try {
      const updatedBooking = await updateBookingStatus(bookingId, "declined");
      // Update local state so the UI reflects the new status
      setBookings((prev) =>
        prev.map((b) =>
          b.BookingID === bookingId ? { ...b, ...updatedBooking } : b
        )
      );
    } catch (error) {
      console.error("Error declining booking:", error);
    }
  };

  const seaLineBookings = bookings.filter((booking) =>
    booking.LineType.toLowerCase().includes("sea")
  );
  const cultureLineBookings = bookings.filter((booking) =>
    booking.LineType.toLowerCase().includes("culture")
  );

  const handleBookingsDeleted = (deletedIds) => {
    setBookings((prev) =>
      prev.filter((booking) => !deletedIds.includes(booking.BookingID))
    );
  };

  return (
    <AuthGuard>
      <div className="p-4 sm:ml-64">
        <h1 className="text-2xl font-bold mb-4">Booking Requests</h1>
        <BookingTabs
          seaLineTable={
            <Table
              data={seaLineBookings}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onBookingsDeleted={handleBookingsDeleted}
            />
          }
          cultureLineTable={
            <Table
              data={cultureLineBookings}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onBookingsDeleted={handleBookingsDeleted}
            />
          }
        />
      </div>
    </AuthGuard>
  );
}
