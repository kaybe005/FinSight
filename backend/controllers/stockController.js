import { getStockData, getFinancialMetrics, getStockNews } from '../services/finnhubService.js';
import { getAccessToken, getRedditPosts } from '../services/redditService.js';
import axios from 'axios';

const getStockInfo = async (req, res) => {
    const { symbol } = req.params; 
    const apiKey = process.env.FINNHUB_API_KEY;

    try {
        const accessToken = await getAccessToken();
        const stockData = await getStockData(symbol, apiKey);

        if (!stockData || !stockData.c) {
            return res.status(404).json({ error: 'Stock data not found' });
        }

        const financialMetrics = await getFinancialMetrics(symbol, apiKey);
        const redditPosts = await getRedditPosts(symbol, accessToken);

        res.json({
            symbol,
            current_price: stockData.c,
            high_price: stockData.h,
            low_price: stockData.l,
            open_price: stockData.o,
            previous_close: stockData.pc,
            timestamp: stockData.t,
            financial_metrics: financialMetrics,
            news: [],
            reddit_posts: redditPosts,
        });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getChartData = async (req, res) => {
    const { symbol } = req.query; 
    const apiKey = process.env.TWELVE_DATA_API_KEY;

    if (!symbol) {
        return res.status(400).json({ error: 'Symbol is required' });
    }

    try {
        const { data } = await axios.get('https://api.twelvedata.com/time_series', {
            params: {
                symbol,
                interval: '1day',
                outputsize: 30,
                apikey: apiKey,
            },
        });

        if (data.status === "error") {
            console.error("TwelveData Error:", data.message);
            return res.status(404).json({ error: data.message || "Chart data not found" });
        }

        const labels = data.values.map(entry => entry.datetime).reverse();
        const closePrices = data.values.map(entry => parseFloat(entry.close)).reverse();

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

        res.json(chartData);
    } catch (error) {
        console.error('Chart API Error:', error.message);
        res.status(500).json({ error: 'Failed to fetch chart data' });
    }
};
export { getStockInfo, getChartData };
