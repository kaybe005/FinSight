import express from 'express';
import dotenv from 'dotenv';
import stockRoutes from './routes/stockRoutes.js';
import cors from 'cors';
import aiRoutes from './routes/aiRoutes.js';
import watchlistRoutes from './routes/watchlistRoutes.js';
import mongoose from 'mongoose';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(express.json());


app.use(cors({
  origin: '*',
  credentials: true,
}));

app.use('/api', stockRoutes);

app.use('/api', aiRoutes);

app.use('/api/watchlist', watchlistRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
