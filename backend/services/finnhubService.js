import axios from  'axios';

const getStockData = async (symbol, apiKey) => {
    try{
        const response = await axios.get(`https://finnhub.io/api/v1/quote`, {
            params: {
                symbol,
                token: apiKey,
            },
        });
        return response.data;
    } catch (error){
        console.log(`Error fetching stock data:`, error.message);
        return null;
    }
};

const getFinancialMetrics = async (symbol, apiKey) => {
    const url = `https://finnhub.io/api/v1/stock/metric?symbol=${symbol}&metric=all&token=${apiKey}`;
    const response = await axios.get(url);
    const metrics = response.data.metric;

    return{
        peRatio: metrics.peBasicExclExtraTTM,
        eps: metrics.epsTTM,
        roe: metrics.roeTTM,
        profitMargin: metrics.netProfitMarginTTM,
        debtToEquity: metrics.totalDebtTotalEquityAnnual,
    };
};

const getStockNews = async (symbol, apiKey) => {
   const now = new Date();
   const to = now.toISOString().split('T')[0];
   const from = new Date(now.setDate(now.getDate() - 7)).toISOString().split('T')[0];

    const url = `https://finnhub.io/api/v1/company-news?symbol=${symbol}&from=${from}&to=${to}&token=${apiKey}`;
    const response = await axios.get(url);
    
    return response.data.slice(0,5).map(article => ({
        headline: article.headline,
        source: article.source,
        datetime: new Date(article.datetime * 1000).toISOString().split('T')[0],
        url: article.url,
    }));
};

const getRedditSentiment = async (symbol, apiKey) => {
    return [
      { subreddit: "stocks", post: "I'm bullish on AAPL", sentiment: "positive" }
    ];
};

export { getStockData, getFinancialMetrics, getStockNews, getRedditSentiment };
