"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-4 py-3 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
        <Link href="/" className="text-2xl font-bold text-primary-100">
          Fyntra
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 text-sm sm:text-base">
          <Link
            href="/solutions"
            className={`${
              pathname.startsWith("/solutions")
                ? "font-bold text-primary-100"
                : ""
            }`}
          >
            Solutions
          </Link>
          <Link
            href="/dashboards"
            className={`${
              pathname.startsWith("/dashboards")
                ? "font-bold text-primary-100"
                : ""
            }`}
          >
            Dashboards
          </Link>
          <Link
            href="/stock-analyser"
            className={`${
              pathname.startsWith("/stock-analyser")
                ? "font-bold text-primary-100"
                : ""
            }`}
          >
            Stock Analyser
          </Link>

          {!session ? (
            <button
              onClick={() => signIn("github")}
              className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-100/90 transition"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
