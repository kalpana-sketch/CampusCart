<<<<<<< HEAD
import { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import api from '../services/api.js';

export interface Review {
  _id: string;
  seller: string;
  reviewer: {
    _id: string;
    name: string;
  };
  rating: number;
  text: string;
  createdAt: string;
}

interface ReviewContextType {
  fetchReviews: (sellerId: string) => Promise<Review[]>;
  addReview: (sellerId: string, rating: number, text: string) => Promise<void>;
=======
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Review {
  id: string;
  itemId: string;
  author: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
}

interface ReviewContextType {
  getReviews: (itemId: string) => Review[];
  addReview: (itemId: string, rating: number, comment: string, author: string, avatar: string) => void;
  getAverageRating: (itemId: string) => number;
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

<<<<<<< HEAD
export function ReviewProvider({ children }: { children: ReactNode }) {
  const fetchReviews = async (sellerId: string) => {
    try {
      const response = await api.get(`/reviews/${sellerId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching reviews:', error);
      return [];
    }
  };

  const addReview = async (sellerId: string, rating: number, text: string) => {
    try {
      await api.post('/reviews', { sellerId, rating, text });
    } catch (error: any) {
      console.error('Error adding review:', error);
      throw new Error(error.response?.data?.message || 'Failed to add review');
    }
  };

  return (
    <ReviewContext.Provider value={{ fetchReviews, addReview }}>
=======
const initialReviews: Review[] = [
  { id: 'r1', itemId: '1', author: 'David Kim', avatar: 'DK', rating: 5, comment: 'Textbook was in perfect condition, exactly as described. Great price too!', date: '2026-02-28' },
  { id: 'r2', itemId: '1', author: 'Olivia Martinez', avatar: 'OM', rating: 4, comment: 'A little highlighting on a few pages but overall very clean. Good deal.', date: '2026-02-27' },
  { id: 'r3', itemId: '2', author: 'Nina Patel', avatar: 'NP', rating: 5, comment: 'Calculator works flawlessly. Saved me so much money compared to the bookstore!', date: '2026-02-28' },
  { id: 'r4', itemId: '3', author: 'James Park', avatar: 'JP', rating: 5, comment: 'Amazing laptop, runs super fast. Emily was very helpful with the handoff.', date: '2026-02-26' },
  { id: 'r5', itemId: '3', author: 'Alex Thompson', avatar: 'AT', rating: 4, comment: 'Great machine for the price. Minor scuff on the bottom but who cares.', date: '2026-02-25' },
  { id: 'r6', itemId: '3', author: 'Sophia Lee', avatar: 'SL', rating: 5, comment: 'Battery life is incredible. Best purchase this semester.', date: '2026-02-27' },
  { id: 'r7', itemId: '4', author: 'Marcus Johnson', avatar: 'MJ', rating: 4, comment: 'Fridge keeps things cold and fits perfectly under my desk. Happy with it!', date: '2026-02-28' },
  { id: 'r8', itemId: '5', author: 'Chris Anderson', avatar: 'CA', rating: 5, comment: 'Free goggles and lab coat? Rachel is the best. Everything was clean and ready to use.', date: '2026-03-01' },
  { id: 'r9', itemId: '6', author: 'Emily Watson', avatar: 'EW', rating: 5, comment: 'These books are lifesavers for orgo. Worth every penny.', date: '2026-02-24' },
  { id: 'r10', itemId: '7', author: 'Sarah Chen', avatar: 'SC', rating: 4, comment: 'Nice lamp, the USB port is super convenient. Brightness could be better on max.', date: '2026-02-27' },
  { id: 'r11', itemId: '8', author: 'Michael Rodriguez', avatar: 'MR', rating: 5, comment: 'Mat is thick and comfortable. Cork blocks are high quality.', date: '2026-02-26' },
  { id: 'r12', itemId: '9', author: 'Rachel Kumar', avatar: 'RK', rating: 5, comment: 'iPad is in pristine condition. Apple Pencil makes taking notes so easy.', date: '2026-02-23' },
  { id: 'r13', itemId: '10', author: 'Sophia Lee', avatar: 'SL', rating: 4, comment: 'Comfy futon, easy to fold out. A bit heavy to carry but worth it.', date: '2026-02-22' },
  { id: 'r14', itemId: '11', author: 'David Kim', avatar: 'DK', rating: 5, comment: 'Classic textbook, can\'t go wrong. Highlighting is actually helpful.', date: '2026-02-21' },
  { id: 'r15', itemId: '12', author: 'Emily Watson', avatar: 'EW', rating: 5, comment: 'Marcus is so generous! Hoodie is super cozy and the tees fit great.', date: '2026-02-20' },
];

export function ReviewProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(() => {
    const stored = localStorage.getItem('campuscart_reviews');
    return stored ? JSON.parse(stored) : initialReviews;
  });

  useEffect(() => {
    localStorage.setItem('campuscart_reviews', JSON.stringify(reviews));
  }, [reviews]);

  const getReviews = (itemId: string) => reviews.filter(r => r.itemId === itemId);

  const addReview = (itemId: string, rating: number, comment: string, author: string, avatar: string) => {
    const newReview: Review = {
      id: `r${Date.now()}`,
      itemId,
      author,
      avatar,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };
    setReviews(prev => [newReview, ...prev]);
  };

  const getAverageRating = (itemId: string) => {
    const itemReviews = getReviews(itemId);
    if (itemReviews.length === 0) return 0;
    return itemReviews.reduce((sum, r) => sum + r.rating, 0) / itemReviews.length;
  };

  return (
    <ReviewContext.Provider value={{ getReviews, addReview, getAverageRating }}>
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReviews must be used within ReviewProvider');
  return context;
}
