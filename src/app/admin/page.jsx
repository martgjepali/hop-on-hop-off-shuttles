"use client";

import { useEffect, useState } from "react";
import Table from "@/components/ui/table/Table";
import BookingTabs from "@/components/ui/booking_tabs/BookingTabs";
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

  const seaLineBookings = bookings.filter((booking) => {
    const lt = booking.LineType.toLowerCase();
    return lt.includes("sea") && lt.includes("saranda");
  });
  const cultureLineBookings = bookings.filter((booking) => {
    const lt = booking.LineType.toLowerCase();
    return lt.includes("culture") && lt.includes("saranda");
  });
  const ksamilSeaLineBookings = bookings.filter((booking) => {
    const lt = booking.LineType.toLowerCase();
    return lt.includes("sea") && lt.includes("ksamil");
  });
  const ksamilCultureLineBookings = bookings.filter((booking) => {
    const lt = booking.LineType.toLowerCase();
    return lt.includes("culture") && lt.includes("ksamil");
  });

  const handleBookingsDeleted = (deletedIds) => {
    setBookings((prev) =>
      prev.filter((booking) => !deletedIds.includes(booking.BookingID))
    );
  };

  return (
    <AuthGuard>
      <div className="w-full max-w-[1600px] mx-auto px-4">
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
          ksamilSeaLineTable={
            <Table
              data={ksamilSeaLineBookings}
              onAccept={handleAccept}
              onDecline={handleDecline}
              onBookingsDeleted={handleBookingsDeleted}
            />
          }
          ksamilCultureLineTable={
            <Table
              data={ksamilCultureLineBookings}
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
