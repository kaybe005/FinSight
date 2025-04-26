import SearchForm from "@/components/SearchForm";

export default function StockAnalyserPage() {
  return (
    <main className="min-h-screen w-full bg-[#0A2540] flex flex-col items-center justify-start px-4 py-20 text-white">
      {/* Page Heading */}
      <h1 className="text-center text-5xl font-extrabold tracking-tight bg-gradient-to-r from-[#00C4A3] to-[#0057FF] bg-clip-text text-transparent mb-10">
        Stock Analyser
      </h1>

      {/* Search Form */}
      <div className="w-full max-w-2xl">
        <SearchForm />
      </div>

      {/* Results Cards */}
      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-16 px-2">
        {[
          "AI Investment Insights",
          "Earnings Highlights",
          "Reddit Sentiment",
          "Financial Metrics",
          "Latest News",
        ].map((title, index) => (
          <div
            key={index}
            className="bg-[#0f2f4d] rounded-2xl shadow-md hover:shadow-lg hover:shadow-[#00C4A3]/20 transition-shadow p-6"
          >
            <h2 className="text-xl font-semibold text-white mb-2">{title}</h2>
            <p className="text-gray-400 text-sm">Coming soon...</p>
          </div>
        ))}
      </section>
    </main>
  );
}
