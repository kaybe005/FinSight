import express from 'express';
import dotenv from 'dotenv';
import stockRoutes from './routes/stockRoutes.js';
import cors from 'cors';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5005;

const allowedOrigins = ['https://fyntra.vercel.app'];


app.use(cors(
    {origin: 'allowedOrigins',
        credentials: true
    }
));

app.use(express.json());

app.use('/api', stockRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
