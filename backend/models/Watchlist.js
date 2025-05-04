import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
  userEmail: { type: String, required: true, unique: true },
  symbols: [String],
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
export default Watchlist;
