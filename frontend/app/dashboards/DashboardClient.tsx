"use client";

import { useEffect, useState } from "react";
import DynamicStockChart from "@/components/DynamicStockChart";
import axios from "axios";
import NewsFeed from "./NewsFeed";
import ChartSkeleton from "@/components/ChartSkeleton";
import { useSession } from "next-auth/react";

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth: number;
    fill: boolean;
    tension: number;
  }[];
}

export default function Dashboard() {
  const [stockData, setStockData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockSymbol, setStockSymbol] = useState("IBM");
  const [searchInput, setSearchInput] = useState("IBM");
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [headlines, setHeadlines] = useState<string[]>([]);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const { data: session } = useSession();
  const userId = session?.user?.id;
  const removeFromWatchlist = (symbol: string) => {
    setWatchlist((prev) => prev.filter((item) => item !== symbol));
  };

  useEffect(() => {
    if (userId) {
      axios
        .get(`https://fyntra-backend.onrender.com/api/watchlist/${userId}`)
        .then((res) => setWatchlist(res.data.symbols || []))
        .catch((err) => console.error("Failed to fetch watchlist:", err));
    }
  }, [userId]);

  const fetchRatios = async (symbol: string): Promise<string> => {
    const apiKey = process.env.NEXT_PUBLIC_FMP_API_KEY;
    const url = `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${symbol}?apikey=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!data || data.length === 0) return "No ratio data available.";

      const { peRatioTTM, epsTTM, roeTTM } = data[0];

      return `P/E: ${peRatioTTM?.toFixed(2)}, EPS: ${epsTTM?.toFixed(
        2
      )}, ROE: ${roeTTM?.toFixed(2)}%`;
    } catch (error) {
      console.error("Error fetching ratios:", error);
      return "Failed to fetch ratios.";
    }
  };

  const fetchStockData = async (symbol: string) => {
    if (!symbol.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://fyntra-backend.onrender.com/api/chart?symbol=${symbol}`
      );

      setStockData(response.data);
      setStockSymbol(symbol.toUpperCase());

      const newsText =
        headlines.length > 0 ? headlines.join("\n") : "No recent news found.";

      const ratiosText = await fetchRatios(symbol);
      fetchAISummary(symbol, newsText, ratiosText);
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rawError = (err as any).response?.data?.error || "";
      let errorMessage = "Something went wrong. Please try again.";

      if (rawError.includes("symbol") || rawError.includes("figi")) {
        errorMessage =
          "Invalid stock symbol. Please enter a valid ticker (e.g., AAPL, TSLA).";
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchAISummary = async (
    symbol: string,
    news: string,
    ratios: string
  ) => {
    setAiLoading(true);
    try {
      const response = await axios.post(
        "https://fyntra-backend.onrender.com/api/ai/summary",
        {
          ticker: symbol,
          news,
          ratios,
        }
      );

      setAiSummary(response.data.summary);
    } catch (error) {
      console.error("Error fetching AI summary:", error);
      setAiSummary("Unable to generate AI summary.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim() && !loading) {
      fetchStockData(searchInput.trim());
    }
  };

  useEffect(() => {
    fetchStockData(stockSymbol);
  }, []);

  return (
    <div className="pt-20 bg-[#F9FAFB] px-4 py-8 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-[#0A2540]">
        📊 Stock Dashboard
      </h2>

      <form onSubmit={handleSearch} className="mb-8 flex gap-2 items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="e.g. AAPL, TSLA, MSFT"
          className="px-4 py-2 border border-[#E6EBF2] bg-white text-[#0A2540] rounded-lg shadow-sm flex-1 max-w-md focus:outline-none focus:ring-2 focus:ring-[#0057FF]"
          disabled={loading}
        />
        <button
          type="submit"
          className="bg-[#0057FF] text-white px-6 py-2 rounded-lg hover:bg-[#0040CC] transition disabled:opacity-50"
          disabled={loading || !searchInput.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#0A2540] mb-2">
          ⭐ Watchlist
        </h3>
        {watchlist.length === 0 ? (
          <p className="text-gray-500 text-sm">No stocks in your watchlist.</p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {watchlist.map((symbol) => (
              <div
                key={symbol}
                className="flex items-center gap-2 bg-[#F5F7FA] border border-[#E6EBF2] rounded-lg px-3 py-1"
              >
                <button
                  onClick={() => fetchStockData(symbol)}
                  className="text-sm text-[#0057FF] font-medium hover:underline"
                >
                  {symbol}
                </button>
                <button
                  onClick={() => removeFromWatchlist(symbol)}
                  className="text-xs text-red-500 hover:text-red-700"
                  title="Remove"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {watchlist.map((symbol) => (
        <div key={symbol} className="mb-4">
          <h3 className="text-lg font-semibold text-[#0A2540]">{symbol}</h3>
          <button
            onClick={() => fetchStockData(symbol)}
            className="text-sm text-[#0057FF] hover:underline"
          >
            View Details
          </button>
        </div>
      ))}
      <div className="bg-white rounded-xl shadow-md border border-[#E6EBF2] p-4 min-h-[400px]">
        {loading ? (
          <ChartSkeleton />
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 font-medium mb-2">{error}</p>
            <button
              onClick={() => fetchStockData(stockSymbol)}
              className="text-blue-600 hover:underline"
            >
              Retry
            </button>
          </div>
        ) : stockData ? (
          <>
            <div className="mb-4">
              <h3 className="text-xl font-semibold text-[#0A2540]">
                {stockSymbol} - Last 30 Days
              </h3>
              <p className="text-[#6B7C93] text-sm">
                Daily closing prices (USD)
              </p>
            </div>

            <DynamicStockChart data={stockData} />

            <NewsFeed symbol={stockSymbol} onHeadlinesUpdate={setHeadlines} />

            {stockSymbol && !watchlist.includes(stockSymbol) && (
              <button
                onClick={() => setWatchlist((prev) => [...prev, stockSymbol])}
                className="mt-4 px-4 py-2 bg-[#00C4A3] text-white rounded-lg text-sm hover:bg-[#00A78A] transition"
              >
                ➕ Add {stockSymbol} to Watchlist
              </button>
            )}
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data to display
          </div>
        )}
      </div>

      {aiLoading ? (
        <div className="mt-12 text-sm text-gray-500 text-center">
          Generating AI insight...
        </div>
      ) : aiSummary ? (
        <div className="mt-12 bg-white shadow-sm rounded-xl border border-[#E6EBF2] overflow-hidden">
          <div className="p-6">
            <h3 className="text-2xl font-semibold text-[#0A2540] mb-3">
              🧠 AI Investment Summary
            </h3>
            <p className="text-[#333] leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {aiSummary}
            </p>
            <p className="mt-4 text-xs text-gray-400 italic text-right">
              Generated using latest news & ratios
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
