"use client";

import { usePathname } from "next/navigation";
import AdminSidebar from "@/components/ui/sidebar/Sidebar";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/context/AuthContext";
import AuthGuard from "@/components/auth/AuthGuard";

import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const isSignInPage = pathname.includes("/sign-in"); 

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col`}
      >
        <AuthProvider>
          {!isSignInPage && <AdminSidebar />}
          
          {/* ✅ Wrap AuthGuard around all protected routes */}
          <main className="flex-grow">
            {isSignInPage ? children : <AuthGuard>{children}</AuthGuard>}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
