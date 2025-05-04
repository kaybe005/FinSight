import Watchlist from "../models/Watchlist.js";

export const getWatchlist = async (req, res) => {
  try {
    const { userEmail } = req.params;
    const watchlist = await Watchlist.findOne({ userEmail });
    res.json(watchlist || { userEmail, symbols: [] });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch watchlist" });
  }
};

export const addToWatchlist = async (req, res) => {
  const { userEmail, symbol } = req.body;
  console.log("📥 Received Add Request", { userEmail, symbol }); 

  if (!userEmail || !symbol) {
    console.error(" Missing userEmail or symbol"); 
    return res.status(400).json({ error: "Missing userEmail or symbol" });
  }

  try {
    let watchlist = await Watchlist.findOne({ userEmail });
    if (!watchlist) {
      watchlist = new Watchlist({ userEmail, symbols: [symbol] });
    } else if (!watchlist.symbols.includes(symbol)) {
      watchlist.symbols.push(symbol);
    }
    await watchlist.save();
    res.status(200).json(watchlist);
  } catch (err) {
    console.error("Error saving watchlist:", err);
    res.status(500).json({ error: "Failed to add to watchlist" });
  }
};

export const removeFromWatchlist = async (req, res) => {
  const { userEmail, symbol } = req.body;

  try {
    const watchlist = await Watchlist.findOne({ userEmail });
    if (!watchlist) return res.status(404).json({ error: "Watchlist not found" });

    watchlist.symbols = watchlist.symbols.filter((s) => s !== symbol);
    await watchlist.save();
    res.json(watchlist);
  } catch (err) {
    res.status(500).json({ error: "Failed to remove from watchlist" });
  }
};
