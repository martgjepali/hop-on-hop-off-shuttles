"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const { logout } = useAuth();

  // Toggles the sidebar open/close
  const handleToggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Closes the sidebar (used on link clicks or X button)
  const handleCloseSidebar = () => {
    setIsOpen(false);
  };

  const handleSignOut = () => {
    logout(); // 👈 clears token from context and cookie
    handleCloseSidebar(); // 👈 your custom sidebar logic
    router.push("/admin/sign-in"); // 👈 redirect
  };

  return (
    <>
      {/* Hamburger Button (visible on small screens) */}
      <button
        onClick={handleToggleSidebar}
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 
                   rounded-lg hover:bg-gray-100 focus:outline-none 
                   focus:ring-2 focus:ring-gray-200 dark:text-gray-400 
                   dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform 
          bg-gray-50 dark:bg-gray-800 
          ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
        aria-label="Sidebar"
      >
        <div className="relative h-full px-3 py-4 overflow-y-auto">
          {/* Close (X) Button - visible on mobile */}
          <button
            onClick={handleCloseSidebar}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 
                       dark:text-gray-400 dark:hover:text-gray-200 
                       focus:outline-none"
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          <ul className="space-y-2 font-medium mt-8">
            {/* Example Link */}
            <li>
              <Link
                href="/admin/add-line"
                onClick={handleCloseSidebar} // Closes sidebar on click
                className="flex items-center p-2 text-gray-900 rounded-lg 
                           dark:text-white hover:bg-gray-100 
                           dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 
                             dark:text-gray-400 group-hover:text-gray-900 
                             dark:group-hover:text-white"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Add Line</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/timetable"
                onClick={handleCloseSidebar} // Closes sidebar on click
                className="flex items-center p-2 text-gray-900 rounded-lg 
                           dark:text-white hover:bg-gray-100 
                           dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 
                             dark:text-gray-400 group-hover:text-gray-900 
                             dark:group-hover:text-white"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Time Table</span>
              </Link>
            </li>

             <li>
              <Link
                href="/admin/manage-schedules"
                onClick={handleCloseSidebar} // Closes sidebar on click
                className="flex items-center p-2 text-gray-900 rounded-lg 
                           dark:text-white hover:bg-gray-100 
                           dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 
                             dark:text-gray-400 group-hover:text-gray-900 
                             dark:group-hover:text-white"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Schedule Management</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin/manage-lines"
                onClick={handleCloseSidebar} // Closes sidebar on click
                className="flex items-center p-2 text-gray-900 rounded-lg 
                           dark:text-white hover:bg-gray-100 
                           dark:hover:bg-gray-700 group"
              >
                <svg
                  className="w-5 h-5 text-gray-500 transition duration-75 
                             dark:text-gray-400 group-hover:text-gray-900 
                             dark:group-hover:text-white"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Manage Lines</span>
              </Link>
            </li>

            <li>
              <Link
                href="/admin"
                onClick={handleCloseSidebar}
                className="flex items-center p-2 text-gray-900 rounded-lg 
                           dark:text-white hover:bg-gray-100 
                           dark:hover:bg-gray-700 group"
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 
                             dark:text-gray-400 group-hover:text-gray-900 
                             dark:group-hover:text-white"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Booking Requests
                </span>
                <span
                  className="inline-flex items-center justify-center px-2 ms-3 
                                 text-sm font-medium text-gray-800 bg-gray-100 
                                 rounded-full dark:bg-gray-700 dark:text-gray-300"
                >
                  Pro
                </span>
              </Link>
            </li>

            <li>
              <button
                onClick={handleSignOut}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <svg
                  className="shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                  />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
