import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../services/api.js';
import { useAuth } from './AuthContext.js';
import { type Item } from '../data/mockData.js';

interface WishlistContextType {
  wishlist: Item[];
  addToWishlist: (itemId: string) => Promise<void>;
  removeFromWishlist: (itemId: string) => Promise<void>;
  toggleWishlist: (itemId: string) => Promise<void>;
  isInWishlist: (itemId: string) => boolean;
  loading: boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchWishlist();
    } else {
      setWishlist([]);
    }
  }, [isAuthenticated, user]);

  const fetchWishlist = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/wishlist/${user?.id}`);
      // Assuming backend populates itemId
      setWishlist(response.data.map((item: any) => item.itemId));
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = useCallback(async (itemId: string) => {
    if (!isAuthenticated) return;
    try {
      await api.post('/wishlist/add', { itemId });
      fetchWishlist(); // Refresh to get full object
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  }, [isAuthenticated]);

  const removeFromWishlist = useCallback(async (itemId: string) => {
    if (!isAuthenticated) return;
    try {
      await api.delete(`/wishlist/remove/${itemId}`);
      setWishlist(prev => prev.filter(item => (item._id || item.id) !== itemId));
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  }, [isAuthenticated]);

  const toggleWishlist = useCallback(async (itemId: string) => {
    if (wishlist.some(i => (i._id || i.id) === itemId)) {
      await removeFromWishlist(itemId);
    } else {
      await addToWishlist(itemId);
    }
  }, [wishlist, addToWishlist, removeFromWishlist]);

  const isInWishlist = useCallback((itemId: string) => {
    return wishlist.some(i => (i._id || i.id) === itemId);
  }, [wishlist]);

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist, toggleWishlist, isInWishlist, loading }}>
      {children}
    </WishlistContext.Provider>
  );
}



export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
}
