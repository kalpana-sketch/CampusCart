import { Link } from 'react-router';
import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import type { Item } from '../data/mockData.js';
import { useWishlist } from '../context/WishlistContext.js';
import { useAuth } from '../context/AuthContext.js';
import { useNavigate } from 'react-router';

interface ItemCardProps {
  item: Item;
  index: number;
}

export function ItemCard({ item, index }: ItemCardProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const itemId = item._id || item.id;
  const isLiked = isInWishlist(itemId);

  const handleWishlistClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    await toggleWishlist(itemId);
  };

  const seller = item.sellerId || (item as any).seller || { name: 'Member', avatar: 'U' };
  const sellerName = seller.name || 'Member';
  const sellerAvatar = seller.profileImage ? seller.profileImage : (seller.avatar || sellerName.charAt(0));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group"
    >
      <Link to={`/item/${itemId}`}>
        <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-neutral-200/50 dark:shadow-black/20 hover:shadow-xl hover:shadow-blue-500/20 dark:hover:shadow-blue-500/10">
          {/* Image */}
          <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900">
            <motion.img
              src={item.images?.[0] || 'https://via.placeholder.com/400?text=No+Image'}
              onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400?text=Error+Loading+Image'; }}
              alt={item.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            />
            
            {/* Donation Badge */}
            {(item.isDonation || item.price === 0) && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.05 + 0.2 }}
                className="absolute top-3 left-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg backdrop-blur-sm"
              >
                FREE
              </motion.div>
            )}

            {/* Like Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleWishlistClick}
              className={`absolute top-3 right-3 p-2 backdrop-blur-md rounded-full transition-all shadow-lg border border-white/20 ${
                isLiked
                  ? 'bg-red-50/90 dark:bg-red-950/70 opacity-100'
                  : 'bg-white/80 dark:bg-black/40 opacity-0 group-hover:opacity-100'
              }`}
            >
              <Heart
                className={`w-4 h-4 ${
                  isLiked
                    ? 'fill-red-500 text-red-500'
                    : 'text-neutral-600 dark:text-neutral-400'
                }`}
              />
            </motion.button>

            {/* Condition Badge */}
            <div className="absolute bottom-3 left-3 bg-white/80 dark:bg-black/40 backdrop-blur-md text-xs font-medium px-3 py-1.5 rounded-full text-neutral-700 dark:text-neutral-200 border border-white/20 shadow-lg">
              {item.condition || 'New'}
            </div>
          </div>

          {/* Content */}
          <div className="p-4 bg-gradient-to-b from-white/60 to-white/40 dark:from-white/5 dark:to-white/[0.02] backdrop-blur-sm">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-neutral-900 dark:text-white line-clamp-2 flex-1">
                {item.title}
              </h3>
              <div className="text-right">
                {(item.isDonation || item.price === 0) ? (
                  <span className="text-lg font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 bg-clip-text text-transparent">
                    Free
                  </span>
                ) : (
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent">
                    ${item.price}
                  </span>
                )}
              </div>
            </div>

            <p className="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3">
              {item.description}
            </p>

            {/* Seller Info */}
            <div className="flex items-center gap-2 pt-3 border-t border-white/20 dark:border-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-lg overflow-hidden">
                {seller.profileImage ? (
                  <img src={seller.profileImage} alt={sellerName} className="w-full h-full object-cover" />
                ) : (
                  sellerAvatar
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-neutral-900 dark:text-white truncate">
                  {sellerName}
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate">
                  {seller.email || 'Verified Student'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

