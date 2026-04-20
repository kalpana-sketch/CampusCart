import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Search, SlidersHorizontal, Loader2 } from 'lucide-react';
import { ItemCard } from '../components/ItemCard.js';
import { categories, type Item } from '../data/mockData.js';
import api from '../services/api.js';

export function Browse() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showDonationsOnly, setShowDonationsOnly] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await api.get('/items');
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDonation = !showDonationsOnly || item.isDonation || item.price === 0;
    return matchesCategory && matchesSearch && matchesDonation;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Browse Marketplace
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            {loading ? 'Discovering items...' : `Discover ${items.length} items from your campus community`}
          </p>
        </motion.div>

        {/* Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6 sticky top-20 z-40 bg-gradient-to-br from-neutral-50/90 via-blue-50/90 to-purple-50/90 dark:from-neutral-950/90 dark:via-blue-950/90 dark:to-purple-950/90 backdrop-blur-md p-4 rounded-2xl shadow-sm border border-white/20 dark:border-white/10"
        >
          {/* Search */}
          <div className="relative mb-4">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
            <input
              type="text"
              placeholder="Search for items..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/40 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-neutral-900 dark:text-white placeholder-neutral-400 shadow-lg"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-[140px]">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full appearance-none bg-white dark:bg-neutral-900 border border-white/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-700 dark:text-neutral-300 shadow-sm cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">{cat}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>

            <div className="relative flex-1 min-w-[140px]">
              <select
                value={showDonationsOnly ? 'free' : 'all'}
                onChange={(e) => setShowDonationsOnly(e.target.value === 'free')}
                className="w-full appearance-none bg-white dark:bg-neutral-900 border border-white/20 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-700 dark:text-neutral-300 shadow-sm cursor-pointer"
              >
                <option value="all" className="text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">All Items</option>
                <option value="free" className="text-neutral-900 dark:text-white bg-white dark:bg-neutral-900">Free Items Only</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-neutral-400">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
              </div>
            </div>

            <div className="text-sm font-medium text-neutral-500 dark:text-neutral-400 ml-auto whitespace-nowrap">
              {filteredItems.length} {filteredItems.length === 1 ? 'item' : 'items'} found
            </div>
          </div>
        </motion.div>

        {/* Items Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin" />
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item, index) => (
              <ItemCard key={item._id || item.id} item={item} index={index} />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16 bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg"
          >
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
              <Search className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">
              No items found
            </h3>
            <p className="text-neutral-600 dark:text-neutral-400">
              Try adjusting your search or filters
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}