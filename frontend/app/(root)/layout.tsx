import Navbar from "@/components/Navbar";

export default function Layout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="font-work-sans">
      <div className="sticky top-0 z-50 bg-white">
        <Navbar />
        </div>
      {children}
    </main>
  );
}
