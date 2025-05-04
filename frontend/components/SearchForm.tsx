"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SearchFormProps {
  onSearch?: (query: string) => void; 
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    const searchQuery = query.trim().toUpperCase();

    if (onSearch) {
      onSearch(searchQuery);
    } else {
     
      router.push(`/stock-analyser?query=${searchQuery}`);
    }

    setQuery("");
  };

  const handleReset = () => {
    setQuery("");
  };

  return (
    <div className="flex flex-col items-center w-full">
      <form
        onSubmit={handleSubmit}
        className="flex items-center gap-4 w-full max-w-2xl"
      >
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-1 border rounded-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-primary-100"
          placeholder="Search for a stock (e.g. META, TSLA, AAPL)"
        />
        <button
          type="submit"
          className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-100/90 transition"
        >
          Search
        </button>
        <button
          type="button"
          onClick={handleReset}
          className="text-gray-500 underline"
        >
          Reset
        </button>
      </form>
    </div>
  );
}
