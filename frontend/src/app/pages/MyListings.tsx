import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router';
import {
  Plus, Search, ShoppingBag, Eye, MessageCircle, CheckCircle2, Clock, 
  TrendingUp, DollarSign, Package, Heart, ArrowRight, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import api from '../services/api.js';

type ListingStatus = 'active' | 'sold' | 'expired';
type FilterTab = 'all' | ListingStatus;
type SortOption = 'newest' | 'oldest' | 'price-high' | 'price-low' | 'views';

interface MyListing {
  _id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  condition: string;
  images: string[];
  createdAt: string;
  status: ListingStatus;
  views: number;
  inquiries: number;
  favorites: number;
}

const statusConfig = {
  active: {
    label: 'Active',
    icon: CheckCircle2,
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-500/10 border-green-500/20',
    dot: 'bg-green-500',
  },
  sold: {
    label: 'Sold',
    icon: DollarSign,
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-500/10 border-blue-500/20',
    dot: 'bg-blue-500',
  },
  expired: {
    label: 'Expired',
    icon: Clock,
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-500/10 border-orange-500/20',
    dot: 'bg-orange-500',
  },
};

export function MyListings() {
  const { user, isAuthenticated } = useAuth();
  const { isInWishlist } = useWishlist();

  const [listings, setListings] = useState<MyListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserListings();
    }
  }, [isAuthenticated, user]);

  const fetchUserListings = async () => {
    try {
      const response = await api.get(`/items/user/${user?.id}`);
      // Adding some default values for metrics since they aren't in the schema yet
      const processedListings = response.data.map((l: any) => ({
        ...l,
        status: l.status || 'active',
        views: Math.floor(Math.random() * 100), // Random for demo
        inquiries: Math.floor(Math.random() * 10),
        favorites: Math.floor(Math.random() * 15)
      }));
      setListings(processedListings);
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsSold = async (id: string) => {
    try {
      await api.put(`/items/${id}`, { status: 'sold' });
      setListings(prev => prev.map(l => l._id === id ? { ...l, status: 'sold' } : l));
    } catch (error) {
      console.error('Error marking as sold:', error);
    }
  };

  const handleReactivate = async (id: string) => {
    try {
      await api.put(`/items/${id}`, { status: 'active' });
      setListings(prev => prev.map(l => l._id === id ? { ...l, status: 'active' } : l));
    } catch (error) {
      console.error('Error reactivating:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/items/${id}`);
      setListings(prev => prev.filter(l => l._id !== id));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting listing:', error);
    }
  };

  // Stats
  const stats = useMemo(() => ({
    total: listings.length,
    active: listings.filter(l => l.status === 'active').length,
    sold: listings.filter(l => l.status === 'sold').length,
    expired: listings.filter(l => l.status === 'expired').length,
    totalViews: listings.reduce((sum, l) => sum + (l.views || 0), 0),
    totalRevenue: listings.filter(l => l.status === 'sold').reduce((sum, l) => sum + l.price, 0),
  }), [listings]);

  // Filtered & sorted listings
  const filteredListings = useMemo(() => {
    let result = [...listings];

    if (activeFilter !== 'all') {
      result = result.filter(l => l.status === activeFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(l =>
        l.title.toLowerCase().includes(q) ||
        l.category.toLowerCase().includes(q) ||
        l.description.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'views':
        result.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
    }

    return result;
  }, [listings, activeFilter, searchQuery, sortBy]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-10 shadow-2xl text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Sign In Required</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">Please sign in to manage your listings.</p>
          <Link to="/login">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-8 py-3 rounded-xl font-semibold text-white shadow-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-2">Sign In <ArrowRight className="w-5 h-5" /></span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
      </div>
    );
  }

  const filterTabs = [
    { id: 'all' as FilterTab, label: 'All Listings', count: stats.total },
    { id: 'active' as FilterTab, label: 'Active', count: stats.active },
    { id: 'sold' as FilterTab, label: 'Sold', count: stats.sold },
    { id: 'expired' as FilterTab, label: 'Expired', count: stats.expired },
  ];

  const sortOptions = [
    { id: 'newest' as SortOption, label: 'Newest First' },
    { id: 'oldest' as SortOption, label: 'Oldest First' },
    { id: 'price-high' as SortOption, label: 'Price: High to Low' },
    { id: 'price-low' as SortOption, label: 'Price: Low to High' },
    { id: 'views' as SortOption, label: 'Most Viewed' },
  ];

  return (
    <div className="min-h-screen py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
              My <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Listings</span>
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mt-1">Manage and track all your marketplace items</p>
          </div>
          <Link to="/post">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="relative px-6 py-3 rounded-xl font-semibold text-white shadow-lg overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              <span className="relative z-10 flex items-center gap-2"><Plus className="w-5 h-5" /> New Listing</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Active Listings', value: stats.active, icon: Package, gradient: 'from-green-500 to-emerald-600', iconBg: 'bg-green-500/10' },
            { label: 'Items Sold', value: stats.sold, icon: CheckCircle2, gradient: 'from-blue-500 to-blue-600', iconBg: 'bg-blue-500/10' },
            { label: 'Total Views', value: stats.totalViews, icon: Eye, gradient: 'from-purple-500 to-purple-600', iconBg: 'bg-purple-500/10' },
            { label: 'Revenue Earned', value: `$${stats.totalRevenue}`, icon: TrendingUp, gradient: 'from-amber-500 to-orange-600', iconBg: 'bg-amber-500/10' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-5 shadow-lg">
              <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center mb-3`}>
                <stat.icon className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-neutral-900 dark:text-white">{stat.value}</p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl p-4 sm:p-5 mb-6">
          <div className="flex flex-wrap gap-2 mb-4">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  activeFilter === tab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/20 text-neutral-600 dark:text-neutral-400'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                placeholder="Search your listings..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-xl text-neutral-900 dark:text-white"
              />
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}

              className="px-4 py-3 rounded-xl bg-white dark:bg-neutral-900 border border-white/20 dark:border-white/10 text-neutral-700 dark:text-neutral-300 shadow-sm cursor-pointer"
            >
              {sortOptions.map(opt => <option key={opt.id} value={opt.id}>{opt.label}</option>)}

            </select>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredListings.length > 0 ? (
              filteredListings.map((listing) => {
                const sc = statusConfig[listing.status] || statusConfig.active;
                return (
                  <motion.div
                    key={listing._id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg overflow-hidden"
                  >
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative sm:w-48 h-48 sm:h-auto overflow-hidden shrink-0">
                        <img src={listing.images[0] || 'https://via.placeholder.com/400'} alt={listing.title} className="w-full h-full object-cover" />
                        <div className={`absolute top-2 left-2 px-2 py-1 rounded-lg text-xs font-bold backdrop-blur-md border ${sc.bg} ${sc.color}`}>
                          {sc.label}
                        </div>
                      </div>
                      <div className="flex-1 p-5 flex flex-col">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link to={`/item/${listing._id}`} className="text-lg font-bold text-neutral-900 dark:text-white hover:text-blue-500">{listing.title}</Link>
                            <p className="text-sm text-neutral-500 mt-1 line-clamp-1">{listing.description}</p>
                          </div>
                          <span className="text-xl font-bold text-blue-600">${listing.price}</span>
                        </div>
                        <div className="flex gap-4 mt-4 text-xs text-neutral-500">
                          <span className="flex items-center gap-1"><Eye className="w-3" /> {listing.views} views</span>
                          <span className="flex items-center gap-1"><MessageCircle className="w-3" /> {listing.inquiries} inquiries</span>
                          <span className="flex items-center gap-1"><Heart className="w-3" /> {listing.favorites} saves</span>
                        </div>
                        <div className="flex gap-2 mt-auto pt-4">
                          {listing.status === 'active' && (
                            <button onClick={() => handleMarkAsSold(listing._id)} className="px-3 py-1.5 bg-blue-500/10 text-blue-500 rounded-lg text-xs font-bold border border-blue-500/20">Mark Sold</button>
                          )}
                          {listing.status === 'sold' && (
                            <button onClick={() => handleReactivate(listing._id)} className="px-3 py-1.5 bg-green-500/10 text-green-500 rounded-lg text-xs font-bold border border-green-500/20">Reactivate</button>
                          )}
                          <button onClick={() => setDeleteConfirm(listing._id)} className="px-3 py-1.5 bg-red-500/10 text-red-500 rounded-lg text-xs font-bold ml-auto">Delete</button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="text-center py-20 bg-white/20 rounded-2xl">
                <p className="text-neutral-500">No listings found matching your criteria.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {deleteConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl max-w-sm w-full shadow-2xl">
              <h3 className="text-lg font-bold mb-2">Delete Listing?</h3>
              <p className="text-sm text-neutral-500 mb-6">This action is permanent and cannot be undone.</p>
              <div className="flex gap-3">
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800">Cancel</button>
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 py-2 rounded-xl bg-red-600 text-white">Delete</button>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
