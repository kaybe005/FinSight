"use client";

import { useState } from "react";
import SearchForm from "@/components/SearchForm";

export default function HomeClient() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    console.log("User searched:", query);
    setSearchQuery(query);
  };

  return (
    <section className="w-full flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#e6f0ff] via-[#f0f5ff] to-white pt-40 pb-32 px-6 text-center">
      <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-[#00C4A3] to-[#0057FF] bg-clip-text text-transparent mb-8 leading-tight">
        Smarter Investing, <br /> Powered by AI
      </h1>

      <p className="text-gray-700 text-lg md:text-2xl max-w-2xl mb-12">
        Analyze stocks instantly with AI-driven insights, real-time financial
        metrics, and intelligent dashboards — all in one seamless experience.
      </p>

      <div className="w-full max-w-xl">
        <SearchForm />
      </div>
    </section>
  );
}
