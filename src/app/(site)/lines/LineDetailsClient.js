"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Modal from "@/components/modal/SeaLineModal";
import useMediaQuery from "@/app/hooks/useMediaQuery";

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
  const isMobile = useMediaQuery("(max-width: 640px)");
  const imageCount = 3;

  if (!line) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-orange-50">
        <p className="text-2xl text-red-500">Line not found!</p>
      </div>
    );
  }

  const renderSection = (title, text) => {
    const sentences = text
      .split(/\.\s*/)
      .map((s) => s.trim())
      .filter(Boolean);

    return (
      <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
        <dt className="text-sm font-medium text-gray-900">{title}</dt>
        <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
          <ul className="space-y-2">
            {sentences.map((sentence, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="mt-1 text-black">❖</span>
                <span>
                  {sentence.endsWith(".") ? sentence : sentence + "."}
                </span>
              </li>
            ))}
          </ul>
        </dd>
      </div>
    );
  };

  const getImageIndices = (lineName) => {
    switch (lineName) {
      case "Culture Line":
        return [3, 4, 1];
      case "Sea Line":
        return [5, 4, 3];
      default:
        return [0, 1, 2]; // fallback if name doesn't match
    }
  };

  const selectedImageIndices = getImageIndices(line.Name);

  const scheduleOptions = line.schedules.sort(
    (a, b) => new Date(a.StartDateTime) - new Date(b.StartDateTime)
  );

  const handleBookingClick = () => {
    if (line.Name === "Sun Line") {
      setIsModalOpen(true);
    }
  };

  const reservationUrl =
    "/reservation?" +
    new URLSearchParams({
      LineType: line.Name,
      LineID: line.LineID.toString(),
      ScheduleID: selectedSchedule
        ? selectedSchedule.ScheduleID.toString()
        : "0",
      BookingDateTime: selectedSchedule ? selectedSchedule.StartDateTime : "",
    }).toString();

  return (
    <section className="relative isolate min-h-screen px-6 pt-5 sm:pt-35 lg:px-8">
      <div
        className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
        aria-hidden="true"
      >
        <div
          className="relative left-1/2 top-[-10%] w-[40rem] sm:w-[60rem] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F5A623] to-[#FFDC91] opacity-40"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-up">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#F5A623]">
            {line.Name} Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {line.Images && line.Images.length > 0
            ? selectedImageIndices.map((index) => {
                const img = line.Images[index];
                if (!img) return null; // skip if index is out of bounds
                return (
                  <div key={index} className="relative w-full h-64">
                    <Image
                      src={`https://api.kmgshuttles.al/lines/uploads/${encodeURIComponent(
                        img
                      )}`}
                      alt={`${line.Name} - ${index + 1}`}
                      fill
                      className="object-cover rounded-lg shadow-md"
                    />
                  </div>
                );
              })
            : Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="relative w-full h-64">
                  <Image
                    src="/default-line.jpg"
                    alt={`Default ${index + 1}`}
                    fill
                    className="object-cover rounded-lg shadow-md"
                  />
                </div>
              ))}
        </div>

        <div className="border-t border-gray-300">
          <dl className="divide-y divide-gray-300">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Price</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0">
                Leke {line.Price}
              </dd>
            </div>

            {renderSection("Included", line.Included)}
            {renderSection("Not Included", line.NotIncluded)}
            {renderSection("FAQ", line.Faq)}

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">Total Trip</dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 font-mono leading-relaxed space-y-2 whitespace-pre-wrap">
                {line.TotalTrip.replace(/8h/, "8h")
                  .replace(/STOP/g, "\nSTOP")
                  .replace(/Trip/g, "\nTrip")
                  .replace(/Start/g, "\nStart")
                  .replace(/\. /g, ".\n")
                  .replace(/(?=ALBANIAN RIVIERA:)/, "\n") // 👈 Insert newline before ALBANIAN RIVIERA:
                  .split("\n")
                  .map((sentence, index) => {
                    const bolded = sentence.replace(
                      /\b([A-ZÇËÄÖÜ]{2,}(?:\s+[A-ZÇËÄÖÜ]{2,})*)\b/g,
                      "<strong>$1</strong>"
                    );

                    return (
                      <p
                        key={index}
                        dangerouslySetInnerHTML={{ __html: bolded.trim() }}
                        className="mb-1"
                      />
                    );
                  })}
              </dd>
            </div>

            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium text-gray-900">
                Line Description
              </dt>
              <dd className="mt-1 text-sm text-gray-700 sm:col-span-2 sm:mt-0 leading-relaxed">
                <div className="space-y-4">
                  {line.Description.split(/(?<=[.?!])\s+/).map(
                    (sentence, idx) => (
                      <p key={idx}>{sentence.trim()}</p>
                    )
                  )}
                </div>
              </dd>
            </div>

            {line.Name === "Sun Line" ? (
              <div className="mt-10 border border-gray-300 rounded-lg shadow p-6 bg-white">
                <h3 className="text-2xl font-semibold text-center text-[#00537E] mb-4">
                  UP TO DATE TIMETABLE
                </h3>
                <div className="overflow-x-auto mb-6">
                  <table className="min-w-full border border-gray-300 text-center">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">
                          Saranda Start
                        </th>
                        <th className="border border-gray-300 px-4 py-2">
                          Blue Eye Start
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          09:30
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          10:00
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          11:00
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          12:00
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          13:00
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          14:00
                        </td>
                      </tr>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2"></td>
                        <td className="border border-gray-300 px-4 py-2">
                          15:30
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Select Your Schedule
                </h2>
                <Listbox
                  value={selectedSchedule}
                  onChange={setSelectedSchedule}
                >
                  <Label className="block text-sm font-medium text-gray-700 mt-4">
                    Available Schedules
                  </Label>
                  <div className="relative mt-2">
                    <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-md bg-white py-1.5 pr-2 pl-3 text-left text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-indigo-600 sm:text-sm">
                      <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
                        <span className="block truncate">
                          {selectedSchedule
                            ? new Date(
                                selectedSchedule.StartDateTime
                              ).toLocaleString()
                            : "Select a schedule"}
                        </span>
                      </span>
                      <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-500 sm:size-4"
                      />
                    </ListboxButton>
                    <ListboxOptions className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base ring-1 ring-black/5 shadow-lg focus:outline-none sm:text-sm">
                      {scheduleOptions.map((schedule) => {
                        const formatted = new Date(
                          schedule.StartDateTime
                        ).toLocaleString();
                        return (
                          <ListboxOption
                            key={schedule.ScheduleID}
                            value={schedule}
                            className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-focus:bg-indigo-600 data-focus:text-white"
                          >
                            {({ selected, active }) => (
                              <>
                                <span
                                  className={`ml-3 block truncate ${
                                    selected ? "font-semibold" : "font-normal"
                                  }`}
                                >
                                  {formatted}
                                </span>
                                {selected && (
                                  <span
                                    className={`absolute inset-y-0 right-0 flex items-center pr-4 ${
                                      active ? "text-white" : "text-indigo-600"
                                    }`}
                                  >
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

            <div className="mt-10 pb-20">
              {line.Name === "Sun Line" ? (
                <button
                  onClick={handleBookingClick}
                  className="bg-[#00537E] w-full text-white rounded-lg shadow px-10 py-3 flex items-center justify-center hover:bg-[#F5A623] transition-colors"
                >
                  BOOK
                </button>
              ) : (
                <Link
                  href={reservationUrl}
                  className="bg-[#00537E] w-full text-white rounded-lg shadow px-10 py-3 flex items-center justify-center hover:bg-[#F5A623] transition-colors"
                >
                  BOOK
                </Link>
              )}

              {isModalOpen && <Modal setIsModalOpen={setIsModalOpen} />}
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
