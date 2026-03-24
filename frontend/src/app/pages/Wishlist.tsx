import { motion, AnimatePresence } from 'motion/react';
import { Heart, ShoppingBag, Trash2, Loader2 } from 'lucide-react';
import { Link } from 'react-router';
<<<<<<< HEAD
import { ItemCard } from '../components/ItemCard.js';
import { useWishlist } from '../context/WishlistContext.js';
=======
import { ItemCard } from '../components/ItemCard';
import { useWishlist } from '../context/WishlistContext';
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242

export function Wishlist() {
  const { wishlist: wishlistItems, removeFromWishlist, loading } = useWishlist();

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl shadow-lg">
                <Heart className="w-6 h-6 text-white fill-white" />
              </div>
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                My Wishlist
              </h1>
            </div>
            <p className="text-neutral-600 dark:text-neutral-400">
              {loading ? 'Loading wishlist...' : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'item' : 'items'} saved`}
            </p>
          </div>
          <Link to="/browse">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center gap-2 px-5 py-2.5 overflow-hidden rounded-xl font-medium text-white shadow-lg group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <ShoppingBag className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Browse More</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats Bar */}
        {!loading && wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8"
          >
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Items</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-red-500 to-pink-600 bg-clip-text text-transparent">
                {wishlistItems.length}
              </p>
            </div>
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Total Value</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${wishlistItems.reduce((sum, item) => sum + item.price, 0)}
              </p>
            </div>
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl p-5 rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-1">Free Items</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                {wishlistItems.filter(i => i.isDonation || i.price === 0).length}
              </p>
            </div>
          </motion.div>
        )}

        {/* Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item._id || item.id}
                  layout
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                  className="relative group/wish"
                >
                  <ItemCard item={item} index={index} />
                  {/* Remove from Wishlist overlay button */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => removeFromWishlist(item._id || item.id)}
                    className="absolute bottom-20 right-4 z-10 p-2.5 bg-red-500/90 hover:bg-red-600 backdrop-blur-md rounded-full text-white shadow-lg opacity-0 group-hover/wish:opacity-100 transition-opacity border border-red-400/30"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl"
            >
              <Heart className="w-10 h-10 text-white" />
            </motion.div>
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">
              Your wishlist is empty
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8 max-w-md mx-auto">
              Browse items and tap the heart icon to save them here. Your wishlist helps you keep track of items you love!
            </p>
            <Link to="/browse">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3.5 overflow-hidden rounded-xl font-semibold text-white shadow-lg group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-blue-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <span className="relative z-10">Start Browsing</span>
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
}

