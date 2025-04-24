import fetch from 'node-fetch';
import dotenv from 'dotenv';
import Snoowrap from 'snoowrap';

dotenv.config();

const getAccessToken = async () => {
    const tokenUrl = 'https://www.reddit.com/api/v1/access_token';
    const clientId = process.env.REDDIT_CLIENT_ID;
    const clientSecret = process.env.REDDIT_CLIENT_SECRET;

    const auth = 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
    
    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Authorization' : auth,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
            grant_type: 'client_credentials'
        })
    });

    const data = await response.json();
    return data.access_token;
}

const analyzeSentiment = (title) => {
    const positiveKeywords = ['bullish', 'up', 'positive', 'buy'];
    const negativeKeywords = ['bearish', 'down', 'negative', 'sell'];

    let sentiment = 'neutral';
    for (const word of positiveKeywords) {
        if (title.toLowerCase().includes(word)) {
            sentiment = 'positive';
            break;
        }
    }
    return sentiment;
};

const getRedditPosts = async (symbol, accessToken) => {
    const url = `https://oauth.reddit.com/r/stocks/search?q=${symbol}&sort=relevance&limit=5`;

    const response = await fetch(url, {
        headers: {
            'Authorization': `bearer ${accessToken}`,
        },
    });

    const data = await response.json();

    return data.data.children.map(post => ({
        subreddit: post.data.subreddit,
        post: post.data.title,
        sentiment: analyzeSentiment(post.data.title),
    }));
};

export { getAccessToken, getRedditPosts };