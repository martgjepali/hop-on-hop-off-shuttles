import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact KMG Shuttles – Reach Our Team",
  description: "Have questions about your trip? Contact KMG Shuttles directly for assistance, support, or group bookings.",
  robots: { index: true, follow: true },
};

export default function ContactPage() {
  return (
    <main>
      <ContactClient />
    </main>
  );
}
