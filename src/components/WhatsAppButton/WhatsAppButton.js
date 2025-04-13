"use client";

import Link from "next/link";

// WhatsApp brand icon (from FontAwesome)
const WhatsAppIcon = () => (
  <svg
    aria-hidden="true"
    focusable="false"
    data-prefix="fab"
    data-icon="whatsapp"
    className="w-6 h-6"
    role="img"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      fill="currentColor"
      d="M380.9 97.1C339 55.2 285.2 32 228.2 32 102.5 32 0 134.5 
         0 260.2c0 45.4 11.8 89.4 34.3 128L0 480l93.5-33.3c37.9 
         20.8 81 31.8 125.2 31.8h.1c125.7 0 228.2-102.5 
         228.2-228.2 0-57-22.1-110.8-63.1-151.7zm-165.1 
         338c-37.4 0-73.7-10.1-105.5-29.1l-7.6-4.5-55.4 
         19.7 18.6-57.2-4.9-7.8c-21.8-34-33.3-73.3-33.3-113.8 
         0-114.7 93.4-208 208.4-208 55.6 0 107.8 21.6 147.1 
         61 39.4 39.3 61.1 91.5 61.1 147.2-.1 114.7-93.5 
         208.3-208.5 208.3zm115.6-151.1c-6.3-3.2-37.3-18.4-43-20.5-5.8-2.1-10-3.2-14.2 
         3.2-4.2 6.3-16.3 20.5-20 24.7-3.7 4.2-7.4 4.8-13.7 
         1.6-6.3-3.2-26.5-9.7-50.4-31-18.7-16.7-31.4-37.3-35.1-43.6-3.7-6.3-.4-9.7 
         2.8-12.9 3.2-3.2 6.3-8.4 9.5-12.6 3.2-4.2 4.2-7.4 
         6.3-12.6 2.1-5.3 1.1-9.5-.5-12.6-1.6-3.2-14.2-34-19.4-46.5-5.2-12.6-10.5-10.9-14.2-11 
         -3.7-.2-7.9-.2-12.1-.2s-12.6 1.6-19.2 9.5c-6.3 7.9-24.7 24.2-24.7 59s25.3 68.4 
         28.9 73.1c3.7 4.2 49.5 75.5 119.8 105.9 70.3 30.4 70.3 
         20.3 83 19.1 12.6-1.1 37.3-15.2 42.6-29.8 5.3-14.7 
         5.3-27.3 3.7-29.8-1.6-2.6-5.8-4.2-12.1-7.4z"
    />
  </svg>
);

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-4 left-4 z-50">
      <Link
        href="https://wa.me/+355684667466"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 
                   hover:bg-green-600 text-white shadow-lg transition-colors"
      >
        <WhatsAppIcon />
      </Link>
    </div>
  );
}
