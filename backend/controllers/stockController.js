import { getStockData, getFinancialMetrics, getStockNews } from '../services/finnhubService.js';
import { getAccessToken, getRedditPosts } from '../services/redditService.js';

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

export { getStockInfo };
