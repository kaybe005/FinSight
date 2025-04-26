"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const NEWS_API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;

interface Article {
  title: string;
  description: string;
  url: string;
  urlToImage?: string;
  source: { name: string };
  publishedAt: string;
}

const NewsFeed = ({ symbol }: { symbol: string }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://newsapi.org/v2/everything?q=${symbol}&sortBy=publishedAt&pageSize=6&language=en&apiKey=${NEWS_API_KEY}`
        );
        setArticles(response.data.articles);
      } catch (err) {
        setError("Failed to fetch news articles.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [symbol]);

  if (loading) {
    return (
      <div className="text-center text-gray-500 py-8">Fetching news...</div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="mt-12">
      <h3 className="text-2xl font-semibold mb-4 text-[#0A2540]">
        📰 Market News{" "}
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article, idx) => (
          <a
            key={idx}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white shadow-sm rounded-xl overflow-hidden hover:shadow-md transition border border-gray-100"
          >
            {article.urlToImage && (
              <img
                src={article.urlToImage}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
            )}
            <div className="p-4">
              <h4 className="text-lg font-medium text-[#0A2540] mb-1 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                {article.description}
              </p>
              <span className="text-xs text-gray-400">
                {article.source.name} ·{" "}
                {new Date(article.publishedAt).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
