"use client";
import { motion } from "framer-motion";
import { useEffect } from "react";

const solutions = [
  {
    icon: "📉",
    title: "Risk-Aware Investing",
    description:
      "Fyntra highlights potential red flags in financials and summarizes earnings risks so you can invest confidently.",
  },
  {
    icon: "⏱️",
    title: "Time-Saving Dashboards",
    description:
      "No more bouncing between websites. Everything from Reddit sentiment to earnings summaries in one place.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Decisions",
    description:
      "Our models condense data into insights - helping you find trends, sentiment, and investment signals faster.",
  },
  {
    icon: "🔎",
    title: "Investor-Grade Transparency",
    description:
      "Dive into live metrics and earnings breakdowns that traditional brokers often hide or overlook.",
  },
];

export default function SolutionsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-16 px-6 shadow-inner"
    >
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 text-center text-slate-800"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Smart Solutions for{" "}
          <span className="text-[#0057FF]">Smarter Investors.</span>
        </motion.h1>
        <motion.p
          className="text-lg text-slate-900 mb-12 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
        >
          Whether you&apos;re a beginner, active trader, or long-term investor —
          Fyntra provides tailored tools that help you stay ahead of the market
          with AI-driven insights and live data.
        </motion.p>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {solutions.map((solution, i) => (
            <motion.div
              key={solution.title}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100 hover:border-blue-100"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.1 }}
            >
              <div className="text-4xl mb-4 bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
                {solution.icon}
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-3">
                {solution.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {solution.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
