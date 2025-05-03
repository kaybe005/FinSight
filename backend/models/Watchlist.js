import mongoose from 'mongoose';

const watchlistSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    symbols: { type: [String], default: [] },
});

const Watchlist = mongoose.model('Watchlist', watchlistSchema);
export default mongoose.model('Watchlist', watchlistSchema);