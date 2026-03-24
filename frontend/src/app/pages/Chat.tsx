import { useState, useRef, useEffect } from 'react';
import { useSearchParams, useNavigate, useLocation } from 'react-router';
import { motion, AnimatePresence } from 'motion/react';
import { Send, ArrowLeft, MessageCircle, Search, ChevronLeft } from 'lucide-react';
import { useChat, type ChatThread } from '../context/ChatContext.js';
import { useAuth } from '../context/AuthContext.js';

export function Chat() {
  const { threads, activeThreadId, setActiveThreadId, sendMessage } = useChat();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [showMobileList, setShowMobileList] = useState(true);

  // Set active thread from URL params
  useEffect(() => {
    const threadParam = searchParams.get('thread');
    if (threadParam) {
      setActiveThreadId(threadParam);
      setShowMobileList(false);
    }
  }, [searchParams, setActiveThreadId]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThreadId, threads]);

  const activeThread = threads.find(t => t.id === activeThreadId) || (activeThreadId && location.state ? {
    id: activeThreadId,
    sellerId: location.state.sellerId,
    sellerName: location.state.sellerName,
    sellerAvatar: location.state.sellerAvatar,
    itemId: location.state.itemId,
    itemTitle: location.state.itemTitle,
    itemImage: location.state.itemImage,
    itemPrice: location.state.itemPrice,
    isDonation: location.state.isDonation,
    messages: [],
    lastMessage: '',
    lastMessageTime: new Date().toISOString(),
    unread: 0
  } as ChatThread : undefined);

  const filteredThreads = threads.filter(t =>
    t.sellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.itemTitle.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSend = () => {
    if (!messageInput.trim() || !activeThread) return;
    sendMessage(activeThread.sellerId, activeThread.itemId, messageInput.trim());
    setMessageInput('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    if (isToday) {
      return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    }
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const selectThread = (threadId: string) => {
    setActiveThreadId(threadId);
    setShowMobileList(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="h-[calc(100vh-64px)] bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden flex">
          
          {/* Thread List - Sidebar */}
          <div className={`${showMobileList ? 'flex' : 'hidden'} md:flex flex-col w-full md:w-96 border-r border-white/20 dark:border-white/10`}>
            {/* Sidebar Header */}
            <div className="p-4 border-b border-white/20 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <MessageCircle className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-neutral-900 dark:text-white">Messages</h1>
                {threads.reduce((sum, t) => sum + t.unread, 0) > 0 && (
                  <span className="ml-auto px-2.5 py-0.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs font-semibold rounded-full shadow-md">
                    {threads.reduce((sum, t) => sum + t.unread, 0)}
                  </span>
                )}
              </div>
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                />
              </div>
            </div>

            {/* Thread List */}
            <div className="flex-1 overflow-y-auto">
              {filteredThreads.length === 0 ? (
                <div className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-neutral-300 dark:text-neutral-700 mx-auto mb-3" />
                  <p className="text-neutral-500 dark:text-neutral-500">No conversations yet</p>
                  <p className="text-sm text-neutral-400 dark:text-neutral-600 mt-1">
                    Contact a seller to start chatting
                  </p>
                </div>
              ) : (
                filteredThreads.map(thread => (
                  <ThreadItem
                    key={thread.id}
                    thread={thread}
                    isActive={thread.id === activeThreadId}
                    onClick={() => selectThread(thread.id)}
                    formatTime={formatTime}
                  />
                ))
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className={`${!showMobileList ? 'flex' : 'hidden'} md:flex flex-col flex-1`}>
            {activeThread ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-white/20 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => {
                        setShowMobileList(true);
                        setActiveThreadId(null);
                      }}
                      className="md:hidden p-2 hover:bg-white/30 dark:hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <ChevronLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </motion.button>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg">
                      {activeThread.sellerAvatar}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h2 className="font-semibold text-neutral-900 dark:text-white truncate">
                        {activeThread.sellerName}
                      </h2>
                      <p className="text-sm text-neutral-500 dark:text-neutral-500 truncate">
                        {activeThread.itemTitle}
                      </p>
                    </div>
                    {/* Item Preview */}
                    <div
                      onClick={() => navigate(`/item/${activeThread.itemId}`)}
                      className="hidden sm:flex items-center gap-3 px-3 py-2 bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 cursor-pointer hover:bg-white/60 dark:hover:bg-white/10 transition-all"
                    >
                      <img
                        src={activeThread.itemImage}
                        alt={activeThread.itemTitle}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-xs text-neutral-500 dark:text-neutral-500">Item</p>
                        <p className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                          {activeThread.isDonation ? 'Free' : `$${activeThread.itemPrice}`}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {activeThread.messages.length === 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-8 h-8 text-blue-500" />
                      </div>
                      <p className="text-neutral-600 dark:text-neutral-400 mb-1">
                        Start a conversation with {activeThread.sellerName}
                      </p>
                      <p className="text-sm text-neutral-400 dark:text-neutral-600">
                        Ask about "{activeThread.itemTitle}"
                      </p>
                    </motion.div>
                  )}
                  <AnimatePresence>
                    {activeThread.messages.map((msg, i) => (
                      <motion.div
                        key={msg.id}
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: i * 0.02 }}
                        className={`flex items-end gap-2 ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                      >
                        {!msg.isOwn && (
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-semibold shadow-md flex-shrink-0">
                            {msg.senderAvatar}
                          </div>
                        )}
                        <div
                          className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-md ${
                            msg.isOwn
                              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-br-md'
                              : 'bg-white/60 dark:bg-white/10 backdrop-blur-md text-neutral-900 dark:text-white border border-white/20 dark:border-white/10 rounded-bl-md'
                          }`}
                        >
                          <p className="break-words">{msg.text}</p>
                          <p className={`text-xs mt-1 ${msg.isOwn ? 'text-white/60' : 'text-neutral-400 dark:text-neutral-500'}`}>
                            {formatTime(msg.timestamp)}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  <div ref={messagesEndRef} />
                </div>

                {/* Message Input */}
                <div className="p-4 border-t border-white/20 dark:border-white/10 bg-white/30 dark:bg-white/5 backdrop-blur-md">
                  <div className="flex items-center gap-3">
                    <input
                      ref={inputRef}
                      type="text"
                      value={messageInput}
                      onChange={e => setMessageInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      className="flex-1 px-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-xl text-neutral-900 dark:text-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSend}
                      disabled={!messageInput.trim()}
                      className="relative p-3 overflow-hidden rounded-xl text-white shadow-lg disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-500 group-hover:to-purple-500 transition-all"></div>
                      <Send className="w-5 h-5 relative z-10" />
                    </motion.button>
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center p-8">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                    className="w-24 h-24 bg-gradient-to-br from-blue-500/20 to-purple-600/20 dark:from-blue-500/10 dark:to-purple-600/10 rounded-full flex items-center justify-center mx-auto mb-6"
                  >
                    <MessageCircle className="w-12 h-12 text-blue-500/60 dark:text-blue-400/60" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-neutral-500 dark:text-neutral-500 max-w-sm">
                    Choose an existing conversation or contact a seller from an item page to start chatting
                  </p>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ThreadItem({
  thread,
  isActive,
  onClick,
  formatTime,
}: {
  thread: ChatThread;
  isActive: boolean;
  onClick: () => void;
  formatTime: (t: string) => string;
}) {
  return (
    <motion.button
      whileHover={{ x: 2 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 p-4 text-left transition-all border-b border-white/10 dark:border-white/5 ${
        isActive
          ? 'bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/10 dark:to-purple-500/10 border-l-2 border-l-blue-500'
          : 'hover:bg-white/30 dark:hover:bg-white/5'
      }`}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-md">
          {thread.sellerAvatar}
        </div>
        {thread.unread > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
            {thread.unread}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <span className={`font-semibold truncate ${thread.unread > 0 ? 'text-neutral-900 dark:text-white' : 'text-neutral-700 dark:text-neutral-300'}`}>
            {thread.sellerName}
          </span>
          <span className="text-xs text-neutral-400 dark:text-neutral-600 flex-shrink-0 ml-2">
            {formatTime(thread.lastMessageTime)}
          </span>
        </div>
        <p className="text-xs text-neutral-500 dark:text-neutral-500 truncate mb-1">
          {thread.itemTitle}
        </p>
        <p className={`text-sm truncate ${thread.unread > 0 ? 'text-neutral-800 dark:text-neutral-200 font-medium' : 'text-neutral-500 dark:text-neutral-500'}`}>
          {thread.lastMessage || 'No messages yet'}
        </p>
      </div>

      {/* Item thumbnail */}
      <img
        src={thread.itemImage}
        alt={thread.itemTitle}
        className="w-10 h-10 rounded-lg object-cover flex-shrink-0 border border-white/20 dark:border-white/10 shadow-sm"
      />
    </motion.button>
  );
}
