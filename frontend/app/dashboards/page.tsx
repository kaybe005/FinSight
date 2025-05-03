import Dashboard from "./DashboardClient";

export const metadata = {
  title: "Fyntra | Stock Dashboard",
  description: "Track stocks, ratios, and AI-generated investment insights.",
  openGraph: {
    title: "Fyntra Dashboard",
    description: "Your all-in-one AI stock analysis platform.",
    url: "https://fyntra.vercel.app/dashboard",
    siteName: "Fyntra",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Fyntra Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fyntra Dashboard",
    description: "AI-generated summaries and real-time insights.",
    images: ["/og-image.png"],
  },
};

export default function DashboardPage() {
  return <Dashboard />;
}
