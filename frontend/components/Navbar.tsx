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
      className={`fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 ${
        scrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      } transition-all duration-300`}
    >
      <div className="max-w-screen-xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary-100">
          Fyntra
        </Link>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="sm:hidden text-black focus:outline-none"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Navigation Menu */}
        <div
          className={`${
            menuOpen ? "flex" : "hidden"
          } absolute top-full left-0 w-full flex-col bg-white px-4 py-4 sm:static sm:flex sm:flex-row sm:items-center sm:gap-6 sm:bg-transparent sm:p-0`}
        >
          <Link
            href="/solutions"
            className={`block py-2 sm:py-0 ${
              pathname.startsWith("/solutions")
                ? "font-bold text-primary-100"
                : ""
            }`}
          >
            Solutions
          </Link>
          <Link
            href="/dashboards"
            className={`block py-2 sm:py-0 ${
              pathname.startsWith("/dashboards")
                ? "font-bold text-primary-100"
                : ""
            }`}
          >
            Dashboards
          </Link>
          <Link
            href="/stock-analyser"
            className={`block py-2 sm:py-0 ${
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
              className="mt-2 sm:mt-0 bg-primary-100 text-white px-4 py-2 rounded-lg hover:bg-primary-100/90 transition"
            >
              Sign In
            </button>
          ) : (
            <button
              onClick={() => signOut()}
              className="mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
            >
              Sign Out
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
