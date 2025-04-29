# 🧠 Fyntra — Smart Financial Analysis Tool

Fyntra is a smart, full-stack FinTech web application that delivers real-time stock insights. Users can search tickers to access live charts, latest financial news, and GitHub-authenticated access — all in one sleek dashboard. Built with performance and design in mind.

---

## 🚀 Live Demo

👉 [https://fyntra.vercel.app](https://fyntra.vercel.app)

---


## ✨ Features

- 📈 Real-time stock price charts (via Twelve Data API)
- 📰 Summarized financial news from News API
- 🔐 GitHub OAuth login with NextAuth.js
- ⚡ Fast and responsive UI with TailwindCSS & Framer Motion
- 💡 Sparkline charts and skeleton loaders for great UX

---

## 🧑‍💻 Tech Stack

### Frontend:
- **Next.js** (App Router)
- **Tailwind CSS**
- **ApexCharts / Chart.js**
- **Framer Motion**
- **NextAuth.js** for authentication

### Backend:
- **Node.js** + **Express.js**
- **Twelve Data API**
- **News API**

---

## 📂 Project Structure
FYNTRA/
├── backend/
│   ├── index.js
│   ├── routes/
│   └── controllers/
├── frontend/
│   ├── app/
│   ├── components/
│   ├── pages/
│   └── public/
├── .env.local
├── .gitignore
└── README.md
---

## 🛠️ Installation & Setup

### 1. Clone the repository

git clone https://github.com/kaybe005/Fyntra.git
cd Fyntra

### 2. Backend Setup
cd backend
npm install
npm run dev



3. Frontend Setup
cd ../frontend
npm install


Create a .env.local file in frontend/ with:

NEXT_PUBLIC_TWELVE_DATA_API_KEY=your_twelve_data_key
NEXTAUTH_URL=https://fyntra.vercel.app
NEXTAUTH_SECRET=your_generated_secret
GITHUB_ID=your_github_oauth_id
GITHUB_SECRET=your_github_oauth_secret

Run the frontend:
npm run dev



🌐 Deployment

This app is deployed on Vercel. To deploy:
	1.	Push frontend to GitHub.
	2.	Connect the repo to Vercel.
	3.	Add all environment variables under:
Project → Settings → Environment Variables
	4.	Trigger a build.




 📈 Roadmap / To-Do
	•	✅ Build & deploy frontend + backend
	•	✅ GitHub OAuth authentication
	•	✅ Live stock chart integration
	•	✅ Financial news feed with loaders
	•	🕓 Add MongoDB for storing user searches
	•	🕓 Integrate Reddit API for sentiment
	•	🕓 Add AI-powered summaries (LangChain + OpenAI)
	•	🕓 Add earnings reports + financial ratios
	•	🕓 Store embeddings using Pinecone or Weaviate
	•	🕓 User history and portfolio tracking


// I will be integrating LangChain later on to add AI-powered summaries.

 🧑 Author

Kalash Bijukchhe, 19
Nepali 🇳🇵 student & full-stack developer in Sydney 🇦🇺
Loves tech, stocks, and building real-world apps.

⭐️ Show Your Support

If you liked the project:
	•	🌟 Star this repo
	•	🍴 Fork and play with it
	•	🧵 Share feedback or feature ideas


