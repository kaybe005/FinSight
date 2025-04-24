import express from 'express';
import { getStockInfo } from '../controllers/stockController.js';

const router = express.Router();

router.get('/stocks/:symbol', getStockInfo);

export default router;