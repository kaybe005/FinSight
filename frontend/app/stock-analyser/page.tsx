import StockAnalyserClient from "@/components/StockAnalyserClient";
import { Suspense } from "react";

export default function StockAnalyserPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StockAnalyserClient />
    </Suspense>
  );
}
