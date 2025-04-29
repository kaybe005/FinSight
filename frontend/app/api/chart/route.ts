import { NextRequest } from "next/server";
import axios from "axios";

const TWELVE_DATA_API_KEY = process.env.NEXT_PUBLIC_TWELVE_DATA_API_KEY;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const symbol = searchParams.get('symbol');

  if (!symbol) {
    return new Response(JSON.stringify({ error: "Missing symbol" }), { status: 400 });
  }

  try {
  
    const response = await axios.get(`https://api.twelvedata.com/time_series`, {
      params: {
        symbol,
        interval: "1day",
        outputsize: 30,
        apikey: TWELVE_DATA_API_KEY,
      },
    });

  
    const { values, status, message } = response.data;
  
    if (status === "error") {
      console.error("TwelveData Error:", message);
      return new Response(JSON.stringify({ error: message }), { status: 500 });
    }
  
    if (!values || !Array.isArray(values)) {
      console.error("No 'values' in TwelveData response");
      return new Response(JSON.stringify({ error: "No time series data found" }), { status: 500 });
    }
  
    const labels = values.map((entry: any) => entry.datetime).reverse();
    const closePrices = values.map((entry: any) => parseFloat(entry.close)).reverse();
  
    const chartData = {
      labels,
      datasets: [
        {
          label: `${symbol.toUpperCase()} Stock Price (USD)`,
          data: closePrices,
          borderColor: "#0057FF",
          backgroundColor: "rgba(0, 87, 255, 0.1)",
          borderWidth: 2,
          fill: true,
          tension: 0.3,
        },
      ],
    };
  
    return new Response(JSON.stringify(chartData), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch stock data" }), { status: 500 });
  }
}  