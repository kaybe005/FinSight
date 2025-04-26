"use client";
import { useEffect, useState } from "react";
import StockChart from "@/components/StockChart/StockChart";
import axios from "axios";
import { ChartData } from "chart.js";
import NewsFeed from "./NewsFeed";

const API_KEY = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY;

interface AlphaVantageResponse {
  "Time Series (Daily)"?: {
    [date: string]: {
      "4. close": string;
    };
  };
  "Error Message"?: string;
  Note?: string;
}

const Dashboard = () => {
  const [stockData, setStockData] = useState<ChartData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stockSymbol, setStockSymbol] = useState("IBM");
  const [searchInput, setSearchInput] = useState("IBM");

  const fetchStockData = async (symbol: string, retryCount = 0) => {
    if (!symbol.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await axios.get<AlphaVantageResponse>(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${symbol}&apikey=${API_KEY}`
      );

      // Handle API rate limiting
      if (response.data.Note) {
        if (retryCount < 3) {
          await new Promise((resolve) =>
            setTimeout(resolve, 1000 * (retryCount + 1))
          );
          return fetchStockData(symbol, retryCount + 1);
        }
        throw new Error("API rate limit reached. Please try again later.");
      }

      // Handle explicit API errors
      if (response.data["Error Message"]) {
        throw new Error(response.data["Error Message"]);
      }

      const timeSeries = response.data["Time Series (Daily)"];

      if (!timeSeries) {
        throw new Error("No time series data found in response");
      }

      const dates = Object.keys(timeSeries).slice(0, 30).reverse();
      const prices = dates.map((date) =>
        parseFloat(timeSeries[date]["4. close"])
      );

      if (prices.length === 0) {
        throw new Error("No price data available");
      }

      const chartData: ChartData = {
        labels: dates,
        datasets: [
          {
            label: `${symbol.toUpperCase()} Stock Price (USD)`,
            data: prices,
            borderColor: "#0057FF",
            backgroundColor: "rgba(0, 87, 255, 0.1)",
            borderWidth: 2,
            fill: true,
            tension: 0.3,
          },
        ],
      };

      setStockData(chartData);
      setStockSymbol(symbol.toUpperCase());
    } catch (err) {
      const errorMessage =
        err.response?.data?.["Error Message"] ||
        err.response?.data?.Note ||
        err.message;
      setError(errorMessage || "Failed to fetch stock data");
      console.error("API Error:", err);
    } finally {
      setLoading(false);
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
    <div className="bg-[#F9FAFB] px-4 py-8 max-w-6xl mx-auto">
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
          className="bg-[#0057FF] text-white px-6 py-2 rounded-lg hover:bg-[#0040CC]transition disabled:opacity-50"
          disabled={loading || !searchInput.trim()}
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      <div className="bg-white rounded-xl shadow-md border border-[#E6EBF2] p-4 min-h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
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
            <StockChart data={stockData} />

            <NewsFeed symbol={stockSymbol} />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            No data to display
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
