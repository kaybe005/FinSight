"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import Loader from "@/components/Loader";

export default function StockAnalyserClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery("");

    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSearchQuery(query);
    setLoading(false);
  };

  // ⏳ Auto-trigger when coming from Home page
  useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-start bg-gradient-to-b from-[#e6f0ff] via-[#f0f5ff] to-white px-4 py-20 text-black">
      <h1 className="text-center text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#00C4A3] to-[#0057FF] bg-clip-text text-transparent mb-10">
        Stock Analyser
      </h1>

      <div className="w-full max-w-2xl mb-10">
        <SearchForm onSearch={handleSearch} />
      </div>

      {loading ? (
        <Loader />
      ) : (
        searchQuery && (
          <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-2">
            {[
              {
                title: "AI Investment Insights",
                description:
                  "Deep AI-generated analysis for smarter investing.",
              },
              {
                title: "Earnings Highlights",
                description:
                  "Latest quarterly earnings breakdowns at a glance.",
              },
              {
                title: "Reddit Sentiment",
                description: "Community-driven sentiment analysis from Reddit.",
              },
              {
                title: "Financial Metrics",
                description: "Key financial ratios and performance metrics.",
              },
              {
                title: "Latest News",
                description: "Real-time financial news impacting your stocks.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl shadow-md hover:shadow-lg hover:shadow-primary-100/30 transition-transform duration-300 transform hover:-translate-y-2 p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">
                    {item.title}
                  </h2>
                  <p className="text-gray-500 text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </section>
        )
      )}
    </main>
  );
}
