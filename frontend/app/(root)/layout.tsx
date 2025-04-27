import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/Navbar";
import "@/app/globals.css";

export const metadata = {
  title: "Fyntra",
  description: "Smarter Investing Starts Here",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body className="bg-white text-black">
        <SessionProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
