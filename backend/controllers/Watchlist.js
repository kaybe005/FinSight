import Watchlist from "../models/Watchlist.js";

export const getWatchlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const watchlist = await Watchlist.findOne({ userId });
    res.json(watchlist || { userId, symbols: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
};

export const addToWatchlist = async (req, res) => {
  const { userId, symbol } = req.body;

  try {
    let watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) {
      watchlist = new Watchlist({ userId, symbols: [symbol] });
    } else if (!watchlist.symbols.includes(symbol)) {
      watchlist.symbols.push(symbol);
    }
    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to add to watchlist" });
  }
};

export const removeFromWatchlist = async (req, res) => {
  const { userId, symbol } = req.body;

  try {
    const watchlist = await Watchlist.findOne({ userId });
    if (!watchlist) return res.status(404).json({ error: "Watchlist not found" });

    watchlist.symbols = watchlist.symbols.filter((s) => s !== symbol);
    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from watchlist" });
  }
};
