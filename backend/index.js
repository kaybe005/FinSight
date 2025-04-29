import express from 'express';
import dotenv from 'dotenv';
import stockRoutes from './routes/stockRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

app.use(cors(
    {origin: 'https://fyntra.vercel.app',
        methods: ['GET', 'POST',],
        credentials: true
    }
));

app.use(express.json());

app.use('/api', stockRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
