import { Geist, Geist_Mono } from "next/font/google";
import { CustomNavBar } from "@/components/navbar/NavBar";
import Footer from "@/components/footer/Footer";
import WhatsAppButton from "@/components/WhatsAppButton/WhatsAppButton";
import { Toaster } from "react-hot-toast";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Hop on Hop off shuttle",
  description: "Online travel website",
  icons: {
    icon: '/favicon.ico'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />

        <CustomNavBar />
        {/* Main Content */}
        <main className="flex-grow">{children}</main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
