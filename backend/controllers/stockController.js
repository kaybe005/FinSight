import { getStockData, getFinancialMetrics, getStockNews } from '../services/finnhubService.js';
import { getAccessToken, getRedditPosts } from '../services/redditService.js';
import axios from 'axios';

const getStockInfo = async (req, res) => {
    const { symbol } = req.query;
    const apiKey = process.env.FINNHUB_API_KEY;
    const now = Math.floor(Date.now() / 1000);
    const oneMonthAgo = now - 30 * 24 * 60 * 60;

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

    const getChartData = async (req, res) => {
        const { symbol } = req.query;
        const apiKey = process.env.FINNHUB_API_KEY;
        const now = Math.floor(Date.now() / 1000);
        const oneMonthAgo = now - 30 * 24 * 60 * 60;
    
        try {
            const { data } = await axios.get('https://finnhub.io/api/v1/stock/candle', {
                params: {
                    symbol,
                    resolution: 'D',
                    from: oneMonthAgo,
                    to: now,
                    token: apiKey,
                },
            });
    
            if (data.s !== 'ok') {
                return res.status(404).json({ error: 'Chart data not found' });
            }
    
            res.json(data);
        } catch (err) {
            console.error('Chart API Error:', err.message);
            res.status(500).json({ error: 'Failed to fetch chart data' });
        }
    };
    
};

export { getStockInfo, getChartData };
