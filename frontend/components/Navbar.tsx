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
      setScrolled(window.scrollY > 10); // If user scrolls more than 10px
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      } transition-all duration-300`}
    >
      <Link href="/" className="text-2xl font-bold">
        Fyntra
      </Link>

      <div className="flex items-center gap-6">
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

        {/* Auth Buttons */}
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
    </nav>
  );
}
