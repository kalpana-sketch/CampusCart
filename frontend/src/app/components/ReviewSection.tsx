import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Send } from 'lucide-react';
import { useReviews } from '../context/ReviewContext';
import { useAuth } from '../context/AuthContext';

function StarRating({ rating, onRate, interactive = false, size = 'md' }: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
  size?: 'sm' | 'md';
}) {
  const [hovered, setHovered] = useState(0);
  const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';

  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(star => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          onClick={() => onRate?.(star)}
          onMouseEnter={() => interactive && setHovered(star)}
          onMouseLeave={() => interactive && setHovered(0)}
          className={interactive ? 'cursor-pointer transition-transform hover:scale-110' : 'cursor-default'}
        >
          <Star
            className={`${sizeClass} transition-colors ${
              star <= (hovered || rating)
                ? 'fill-amber-400 text-amber-400'
                : 'text-neutral-300 dark:text-neutral-600'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

export function ReviewSection({ itemId }: { itemId: string }) {
  const { getReviews, addReview, getAverageRating } = useReviews();
  const { isAuthenticated, user } = useAuth();
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const reviews = getReviews(itemId);
  const avgRating = getAverageRating(itemId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRating === 0 || !newComment.trim()) return;
    addReview(itemId, newRating, newComment.trim(), user?.name || 'Anonymous', user?.avatar || '??');
    setNewRating(0);
    setNewComment('');
    setShowForm(false);
  };

  const ratingDistribution = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: reviews.length > 0 ? (reviews.filter(r => r.rating === star).length / reviews.length) * 100 : 0,
  }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-10"
    >
      <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-lg text-neutral-900 dark:text-white">
            Reviews ({reviews.length})
          </h2>
          {isAuthenticated && !showForm && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowForm(true)}
              className="px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md transition-all"
            >
              Write a Review
            </motion.button>
          )}
        </div>

        {/* Rating Summary */}
        {reviews.length > 0 && (
          <div className="flex flex-col sm:flex-row gap-6 mb-6 p-4 bg-white/30 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/15 dark:border-white/5">
            {/* Average */}
            <div className="flex flex-col items-center justify-center gap-1 min-w-[100px]">
              <span className="text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                {avgRating.toFixed(1)}
              </span>
              <StarRating rating={Math.round(avgRating)} size="sm" />
              <span className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                {reviews.length} review{reviews.length !== 1 ? 's' : ''}
              </span>
            </div>
            {/* Distribution */}
            <div className="flex-1 space-y-1.5">
              {ratingDistribution.map(({ star, count, pct }) => (
                <div key={star} className="flex items-center gap-2 text-sm">
                  <span className="w-3 text-neutral-500 dark:text-neutral-400">{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <div className="flex-1 h-2 bg-neutral-200/60 dark:bg-neutral-700/40 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ duration: 0.6, delay: 0.1 * star }}
                      className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"
                    />
                  </div>
                  <span className="w-5 text-right text-neutral-400 dark:text-neutral-500">{count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Review Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={handleSubmit}
              className="mb-6 overflow-hidden"
            >
              <div className="p-4 bg-white/30 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/15 dark:border-white/5 space-y-4">
                <div>
                  <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                    Your Rating
                  </label>
                  <StarRating rating={newRating} onRate={setNewRating} interactive size="md" />
                </div>
                <div>
                  <label className="block text-sm text-neutral-700 dark:text-neutral-300 mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Share your experience with this item..."
                    rows={3}
                    className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all resize-none"
                  />
                </div>
                <div className="flex gap-2 justify-end">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setShowForm(false); setNewRating(0); setNewComment(''); }}
                    className="px-4 py-2 rounded-xl text-sm font-medium text-neutral-600 dark:text-neutral-400 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 hover:bg-white/80 dark:hover:bg-white/10 transition-all"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={newRating === 0 || !newComment.trim()}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Send className="w-4 h-4" />
                    Submit
                  </motion.button>
                </div>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Review List */}
        {reviews.length === 0 ? (
          <div className="text-center py-8 text-neutral-500 dark:text-neutral-400">
            <Star className="w-10 h-10 mx-auto mb-2 text-neutral-300 dark:text-neutral-600" />
            <p>No reviews yet. Be the first to share your experience!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {reviews.map((review, i) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="p-4 bg-white/30 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/15 dark:border-white/5 hover:bg-white/50 dark:hover:bg-white/8 transition-all"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-md shrink-0">
                    {review.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span className="font-medium text-neutral-900 dark:text-white">
                        {review.author}
                      </span>
                      <span className="text-xs text-neutral-400 dark:text-neutral-500">
                        {new Date(review.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                    <div className="mt-1 mb-2">
                      <StarRating rating={review.rating} size="sm" />
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-400 text-sm leading-relaxed">
                      {review.comment}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
