"use client";

import { Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ContactClient() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-25">
      <section className="relative isolate w-full max-w-4xl pt-5 sm:pt-10 animate-fade-up">
        {/* Background gradient */}
        <div
          className="absolute inset-0 -z-10 transform-gpu overflow-hidden blur-3xl"
          aria-hidden="true"
        >
          <div
            className="relative left-1/2 top-[-40%] w-[40rem] sm:w-[60rem] aspect-[1155/678] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#F5A623] to-[#FFDC91] opacity-30"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>

        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl mb-4">
            Get in Touch
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600 mb-12">
            We&apos;d love to hear from you. Feel free to reach out anytime.
          </p>
        </div>

        <div className="mx-auto max-w-md p-8 shadow-lg backdrop-blur-sm bg-white/80 rounded-xl mb-12">
          <div className="flex flex-col space-y-8">
            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Mail className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Email</h3>
                <p className="mt-1 text-base font-semibold text-gray-900">
                  info@kmgshuttles.al
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="bg-amber-100 p-3 rounded-full">
                <Phone className="h-6 w-6 text-amber-600" />
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">WhatsApp</h3>
                <p className="mt-1 text-base font-semibold text-gray-900">
                  +355 68 466 7466
                </p>
              </div>
            </div>

            <div className="flex justify-center pt-4">
              <Button
                className="bg-gradient-to-r from-amber-500 to-amber-300 hover:from-amber-600 hover:to-amber-400 text-white shadow-md"
                onClick={() =>
                  window.open("https://wa.me/+355684667466", "_blank")
                }
              >
                Contact via WhatsApp
              </Button>
            </div>
          </div>
        </div>

        {/* Embedded Map */}
        <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg mb-16">
          <iframe
            src="https://www.google.com/maps?q=39.872805,20.014343&hl=en&z=15&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
