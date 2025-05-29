"use client";

import {
  Home,
  Car,
  Contact,
  Binoculars,
  Timer,
  Beer,
} from "lucide-react";
import { NavBar as TubelightNavBar } from "@/components/ui/tubelight-navbar";

export function CustomNavBar() {
  const navItems = [
    { name: "Home", url: "/", icon: Home },
    { name: "Lines", url: "/lines", icon: Binoculars },
    { name: "Fleet", url: "/fleet", icon: Car },
    { name: "Schedules", url: "/time_table", icon: Timer },
    { name: "Contact", url: "/contact", icon: Contact },
    { name: "AMF-PUB", url: "/menu", icon: Beer },
  ];

  return (
  <div
      className="fixed bottom-0 sm:top-0 left-0 right-0 z-50 mb-2 sm:mb-2 sm:pt-2 pointer-events-none h-[70px]"
    >
      <div className="pointer-events-auto mx-auto max-w-sm w-full px-2">
        <TubelightNavBar items={navItems} />
      </div>
    </div>
  );
}
