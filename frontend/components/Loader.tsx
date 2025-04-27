"use client";

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-16 h-16 border-8 border-gray-300 border-t-primary-100 rounded-full animate-spin shadow-md"></div>
      <p className="mt-4 text-gray-600 text-lg font-semibold">
        Loading results...
      </p>
    </div>
  );
}
