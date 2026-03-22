import { useParams, useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Calendar, Package, MessageCircle, Heart, Share2, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import api from '../services/api';
import { useWishlist } from '../context/WishlistContext';
import { useChat } from '../context/ChatContext';
import { useAuth } from '../context/AuthContext';
import { ReviewSection } from '../components/ReviewSection';

export function ItemDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { sendMessage } = useChat();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await api.get(`/items/${id}`);
      setItem(response.data);
    } catch (error) {
      console.error('Error fetching item:', error);
    } finally {
      setLoading(false);
    }
  };

  const isLiked = item ? isInWishlist(item._id || item.id) : false;

  const handleContactSeller = async () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (!item) return;
    
    // For demo, we'll just navigate to chat. In a real app, you'd send a message or start a thread.
    navigate(`/chat?thread=${item.sellerId._id}_${item._id}`, {
      state: {
        sellerId: item.sellerId._id,
        sellerName: item.sellerId.name,
        sellerAvatar: item.sellerId.profileImage || item.sellerId.name?.charAt(0) || 'U',
        itemId: item._id,
        itemTitle: item.title,
        itemImage: item.images?.[0] || 'https://via.placeholder.com/400',
        itemPrice: item.price,
        isDonation: item.isDonation
      }
    });
  };

  const handleToggleWishlist = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    if (item) toggleWishlist(item._id || item.id);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">
            Item not found
          </h2>
          <button
            onClick={() => navigate('/browse')}
            className="text-blue-600 dark:text-blue-500 hover:underline"
          >
            Back to Browse
          </button>
        </div>
      </div>
    );
  }

  const seller = item.sellerId || { name: 'Unknown Seller', profileImage: '' };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ x: -4 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 shadow-2xl border border-white/20">
              <img
                src={item.images?.[0] || 'https://via.placeholder.com/400?text=No+Image'}
                onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/400?text=Error+Loading+Image'; }}
                alt={item.title}
                className="w-full h-full object-cover"
              />
              {item.price === 0 && (
                <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full font-semibold shadow-lg backdrop-blur-sm">
                  FREE ITEM
                </div>
              )}
            </div>
          </motion.div>

          {/* Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Price & Title */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
              {item.price === 0 ? (
                <div className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 dark:from-green-500 dark:to-emerald-500 bg-clip-text text-transparent mb-2">
                  Free
                </div>
              ) : (
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 bg-clip-text text-transparent mb-2">
                  ${item.price}
                </div>
              )}
              <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-3">
                {item.title}
              </h1>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full text-sm font-medium shadow-md">
                  {item.category}
                </span>
                <span className="px-3 py-1 bg-white/60 dark:bg-white/10 backdrop-blur-md text-neutral-600 dark:text-neutral-400 rounded-full text-sm font-medium border border-white/20">
                  {item.condition || 'New'}
                </span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-lg">
              <h2 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">
                Description
              </h2>
              <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Item Details */}
            <div className="space-y-3 p-6 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
              <DetailRow
                icon={<Package className="w-5 h-5" />}
                label="Condition"
                value={item.condition || 'Good'}
              />
              <DetailRow
                icon={<Calendar className="w-5 h-5" />}
                label="Posted"
                value={new Date(item.createdAt).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              />
              <DetailRow
                icon={<MapPin className="w-5 h-5" />}
                label="Location"
                value="On Campus"
              />
            </div>

            {/* Seller Info */}
            <div className="p-6 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg">
              <h2 className="font-semibold text-lg mb-4 text-neutral-900 dark:text-white">
                Seller Information
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-lg overflow-hidden">
                  {seller.profileImage ? (
                    <img src={seller.profileImage} alt={seller.name} className="w-full h-full object-cover" />
                  ) : (
                    seller.name?.charAt(0) || 'U'
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-neutral-900 dark:text-white">
                    {seller.name}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    Student • {seller.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleContactSeller}
                className="relative flex-1 px-6 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 text-white shadow-lg overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                <MessageCircle className="w-5 h-5 relative z-10" />
                <span className="relative z-10">Contact Seller</span>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleToggleWishlist}
                className={`p-4 rounded-xl border-2 transition-all backdrop-blur-md shadow-lg ${
                  isLiked
                    ? 'bg-red-50/80 dark:bg-red-950/50 border-red-500'
                    : 'bg-white/50 dark:bg-white/5 border-white/20 dark:border-white/10'
                }`}
              >
                <Heart
                  className={`w-6 h-6 ${
                    isLiked
                      ? 'fill-red-500 text-red-500'
                      : 'text-neutral-600 dark:text-neutral-400'
                  }`}
                />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 bg-white/50 dark:bg-white/5 backdrop-blur-md border-2 border-white/20 dark:border-white/10 rounded-xl shadow-lg"
              >
                <Share2 className="w-6 h-6 text-neutral-600 dark:text-neutral-400" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Reviews Section */}
        <ReviewSection itemId={item._id || item.id} />
      </div>
    </div>
  );
}

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="text-neutral-400">{icon}</div>
      <div className="flex-1">
        <span className="text-sm text-neutral-500 dark:text-neutral-500">{label}</span>
        <p className="font-medium text-neutral-900 dark:text-white">{value}</p>
      </div>
    </div>
  );
}