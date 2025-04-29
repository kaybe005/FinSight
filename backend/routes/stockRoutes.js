import express from 'express';
import { getStockInfo, getChartData } from '../controllers/stockController.js';

const router = express.Router();

router.get('/stock/:symbol', getStockInfo);

router.get('/chart', getChartData);

export default router;
