"use client";

import dynamic from "next/dynamic";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

// 🚀 Define our own simple typing
interface DynamicStockChartProps {
  data: {
    labels: string[];
    datasets: {
      label: string;
      data: number[];
    }[];
  };
}

export default function DynamicStockChart({ data }: DynamicStockChartProps) {
  const options = {
    chart: {
      id: "dynamic-stock-chart",
      zoom: { enabled: true },
    },
    xaxis: {
      categories: data.labels || [],
    },
    stroke: {
      curve: "smooth",
    },
    colors: ["#0057FF"],
  };

  const series = [
    {
      name: data.datasets?.[0]?.label || "Price",
      data: data.datasets?.[0]?.data || [],
    },
  ];

  return (
    <div className="w-full">
      <ApexChart options={options} series={series} type="line" height={350} />
    </div>
  );
}
