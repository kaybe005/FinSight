import SearchForm from "@/components/SearchForm";
import Features from "@/components/Features";


export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;

  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Smarter Investing Starts Here</h1>
        <p className="sub-heading !max-w-3xl">
          Get real-time financial data, AI-generated insights, sentiment
          analysis, and earnings breakdowns—all in one intelligent dashboard.
        </p>

        <SearchForm query={query} />
      </section>

      <section className="section-container">
        <Features />

      </section>
    </>
  );
}
