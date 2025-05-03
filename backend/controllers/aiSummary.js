import dotenv from "dotenv";
dotenv.config();

import { PromptTemplate } from "@langchain/core/prompts";
import { LLMChain } from "langchain/chains";
import { ChatGroq} from "@langchain/groq";

export const getAISummary = async (req, res) => {
    const { ticker, news, ratios } = req.body;

    try {
        const model = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY,
            model: "llama3-70b-8192",
        });

        const template = `
            You are a professional financial analyst AI.
            Stock: {ticker}
            News Headlines:
            {news}
            Financial Ratios:
            {ratios}
            Write a 3–4 sentence investment summary. Be concise, insightful, and professional.`;
   
        const prompt = new PromptTemplate({
            template,
            inputVariables: ["ticker", "news", "ratios"],
        });

        const chain = new LLMChain({ llm: model, prompt });

        const result = await chain.call({ ticker, news, ratios });
        console.log("Generated summary:", result);
        res.status(200).json({ summary: result?.text ?? "No summary generated." });
    } catch (error) {
        console.error("Error generating summary:", error);
        res.status(500).json({ error: error.message });
    }
};