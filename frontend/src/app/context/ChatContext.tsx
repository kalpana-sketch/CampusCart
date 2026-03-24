import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import api from '../services/api.js';
import { useAuth } from './AuthContext.js';

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

export interface ChatThread {
  id: string; // The receiver ID (or logic-based ID)
  itemId: string;
  itemTitle: string;
  itemImage: string;
  itemPrice: number;
  isDonation: boolean;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  messages: ChatMessage[];
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

interface ChatContextType {
  threads: ChatThread[];
  activeThreadId: string | null;
  setActiveThreadId: (id: string | null) => void;
  sendMessage: (receiverId: string, itemId: string, text: string) => Promise<void>;
  fetchMessages: (otherUserId: string) => Promise<void>;
  startConversation: (receiverId: string, itemId: string, initialMessage: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeThreadId, setActiveThreadId] = useState<string | null>(null);
  const { user, isAuthenticated } = useAuth();
  const pollingRef = useRef<NodeJS.Timeout | null>(null);

  const fetchConversations = useCallback(async () => {
    if (!isAuthenticated || !user) return;
    try {
      const response = await api.get('/messages/conversations');
      const messages = response.data;
      
      const threadsMap = new Map<string, ChatThread>();

      messages.forEach((msg: any) => {
        const isOwn = msg.senderId._id === user.id;
        const otherUser = isOwn ? msg.receiverId : msg.senderId;
        const item = msg.itemId;

        if (!otherUser || !item) return; // defensive

        const threadId = `${otherUser._id}_${item._id}`;
        
        if (!threadsMap.has(threadId)) {
          threadsMap.set(threadId, {
            id: threadId,
            itemId: item._id,
            itemTitle: item.title,
            itemImage: item.images && item.images.length > 0 ? item.images[0] : 'https://via.placeholder.com/400',
            itemPrice: item.price,
            isDonation: item.isDonation || false,
            sellerId: otherUser._id,
            sellerName: otherUser.name,
            sellerAvatar: otherUser.profileImage || otherUser.name.charAt(0),
            messages: [],
            lastMessage: '',
            lastMessageTime: '',
            unread: 0,
          });
        }
        
        const thread = threadsMap.get(threadId)!;
        thread.messages.push({
          id: msg._id,
          senderId: msg.senderId._id,
          senderName: msg.senderId.name,
          senderAvatar: msg.senderId.profileImage || msg.senderId.name.charAt(0),
          text: msg.message,
          timestamp: msg.createdAt,
          isOwn,
        });
        
        thread.lastMessage = msg.message;
        thread.lastMessageTime = msg.createdAt;
        // Basic unread logic: we can mark unread if it's not own message
        // Better unread logic requires tracking read messages, but for now:
        // thread.unread = ...
      });

      const updatedThreads = Array.from(threadsMap.values()).sort((a, b) => 
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
      );

      setThreads(updatedThreads);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }, [isAuthenticated, user]);

  useEffect(() => {
    if (isAuthenticated) {
      fetchConversations();
      // Poll every 3 seconds for new messages
      pollingRef.current = setInterval(fetchConversations, 3000);
    } else {
      setThreads([]);
      if (pollingRef.current) clearInterval(pollingRef.current);
    }

    return () => {
      if (pollingRef.current) clearInterval(pollingRef.current);
    };
  }, [isAuthenticated, fetchConversations]);

  const sendMessage = useCallback(async (receiverId: string, itemId: string, text: string) => {
    if (!isAuthenticated) return;
    try {
      await api.post('/messages/send', {
        receiverId,
        itemId,
        message: text
      });
      fetchConversations();
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }, [isAuthenticated, fetchConversations]);

  const startConversation = useCallback(async (receiverId: string, itemId: string, initialMessage: string) => {
    if (!isAuthenticated) return;
    try {
      await api.post('/messages/send', {
        receiverId,
        itemId,
        message: initialMessage
      });
      await fetchConversations();
      const threadId = `${receiverId}_${itemId}`;
      setActiveThreadId(threadId);
    } catch (error) {
      console.error('Error starting conversation:', error);
      throw error;
    }
  }, [isAuthenticated, fetchConversations]);

  const fetchMessages = useCallback(async (otherUserId: string) => {
    // Currently relying on fetchConversations for polling all messages.
  }, []);

  return (
    <ChatContext.Provider value={{ threads, activeThreadId, setActiveThreadId, sendMessage, fetchMessages, startConversation } as any}>
      {children}
    </ChatContext.Provider>
  );
}


export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within ChatProvider');
  }
  return context;
}
