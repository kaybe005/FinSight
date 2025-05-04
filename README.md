# 📊 Fyntra – AI-Powered Stock Insight Dashboard

Fyntra is a full-stack FinTech web app that empowers users to analyze stocks using real-time financial data, AI-generated investment summaries, and a personalized watchlist. Built with Next.js, Node.js, MongoDB, and Groq, it combines advanced tech with sleek design for retail investors and enthusiasts.

---

## 🚀 Features

### ✅ Core Functionality

- **Stock Search**: Enter a stock symbol (e.g., AAPL, TSLA) to view historical price charts.
- **AI Investment Summary**: Generates Groq-powered insights from key ratios and recent financial news.
- **Watchlist Management**:
  - Add/remove stocks from your personal watchlist (stored in MongoDB)
  - Watchlist persists across sessions with GitHub OAuth
- **News Feed**: Fetches real-time stock-related headlines.
- **Financial Metrics**: Pulls data like P/E ratio, EPS, and ROE from FMP API.

---

## 🧰 Tech Stack

### 🖥️ Frontend

- **Next.js 14**
- **TypeScript**
- **Tailwind CSS**
- **Chart.js** via `react-chartjs-2`

### ⚙️ Backend

- **Node.js** + **Express**
- **MongoDB Atlas** with **Mongoose**
- **OpenAI GPT-4** (AI Summary)
- **FMP (Financial Modeling Prep)** API
- **News API** (Marketaux or similar)

### 🔐 Authentication

- **NextAuth.js** with **GitHub OAuth**
- Session-based user identification (via email) used for storing watchlists

---

## 📸 Screenshots

| Dashboard View                               | Watchlist                                    | AI Summary                             |
| -------------------------------------------- | -------------------------------------------- | -------------------------------------- |
| ![Dashboard](./public/screens/dashboard.png) | ![Watchlist](./public/screens/watchlist.png) | ![AI](./public/screens/ai-summary.png) |

---

## 🛠️ Installation & Setup

### 1. Clone the Repo

```bash
git clone https://github.com/kaybe005/fyntra.git
cd fyntra
```

### 2. Setup Frontend

```bash
cd frontend
npm install

Create .env.local in /frontend:
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=yourSecret
NEXT_PUBLIC_FMP_API_KEY=your_fmp_key
GITHUB_CLIENT_ID=your_github_id
GITHUB_CLIENT_SECRET=your_github_secret
```

### 3. Setup Backend

```bash
cd ../backend
npm install

Create .env in /backend:
PORT=5005
MONGO_URI=your_mongo_uri
OPENAI_API_KEY=your_openai_key
```

### 4. Run Locally

```bash
Start backend:
cd backend
npm run dev
```

```bash
Start frontend:
cd frontend
npm run dev

Frontend on: http://localhost:3000
Backend on: http://localhost:5005
```

---

## 🧪Features in Progress/ Ideas

- **Reddit sentiment integration using Pushshift or Reddit API**
- **Twitter/X sentiment analysis**
- **Stock watchlist price alerts**
- **Portfolio performance tracking**
- **AI-based risk scoring**

---

## 💻 Project Structure

```perl
fyntra/
│
├── frontend/            → Next.js app
│   ├── pages/
│   ├── components/
│   ├── app/
│   └── .env.local       → Frontend API keys
│
├── backend/             → Node + Express API
│   ├── routes/
│   ├── controllers/
│   ├── models/
│   └── .env             → MongoDB, OpenAI keys
│
└── README.md
```

## 👤 Author

**Kalash Bijukchhe**  
💼 Aspiring Full-Stack FinTech Engineer  
📍 Based in Sydney | 🇳🇵 Nepali International Student  
📫 [LinkedIn](https://linkedin.com/in/kayb05) | [GitHub](https://github.com/kaybe005)

## 🧠 Credits

- **Financial Modeling Prep – for ratios**
- **Groq investment insights**
- **Marketaux – real-time headlines**
- **ApexCharts – for price visualizations**
