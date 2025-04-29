"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary-100">
          Fyntra
        </Link>

        {/* Desktop nav links */}
        <div className="hidden sm:flex items-center gap-6 text-sm sm:text-base">
          <Link
            href="/solutions"
            className={`${
              pathname.startsWith("/solutions")
                ? "font-bold text-primary-100"
                : "text-black"
            }`}
          >
            Solutions
          </Link>
          <Link
            href="/dashboards"
            className={`${
              pathname.startsWith("/dashboards")
                ? "font-bold text-primary-100"
                : "text-black"
            }`}
          >
            Dashboards
          </Link>
          <Link
            href="/stock-analyser"
            className={`${
              pathname.startsWith("/stock-analyser")
                ? "font-bold text-primary-100"
                : "text-black"
            }`}
          >
            Stock Analyser
          </Link>
          {!session ? (
            <button
              onClick={() => signIn("github")}
              className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-100/90 transition whitespace-nowrap"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition whitespace-nowrap"
            >
              Sign Out
            </button>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          className="sm:hidden text-black"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav links (inline, not stacked) */}
      {menuOpen && (
        <div className="flex sm:hidden flex-wrap justify-center gap-4 px-4 pb-4">
          <Link
            href="/solutions"
            className={`${
              pathname.startsWith("/solutions")
                ? "font-bold text-primary-100"
                : "text-black"
            }`}
          >
            Solutions
          </Link>
          <Link
            href="/dashboards"
            className={`${
              pathname.startsWith("/dashboards")
                ? "font-bold text-primary-100"
                : "text-black"
            }`}
          >
            Dashboards
          </Link>
          <Link
            href="/stock-analyser"
            className={`${
              pathname.startsWith("/stock-analyser")
                ? "font-bold text-primary-100"
                : "text-black"
            }`}
          >
            Stock Analyser
          </Link>
          {!session ? (
            <button
              onClick={() => signIn("github")}
              className="bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-100/90 transition whitespace-nowrap"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition whitespace-nowrap"
            >
              Sign Out
            </button>
          )}
        </div>
      )}
    </nav>
  );
}
