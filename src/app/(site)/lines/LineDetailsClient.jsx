"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/ui/modal/SeaLineModal";
import { getAllTimeTables } from "@/services/timeTableService";
import TimeTableCard from "@/components/timetable_card/TimeTableCard";
import { timetableData } from "@/constants/timeTableData";

import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/react";
import { Label } from "@headlessui/react";
import { ChevronUpDownIcon, CheckIcon } from "@heroicons/react/20/solid";

export default function LineDetailsClient({ line }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [sunLineTable, setSunLineTable] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const lineName = (line?.Name || "").trim();

  useEffect(() => {
    async function fetchSunLine() {
      try {
        const data = await getAllTimeTables();
        const sunLine = data.find((t) => t.LineName === "Sun Line (Start from Saranda)");
        if (sunLine) {
          setSunLineTable({ ...sunLine, table: sunLine.rows });
        } else {
          const fallback = timetableData.find((t) => t.LineName === "Sun Line (Start from Saranda)");
          if (fallback) setSunLineTable(fallback);
        }
      } catch (error) {
        console.error("Failed to load Sun Line timetable:", error);
        const fallback = timetableData.find((t) => t.LineName === "Sun Line (Start from Saranda)");
        if (fallback) setSunLineTable(fallback);
      }
    }
    if (lineName === "Sun Line (Start from Saranda)") fetchSunLine();
  }, [lineName]);

  useEffect(() => {
    const timer = setTimeout(() => setShowPopup(true), 1800);
    return () => clearTimeout(timer);
  }, []);

  if (!line) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-2xl text-red-500">Line not found!</p>
      </div>
    );
  }

  const renderSection = (title, text, icon) => {
    const sentences = (text || "")
      .split(/\.\s*/)
      .map((s) => s.trim())
      .filter(Boolean);

    const iconColor =
      icon === "check" ? "text-emerald-500" :
      icon === "x" ? "text-red-400" : "text-[#00537E]";

    const iconSvg =
      icon === "check" ? (
        <svg className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </svg>
      ) : icon === "x" ? (
        <svg className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className={`w-4 h-4 mt-0.5 shrink-0 ${iconColor}`} fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
        </svg>
      );

    return (
      <div className="py-5">
        <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">{title}</h3>
        <ul className="space-y-2">
          {sentences.map((sentence, idx) => (
            <li key={idx} className="flex items-start gap-2.5 text-sm text-gray-700 leading-relaxed">
              {iconSvg}
              <span>{sentence.endsWith(".") ? sentence : sentence + "."}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const getImageIndices = (lineName) => {
    switch (lineName) {
      case "Culture Line": return [3, 4, 8];
      case "Sea Line": return [0, 1, 2];
      default: return [0, 1, 2];
    }
  };

  const selectedImageIndices = getImageIndices(lineName);

  const now = new Date();
  const scheduleOptions = (line.schedules || [])
    .map((schedule) => {
      const scheduleDateTime = new Date(schedule.StartDateTime);
      return { ...schedule, isPast: scheduleDateTime < now, dateObj: scheduleDateTime };
    })
    .sort((a, b) => {
      if (a.isPast !== b.isPast) return a.isPast ? 1 : -1;
      return a.dateObj - b.dateObj;
    });

  const handleBookingClick = () => {
    if (lineName === "Sun Line (Start from Saranda)" || lineName === "City Line") {
      window.open("https://wa.me/+355684667466", "_blank");
    }
  };

  const getEndDateFromLineName = (lineName, startDateTime) => {
    const end = new Date(startDateTime);
    if (lineName === "Culture Line") end.setHours(17, 30, 0, 0);
    else if (lineName === "Sea Line") end.setHours(16, 30, 0, 0);
    else end.setHours(17, 0, 0, 0);
    return end;
  };

  const endDate = selectedSchedule
    ? getEndDateFromLineName(lineName, selectedSchedule.StartDateTime)
    : new Date();

  const reservationUrl =
    "/reservation?" +
    new URLSearchParams({
      LineType: lineName,
      LineID: line.LineID.toString(),
      ScheduleID: selectedSchedule ? selectedSchedule.ScheduleID.toString() : "0",
      BookingDateTime: selectedSchedule ? selectedSchedule.StartDateTime : "",
      EndDateTime: selectedSchedule ? endDate.toISOString() : "",
    }).toString();

  const badge =
    lineName.includes("Culture") ? "Culture Tour" :
    lineName.includes("Sea") ? "Coastal Tour" :
    lineName.includes("Sun") ? "Shuttle" :
    lineName.includes("City") ? "City Line" : "Tour";

  return (
    <section className="relative isolate min-h-screen px-4 pt-6 sm:pt-32 pb-16 lg:px-8">

      {/* Background blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-[#F5A623] opacity-10 blur-3xl" />
        <div className="absolute top-1/2 -right-40 w-[400px] h-[400px] rounded-full bg-[#00537E] opacity-10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-[300px] h-[300px] rounded-full bg-[#FFDC91] opacity-20 blur-2xl" />
      </div>

      <div className="max-w-4xl mx-auto opacity-0 animate-fade-up">

        {/* Back link */}
        <Link href="/lines" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#00537E] transition-colors mb-6 group">
          <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          All Lines
        </Link>

        {/* Title block */}
        <div className="mb-8">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-[#F5A623] mb-3">{badge}</span>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
            {lineName === "Culture Line" && "Gjirokaster & Blue Eye Shuttle Tour"}
            {lineName === "Sea Line" && "Albanian Riviera Shuttle"}
            {lineName === "Sun Line (Start from Saranda)" && "Blue Eye Shuttle – Direct from Saranda"}
            {lineName === "City Line" && "City Line – Ksamil to Saranda Evening Shuttle"}
          </h1>
          <div className="mt-4 text-base text-gray-600 leading-relaxed max-w-2xl">
            <p className="italic text-gray-500 mb-2">{line.ShortDescription}</p>
            {lineName === "Culture Line" && (
              <p>This guided <strong>shuttle tour from Saranda</strong> visits <strong>Gjirokaster, Blue Eye</strong>, Lekuresi Castle, and Mesopotam Monastery — the best way to explore Albania's historic and natural highlights in a single day.</p>
            )}
            {lineName === "Sea Line" && (
              <p>Our <strong>Albanian Riviera shuttle</strong> connects Saranda to <strong>Porto Palermo Castle, Himare</strong>, and <strong>Borsh</strong>, offering a scenic beach experience along the Ionian coast.</p>
            )}
            {lineName === "Sun Line (Start from Saranda)" && (
              <p>The <strong>Blue Eye shuttle</strong> departs every 30 minutes from Saranda — a quick and affordable ride to one of Albania's most iconic natural springs.</p>
            )}
            {lineName === "City Line" && (
              <p>Hop on in Ksamil and enjoy <strong>Saranda's evening and night life</strong>. We depart at 19:45 and bring you back at 23:45 — sit back and let us handle the ride.</p>
            )}
          </div>
        </div>

        {/* Image gallery */}
        <div className="grid grid-cols-3 gap-3 mb-10">
          {line.Images && line.Images.length > 0
            ? selectedImageIndices.map((index, i) => {
                const img = line.Images[index];
                if (!img) return null;
                return (
                  <div key={index} className="relative w-full h-64 overflow-hidden rounded-xl">
                    <Image
                      src={`https://api.kmgshuttles.al/lines/uploads/${encodeURIComponent(img)}`}
                      alt={`${line.Name} - ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                );
              })
            : Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="relative w-full h-64">
                  <Image src="/default-line.jpg" alt={`Default ${index + 1}`} fill className="object-cover" />
                </div>
              ))}
        </div>

        {lineName === "Sun Line (Start from Saranda)" && sunLineTable && (
          <div className="mb-8">
            <TimeTableCard data={sunLineTable} readOnly />
          </div>
        )}

        {/* Info cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Price */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#F5A623]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#F5A623]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Price</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">Leke {line.Price}</p>
            </div>
          </div>

          {/* Start Location */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#00537E]/10 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 text-[#00537E]" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Start Location</p>
              <Link href={line.StartLocation} target="_blank" className="text-sm font-semibold text-[#00537E] hover:text-[#F5A623] transition-colors truncate block mt-0.5">
                View on Google Maps →
              </Link>
            </div>
          </div>
        </div>

        {/* Included / Not Included / FAQ */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm divide-y divide-gray-100 mb-6 px-6">
          {renderSection("What's Included", line.Included, "check")}
          {renderSection("Not Included", line.NotIncluded, "x")}
          {renderSection("FAQ", line.Faq, "info")}
        </div>

        {/* Itinerary block */}
        {lineName !== "Sun Line (Start from Saranda)" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6 space-y-5">

            {/* Itinerary */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Itinerary</h3>
              <div className="text-sm text-gray-700 font-mono leading-relaxed space-y-1 whitespace-pre-wrap">
                {line.Itinerary.replace(/STOP/g, "\nSTOP")
                  .replace(/::/g, ":")
                  .replace(/–/g, "-")
                  .replace(/(\d)(hour|hours|h)/gi, "$1 hour")
                  .replace(/(\d)(min|minutes)/gi, "$1 minutes")
                  .replace(/STOP/g, "\nSTOP")
                  .replace(/Trip/g, "\nTrip")
                  .replace(/Start/g, "\nStart")
                  .replace(/\. /g, ".\n")
                  .split("\n")
                  .filter(Boolean)
                  .map((sentence, index) => {
                    const trimmed = sentence.trim();
                    const splitTime = (text) => {
                      const match = text.match(/(.*?)([:\-]\s*(~{0,2}\s*\d+[\.\d]*\s*(hour|hours|h|minutes|min)))/i);
                      if (match) return { label: match[1].trim(), time: match[2].replace(/^[:\-]\s*/, "").trim() };
                      return { label: text, time: "" };
                    };
                    if (/^Start\s+/i.test(trimmed)) {
                      const match = trimmed.match(/^(Start\s+\w+)\s*[:\-]\s*(.+)$/i);
                      if (match) return <p key={index} className="mb-1"><strong>{match[1]}</strong>: {match[2]}</p>;
                    }
                    if (/^STOP\s+\d+/i.test(trimmed)) {
                      const { label, time } = splitTime(trimmed);
                      return <p key={index} className="mb-1"><strong>{label}</strong>{time && `: ${time}`}</p>;
                    }
                    if (/^Trip\s+/i.test(trimmed)) {
                      const { label, time } = splitTime(trimmed);
                      return <p key={index} className="mb-1"><strong>{label}</strong>{time && `: ${time}`}</p>;
                    }
                    const { label, time } = splitTime(trimmed);
                    return <p key={index} className="mb-1"><strong>{label}</strong>{time && `: ${time}`}</p>;
                  })}
              </div>
            </div>

            {/* Short Description */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Short Description</h3>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                {line.ShortDescription.split(/(?<=[.?!])\s+/).map((sentence, idx) => (
                  <p key={idx}>{sentence.trim()}</p>
                ))}
              </div>
            </div>

            {/* Itinerary Description */}
            <div className="border-t border-gray-100 pt-5">
              <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Itinerary Description</h3>
              <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
                {(() => {
                  let himareSeen = false;
                  return line.ItineraryDescription.split(/(?<=[.?!])\s+/).map((sentence, idx) => {
                    let html = sentence.replace(/\b([A-ZÇËÄÖÜ]{2,}(?:\s+[A-ZÇËÄÖÜ]{2,})*)\b/g, "<strong>$1</strong>");
                    if (!himareSeen) {
                      html = html.replace(/\bHimar[ëe]\b/i, (match) => { himareSeen = true; return `<strong>${match.toUpperCase()}</strong>`; });
                    }
                    return <p key={idx} className="mb-1" dangerouslySetInnerHTML={{ __html: html.trim() }} />;
                  });
                })()}
              </div>
            </div>
          </div>
        )}

        {/* Culture Line description */}
        {lineName === "Culture Line" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">Line Description</h3>
            <div className="space-y-3 text-sm text-gray-700 leading-relaxed">
              {line.Description.split(/(?<=[.?!])\s+/).map((sentence, idx) => (
                <p key={idx}>{sentence.trim()}</p>
              ))}
            </div>
          </div>
        )}

        {/* Schedule selector */}
        {lineName !== "Sun Line (Start from Saranda)" && lineName !== "City Line" && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-5 mb-6">
            <h2 className="text-base font-bold text-gray-900 mb-4">Select Your Schedule</h2>
            <Listbox value={selectedSchedule} onChange={setSelectedSchedule}>
              <Label className="block text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">
                Available Schedules
              </Label>
              <div className="relative">
                <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-xl bg-gray-50 border border-gray-200 py-3 pr-3 pl-4 text-left text-gray-900 focus:outline-2 focus:outline-[#00537E] sm:text-sm">
                  <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                    <span className="block truncate text-sm">
                      {selectedSchedule
                        ? (() => {
                            const startDate = new Date(selectedSchedule.StartDateTime);
                            const endDate = getEndDateFromLineName(line.Name, selectedSchedule.StartDateTime);
                            return `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
                          })()
                        : "Select a schedule"}
                    </span>
                  </span>
                  <ChevronUpDownIcon aria-hidden="true" className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4" />
                </ListboxButton>

                <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-xl bg-white py-1 text-base ring-1 ring-black/5 shadow-xl focus:outline-none sm:text-sm">
                  {scheduleOptions.map((schedule) => {
                    const startDate = new Date(schedule.StartDateTime);
                    const endDate = new Date(schedule.StartDateTime);
                    endDate.setHours(17, 0, 0, 0);
                    const formatted = `${startDate.toLocaleDateString()} ${startDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} – ${endDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
                    return (
                      <ListboxOption
                        key={schedule.ScheduleID}
                        value={schedule}
                        disabled={schedule.isPast}
                        className={`group relative select-none py-2.5 pl-4 pr-9 ${schedule.isPast ? "text-gray-400 cursor-not-allowed" : "text-gray-900 cursor-default"} data-focus:bg-[#00537E] data-focus:text-white`}
                      >
                        {({ selected, active }) => (
                          <>
                            <span className={`block truncate text-sm ${selected ? "font-semibold" : "font-normal"}`}>
                              {formatted}
                            </span>
                            {selected && (
                              <span className={`absolute inset-y-0 right-0 flex items-center pr-4 ${active ? "text-white" : "text-[#00537E]"}`}>
                                <CheckIcon className="size-5" />
                              </span>
                            )}
                          </>
                        )}
                      </ListboxOption>
                    );
                  })}
                </ListboxOptions>
              </div>
            </Listbox>
          </div>
        )}

        {/* BOOK button */}
        <div className="pb-10">
          {lineName === "Sun Line (Start from Saranda)" || lineName === "City Line" ? (
            <button
              onClick={handleBookingClick}
              className="w-full bg-[#00537E] hover:bg-[#F5A623] text-white font-bold rounded-2xl py-4 text-base shadow-lg hover:shadow-[#F5A623]/30 hover:shadow-xl transition-all duration-300"
            >
              Book via WhatsApp
            </button>
          ) : (
            <Link
              href={reservationUrl}
              className="block w-full bg-[#00537E] hover:bg-[#F5A623] text-white font-bold rounded-2xl py-4 text-base text-center shadow-lg hover:shadow-[#F5A623]/30 hover:shadow-xl transition-all duration-300"
            >
              Book Now
            </Link>
          )}
          {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
        </div>
      </div>

      {/* WhatsApp Booking Popup */}
      <div
        className={`fixed bottom-24 sm:bottom-6 right-6 z-50 transition-all duration-500 ease-out ${
          showPopup ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <div className="relative bg-[#25D366] text-white rounded-2xl shadow-2xl px-5 py-4 max-w-[260px] flex items-center gap-3 animate-bounce-slow">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-1.5 right-2.5 text-white/70 hover:text-white text-xs leading-none"
            aria-label="Close"
          >
            ✕
          </button>
          <span className="text-3xl flex-shrink-0">💬</span>
          <p className="font-semibold text-sm leading-snug pr-2">
            Book Now with only one WhatsApp message!
          </p>
        </div>
      </div>
    </section>
  );
}
