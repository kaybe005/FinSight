import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  ChartOptions,
} from "chart.js";
import Skeleton from "./Skeleton";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement
);

interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    borderWidth?: number;
    fill?: boolean;
    tension?: number;
  }[];
}

interface StockChartProps {
  data: ChartData | null;
  error?: string | null;
}

const StockChart: React.FC<StockChartProps> = ({ data, error }) => {
  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-lg text-red-600">
        Chart Error: {error}
      </div>
    );
  }

  if (!data) {
    return <Skeleton />;
  }

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Stock Price Over Time",
        font: {
          size: 16,
          weight: "bold",
        },
        padding: { top: 10, bottom: 20 },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (context) => {
            return `${context.dataset.label}: $${context.parsed.y.toFixed(2)}`;
          },
        },
      },
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 12,
          padding: 20,
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
        },
      },
      y: {
        beginAtZero: false,
        ticks: {
          callback: (value) => `$${value}`,
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    interaction: {
      mode: "nearest",
      axis: "x",
      intersect: false,
    },
  };

  return (
    <div className="h-[400px] w-full">
      <Line data={data} options={options} redraw={true} />
    </div>
  );
};

export default StockChart;
