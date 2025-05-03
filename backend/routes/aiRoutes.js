import express from 'express';
import { getAISummary } from '../controllers/aiSummary.js';

const router = express.Router();

router.post('/ai/summary', getAISummary);

export default router;