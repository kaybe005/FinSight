import express from "express";
import { getWatchlist, addToWatchlist, removeFromWatchlist } from "../controllers/Watchlist.js";

const router = express.Router();

router.get("/:userEmail", getWatchlist);
router.post("/add", addToWatchlist);
router.post("/remove", removeFromWatchlist);

export default router;
