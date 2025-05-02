# 🧠 Fyntra Backend

This is the backend for **Fyntra**, a full-stack AI-powered stock dashboard. The backend handles API routing, external data integrations (financial APIs, news, Reddit sentiment), authentication (GitHub OAuth), and serves structured data to the frontend.

---

## ⚙️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with Mongoose (optional for persistent user data)(in progress)
- **Axios** for external API calls
- **Passport.js** with GitHub OAuth
- **dotenv** for environment config
- **Alpha Vantage**, **Finnhub**, or **Twelve Data** for market data
- **NewsAPI** (or Marketaux) for real-time news
- **Reddit API** for sentiment (planned)

---

## 📁 Project Structure

fyntra-backend/
├── controllers/
│   └── stockController.js
├── routes/
│   └── api.js
├── services/
│   └── fetchStockData.js
├── auth/
│   └── github.js
├── .env
├── index.js
├── package.json

---

## 🛠️ Getting Started

### 1. Clone the repository

git clone https://github.com/your-username/fyntra.git
cd fyntra/backend

### 2. Install dependencies

npm install

### Set up environment variables

PORT=5000
GITHUB_CLIENT_ID=your_id
GITHUB_CLIENT_SECRET=your_secret
ALPHA_VANTAGE_API_KEY=your_key
NEWS_API_KEY=your_key
REDDIT_CLIENT_ID=your_id (if used)
REDDIT_SECRET=your_secret
FRONTEND_URL=http://localhost:3000

▶️ Running the Server

npm run dev

🔐 Authentication

Fyntra uses GitHub OAuth to authenticate users. Make sure to:
	•	Set the correct callback URL in your GitHub Developer settings
	•	Use sessions or JWTs to manage user state

✅ Todo / Upcoming
	•	Reddit sentiment NLP pipeline
	•	MongoDB user preferences and saved stocks
	•	LangChain + OpenAI for investment summaries

👨‍💻 Author

Built with love by Kalash Bijukchhe
GitHub: @kaybe005


