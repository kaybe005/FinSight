
const features = [
    {
        title: "Stock Dashboard",
        icon: "📊",
    description: "View key stats, price movement, and performance insights at a glance.",
  },
  {
    title: "AI Investment Insights",
    icon: "🧠",
    description: "Get LLM-generated summaries, potential risks, and investor sentiment.",
  },
  {
    title: "Earnings Highlights",
    icon: "📅",
    description: "Breakdown of company earnings reports, pulled and parsed automatically.",
  },
  {
    title: "Live Financial Metrics",
    icon: "📈",
    description: "Real-time P/E, EPS, market cap, and ratio tracking for every stock.",
  },
  {
    title: "Reddit Sentiment",
    icon: "🗣️",
    description: "See what Reddit investors are saying with our NLP-based sentiment scoring.",
  },
];

export default function Features() {
    return (
        <section className="bg-[#F9FAFB] py-16 px-6">
            <h2 className="text-3xl font-bold text-center mb-4">What You Get With Fyntra</h2>
            <p className="text-center text-gray-600 max-w-xl mx-auto mb-10">
                 Your all-in-one tool for smarter market decisions—powered by AI and real-time data.
            </p>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="bg-white p-6 rounded-2xl shadow hover:shadow-md transition"
          >
            <div className="text-3xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

        </section>
    )
}