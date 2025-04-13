// reservation/page.js
import { Suspense } from "react";
import BookingForm from "@/components/booking_form/BookingForm";

export default function Page() {
  return (
    <main className="pt-0 bg-orange-50 min-h-screen animate-fade-up">
      <Suspense fallback={<div>Loading booking form...</div>}>
        <BookingForm />
      </Suspense>
    </main>
  );
}
