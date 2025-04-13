"use client";

import { useRouter } from "next/navigation";

export default function ThankYouPage() {
  const router = useRouter();

  const handleDone = () => {
    router.push("/");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full text-center">
        <h1 className="mb-4 text-3xl font-bold text-gray-900">
          Thanks! Now check your email
        </h1>
        <p className="mb-6 text-gray-700">
          You should get a confirmation email soon. Open it and click the
          <strong>&quot;Confirm your subscription&quot;</strong> button so we
          can keep you up to date.
        </p>
        <button
          onClick={handleDone}
          className="mx-auto rounded-md bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-[#F5A623] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 transition"
        >
          Done
        </button>
      </div>
    </main>
  );
}
