"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const MARKET_AUX_API_KEY = process.env.NEXT_PUBLIC_MARKETAUX_API_KEY;

interface Article {
  title: string;
  description: string;
  url: string;
  image_url?: string;
  source?: { domain: string };
  published_at: string;
}

const NewsSkeleton = () => {
  return (
    <div className="animate-pulse bg-white shadow-sm rounded-xl overflow-hidden border border-gray-100">
      <div className="bg-gray-300 h-[250px] w-full" />
      <div className="p-4 space-y-2">
        <div className="bg-gray-300 h-6 w-3/4 rounded" />
        <div className="bg-gray-300 h-4 w-full rounded" />
        <div className="bg-gray-300 h-4 w-5/6 rounded" />
        <div className="bg-gray-300 h-3 w-1/2 rounded mt-2" />
      </div>
    </div>
  );
};

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
          `https://api.marketaux.com/v1/news/all`,
          {
            params: {
              api_token: MARKET_AUX_API_KEY,
              symbols: symbol,
              filter_entities: true,
              language: "en",
              limit: 6,
            },
          }
        );

        setArticles(response.data.data);
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
      <div className="mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-[#0A2540]">
          📰 Market News
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, idx) => (
            <NewsSkeleton key={idx} />
          ))}
        </div>
      </div>
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
            <Image
              src={article.image_url || "/fallback-image.jpg"}
              alt="News Thumbnail"
              width={400}
              height={250}
              className="rounded-md object-cover w-full h-auto"
              unoptimized
            />

            <div className="p-4">
              <h4 className="text-lg font-medium text-[#0A2540] mb-1 line-clamp-2">
                {article.title}
              </h4>
              <p className="text-sm text-gray-600 line-clamp-3 mb-2">
                {article.description}
              </p>
              <span className="text-xs text-gray-400">
                {article.source?.domain} ·{" "}
                {new Date(article.published_at).toLocaleDateString()}
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
