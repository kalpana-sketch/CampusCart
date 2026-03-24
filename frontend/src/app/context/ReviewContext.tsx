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
}

const ReviewContext = createContext<ReviewContextType | undefined>(undefined);

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
      {children}
    </ReviewContext.Provider>
  );
}

export function useReviews() {
  const context = useContext(ReviewContext);
  if (!context) throw new Error('useReviews must be used within ReviewProvider');
  return context;
}
