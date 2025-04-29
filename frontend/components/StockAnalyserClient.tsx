"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import SearchForm from "@/components/SearchForm";
import Loader from "@/components/Loader";
import axios from "axios";

export default function StockAnalyserClient() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("query") || "";

  const [stockData, setStockData] = useState<Record<string, any> | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const response = await axios.get(
        `http://localhost:5005/api/stocks/${query}`
      );
      setStockData(response.data);
    } catch (err) {
      console.error(err);
      setError("Failed to fetch stock data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  //  Auto-trigger when coming from Home page
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
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : stockData ? (
        <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10 px-2">
          {[
            {
              title: "Stock Price",
              description: `$${stockData.current_price}`,
            },
            {
              title: "P/E Ratio",
              description: stockData.financial_metrics.peRatio
                ? `${stockData.financial_metrics?.peRatio.toFixed(2)}`
                : "N/A",
            },
            {
              title: "EPS",
              description: stockData.financial_metrics?.eps
                ? `$${stockData.financial_metrics.eps.toFixed(2)}`
                : "N/A",
            },
            {
              title: "Return on Equity",
              description: stockData.financial_metrics?.roe
                ? `${stockData.financial_metrics?.roe.toFixed(2)}%`
                : "N/A",
            },
            {
              title: "Profit Margin",
              description: stockData.financial_metrics?.profitMargin
                ? `${stockData.financial_metrics?.profitMargin.toFixed(2)}%`
                : "N/A",
            },
            {
              title: "Symbol",
              description: `${stockData.symbol}`,
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl hover:bg-gray-50 transition-all duration-300 hover:scale-105 p-6 flex flex-col justify-between hover:border-primary-100/50"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-[#00C4A3] to-[#0057FF] rounded-full p-2">
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 1.343-3 3 0 2.667 3 5 3 5s3-2.333 3-5c0-1.657-1.343-3-3-3z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 2a10 10 0 00-7.746 16.32L4 22l3.68-0.254A10 10 0 1012 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-semibold text-gray-700">
                  {item.title}
                </h2>
              </div>

              <p className="text-3xl font-extrabold bg-gradient-to-r from-[#00C4A3] to-[#0057FF] bg-clip-text text-transparent">
                {item.description}
              </p>
              {stockData?.timestamp && (
                <p className="text-xs text-gray-400 mt-2">
                  Last updated:{" "}
                  {new Date(stockData.timestamp * 1000).toLocaleString()}
                </p>
              )}
            </div>
          ))}
        </section>
      ) : (
        <p className="text-gray-400">Start by searching for a stock symbol.</p>
      )}
    </main>
  );
}
