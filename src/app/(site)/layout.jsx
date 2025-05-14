import { Geist, Geist_Mono } from "next/font/google";
import { CustomNavBar } from "@/components/ui/navbar/NavBar";
import Footer from "@/components/ui/footer/Footer";
import WhatsAppButton from "@/components/ui/WhatsAppButton/WhatsAppButton";
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
  title: {
    default: "KMG Shuttles – Hop-On Hop-Off Tours in Saranda",
    template: "%s | KMG Shuttles",
  },
  description:
    "Explore Saranda’s hidden gems with KMG's flexible hop-on hop-off shuttle tours. Comfortable, affordable, and unforgettable travel experiences in Albania.",
  keywords: [
    "KMG shuttles",
    "Hop-on hop-off Saranda",
    "Albania travel",
    "Saranda sightseeing",
    "budget tours Albania",
  ],
  metadataBase: new URL("https://kmgshuttles.al"),
  openGraph: {
    title: "KMG Shuttles – Hop-On Hop-Off Saranda",
    description:
      "Flexible and affordable sightseeing tours through Saranda with KMG Shuttles. Explore Albania like never before.",
    url: "https://kmgshuttles.al",
    siteName: "KMG Shuttles",
    images: [
      {
        url: "/images/fleet4.jpeg",
        width: 1200,
        height: 630,
        alt: "KMG Shuttle Fleet",
      },
    ],
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        <Toaster position="top-center" toastOptions={{ duration: 5000 }} />

        <CustomNavBar />
        {/* Main Content */}
        <main className="flex-grow pt-16 sm:pt-20 px-4 sm:px-6">
          {children}
        </main>
        <WhatsAppButton />
        <Footer />
      </body>
    </html>
  );
}
