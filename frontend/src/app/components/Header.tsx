import { Link, useLocation, useNavigate } from 'react-router';
import {
  ShoppingBag, Moon, Sun, Plus, User, LogOut, Heart, MessageCircle,
  HelpCircle, Menu, X, Home, Search, Info, ShoppingCart, ClipboardList,
  Package, Settings,
} from 'lucide-react';
<<<<<<< HEAD
import { useTheme } from '../context/ThemeContext.js';
import { useAuth } from '../context/AuthContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { useChat } from '../context/ChatContext.js';
=======
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useWishlist } from '../context/WishlistContext';
import { useChat } from '../context/ChatContext';
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect, useRef } from 'react';

export function Header() {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user, logout } = useAuth();
  const { wishlist } = useWishlist();
  const { threads } = useChat();
  const location = useLocation();
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const unreadCount = threads.reduce((sum, t) => sum + t.unread, 0);

  const isActive = (path: string) => location.pathname === path;

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowUserMenu(false);
      }
    }
    if (showUserMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showUserMenu]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      return () => { document.body.style.overflow = ''; };
    }
  }, [mobileMenuOpen]);

  const handleMobileNav = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
  };

  const handleMobileLogout = () => {
    setMobileMenuOpen(false);
    logout();
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="sticky top-0 z-50 border-b border-white/10 dark:border-white/5 bg-white/70 dark:bg-neutral-950/70 backdrop-blur-2xl shadow-lg shadow-neutral-200/10 dark:shadow-black/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
                  <ShoppingBag className="w-5 h-5 text-white" />
                </div>
              </motion.div>
              <span className="font-bold text-xl text-neutral-900 dark:text-white">
                Campus<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cart</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <NavLink to="/" active={isActive('/')}>Home</NavLink>
              <NavLink to="/about" active={isActive('/about')}>About Us</NavLink>
              <NavLink to="/browse" active={isActive('/browse')}>Browse</NavLink>
              {isAuthenticated && (
                <>
                  <NavLink to="/post" active={isActive('/post')}>Add Item</NavLink>
                  <NavLink to="/wishlist" active={isActive('/wishlist')} badge={wishlist.length}>Wishlist</NavLink>
                  <NavLink to="/chat" active={isActive('/chat')} badge={unreadCount}>Chat</NavLink>
                </>
              )}
            </nav>

            {/* Desktop Actions + Mobile hamburger */}
            <div className="flex items-center gap-3">
              {/* Theme toggle — always visible */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-white/20 dark:border-white/10 shadow-lg"
                aria-label="Toggle theme"
              >
                <motion.div
                  initial={false}
                  animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  ) : (
                    <Sun className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                  )}
                </motion.div>
              </motion.button>

              {/* Desktop user menu */}
              <div className="hidden md:block">
                {isAuthenticated ? (
                  <div className="relative" ref={menuRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg border-2 border-white/20"
                    >
                      {user?.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover rounded-full" />
                      ) : (
                        user?.name?.charAt(0) || <User className="w-5 h-5" />
                      )}
                    </motion.button>

                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute right-0 mt-2 w-64 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-xl border border-white/20 dark:border-neutral-700 shadow-2xl overflow-hidden z-[100]"
                      >
                        <div className="p-4 border-b border-white/20 dark:border-neutral-700">
                          <p className="font-semibold text-neutral-900 dark:text-white">{user?.name}</p>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{user?.email}</p>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                            {user?.year} • {user?.major}
                          </p>
                        </div>
                        <div className="p-2">
                          <Link to="/profile">
                            <button onClick={() => setShowUserMenu(false)} className="w-full flex items-center gap-2 px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 rounded-lg transition-all">
                              <User className="w-4 h-4" /> My Profile
                            </button>
                          </Link>
                          <Link to="/post">
                            <button onClick={() => setShowUserMenu(false)} className="w-full flex items-center gap-2 px-4 py-2 text-left text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all mb-1">
                              <Plus className="w-4 h-4" /> Post Item
                            </button>
                          </Link>
                          <Link to="/wishlist">
                            <button onClick={() => setShowUserMenu(false)} className="w-full flex items-center gap-2 px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 rounded-lg transition-all">
                              <Heart className="w-4 h-4" /> Wishlist
                            </button>
                          </Link>
                          <Link to="/chat">
                            <button onClick={() => setShowUserMenu(false)} className="w-full flex items-center gap-2 px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 rounded-lg transition-all">
                              <MessageCircle className="w-4 h-4" /> Messages
                            </button>
                          </Link>
                          <Link to="/customer-care">
                            <button onClick={() => setShowUserMenu(false)} className="w-full flex items-center gap-2 px-4 py-2 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 rounded-lg transition-all">
                              <HelpCircle className="w-4 h-4" /> Customer Care
                            </button>
                          </Link>
                          <div className="my-1 border-t border-white/20 dark:border-neutral-700"></div>
                          <button
                            onClick={() => { logout(); setShowUserMenu(false); }}
                            className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-all"
                          >
                            <LogOut className="w-4 h-4" /> Sign Out
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                ) : (
                  <div className="relative" ref={menuRef}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowUserMenu(!showUserMenu)}
                      className="p-2 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-white/20 dark:border-white/10 shadow-lg"
                      aria-label="Account menu"
                    >
                      <User className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
                    </motion.button>

                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="absolute right-0 mt-2 w-48 bg-white/95 dark:bg-neutral-800/95 backdrop-blur-xl rounded-xl border border-white/20 dark:border-neutral-700 shadow-2xl overflow-hidden z-[100]"
                      >
                        <div className="p-2">
                          <Link to="/login">
                            <button onClick={() => setShowUserMenu(false)} className="w-full flex items-center gap-2 px-4 py-2.5 text-left text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100/50 dark:hover:bg-neutral-700/50 rounded-lg transition-all">
                              <LogOut className="w-4 h-4 rotate-180" /> Sign In
                            </button>
                          </Link>
                          <Link to="/signup">
                            <button onClick={() => setShowUserMenu(false)} className="w-full flex items-center gap-2 px-4 py-2.5 text-left bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-500 hover:to-purple-500 rounded-lg transition-all mt-1">
                              <User className="w-4 h-4" /> Sign Up
                            </button>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </div>
                )}
              </div>

              {/* Mobile hamburger button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden p-2 rounded-lg bg-white/50 dark:bg-white/5 backdrop-blur-md hover:bg-white/80 dark:hover:bg-white/10 transition-all border border-white/20 dark:border-white/10 shadow-lg"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 text-neutral-600 dark:text-neutral-400" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-in Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm md:hidden"
            />

            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-[70] w-[78%] max-w-sm bg-white/90 dark:bg-neutral-950/95 backdrop-blur-2xl border-l border-white/20 dark:border-white/10 shadow-2xl md:hidden flex flex-col"
            >
              {/* Panel header */}
              <div className="flex items-center justify-between p-5 border-b border-white/10 dark:border-white/5">
                <span className="font-bold text-lg text-neutral-900 dark:text-white">
                  Campus<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cart</span>
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-lg bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 text-neutral-600 dark:text-neutral-400"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* User info (if authenticated) */}
              {isAuthenticated && user && (
                <div className="px-5 py-4 border-b border-white/10 dark:border-white/5">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold shadow-lg border-2 border-white/20 overflow-hidden">
                      {user.profileImage ? (
                        <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user.name.charAt(0) || <User className="w-5 h-5" />
                      )}
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-neutral-900 dark:text-white truncate">{user.name}</p>
                      <p className="text-xs text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation items */}
              <nav className="flex-1 overflow-y-auto py-3 px-3">
                <div className="space-y-1">
                  <MobileNavItem icon={Home} label="Home" active={isActive('/')} onClick={() => handleMobileNav('/')} />
                  <MobileNavItem icon={Search} label="Browse Products" active={isActive('/browse')} onClick={() => handleMobileNav('/browse')} />
                  <MobileNavItem icon={Info} label="About Us" active={isActive('/about')} onClick={() => handleMobileNav('/about')} />

                  {isAuthenticated && (
                    <>
                      <div className="my-3 border-t border-white/10 dark:border-white/5"></div>
                      <MobileNavItem
                        icon={Plus}
                        label="Sell / Upload Item"
                        active={isActive('/post')}
                        onClick={() => handleMobileNav('/post')}
                        highlight
                      />
                      <MobileNavItem
                        icon={Heart}
                        label="Wishlist"
                        active={isActive('/wishlist')}
                        onClick={() => handleMobileNav('/wishlist')}
                        badge={wishlist.length}
                      />
                      <MobileNavItem
                        icon={MessageCircle}
                        label="Messages / Chat"
                        active={isActive('/chat')}
                        onClick={() => handleMobileNav('/chat')}
                        badge={unreadCount}
                      />

                      <div className="my-3 border-t border-white/10 dark:border-white/5"></div>
                      <MobileNavItem icon={User} label="My Profile" active={isActive('/profile')} onClick={() => handleMobileNav('/profile')} />
                      <MobileNavItem icon={ClipboardList} label="My Listings" active={isActive('/my-listings')} onClick={() => handleMobileNav('/my-listings')} />
                      <MobileNavItem icon={Package} label="Orders" onClick={() => handleMobileNav('/profile')} />
                    </>
                  )}

                  <div className="my-3 border-t border-white/10 dark:border-white/5"></div>
                  <MobileNavItem
                    icon={HelpCircle}
                    label="Customer Care"
                    active={isActive('/customer-care')}
                    onClick={() => handleMobileNav('/customer-care')}
                  />
                </div>
              </nav>

              {/* Bottom section */}
              <div className="p-4 border-t border-white/10 dark:border-white/5 space-y-2">
                {isAuthenticated ? (
                  <button
                    onClick={handleMobileLogout}
                    className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-red-600 dark:text-red-500 bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                ) : (
                  <div className="space-y-2">
                    <button
                      onClick={() => handleMobileNav('/login')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-neutral-700 dark:text-neutral-300 bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 hover:bg-white/70 dark:hover:bg-white/10 transition-all"
                    >
                      <LogOut className="w-5 h-5 rotate-180" />
                      Sign In
                    </button>
                    <button
                      onClick={() => handleMobileNav('/signup')}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg"
                    >
                      <User className="w-5 h-5" />
                      Create Account
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Desktop NavLink ─────────────────────────────────── */
function NavLink({ to, active, children, badge }: { to: string; active: boolean; children: React.ReactNode; badge?: number }) {
  return (
    <Link to={to} className="relative">
      <motion.span
        className={`text-sm font-medium transition-colors flex items-center gap-1.5 ${
          active
            ? 'text-blue-600 dark:text-blue-500'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
        }`}
        whileHover={{ y: -2 }}
      >
        {children}
        {badge != null && badge > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-[10px] font-bold shadow-md"
          >
            {badge > 99 ? '99+' : badge}
          </motion.span>
        )}
      </motion.span>
      {active && (
        <motion.div
          layoutId="activeNav"
          className="absolute -bottom-[21px] left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-500"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </Link>
  );
}

/* ── Mobile Nav Item ─────────────────────────────────── */
function MobileNavItem({
  icon: Icon,
  label,
  active,
  badge,
  highlight,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
  badge?: number;
  highlight?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all ${
        highlight
          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
          : active
          ? 'bg-blue-500/10 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20'
          : 'text-neutral-700 dark:text-neutral-300 hover:bg-white/50 dark:hover:bg-white/5'
      }`}
    >
      <Icon className="w-5 h-5 shrink-0" />
      <span className="font-medium flex-1 text-left">{label}</span>
      {badge != null && badge > 0 && (
        <span className="inline-flex items-center justify-center min-w-[22px] h-[22px] px-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold shadow-md">
          {badge > 99 ? '99+' : badge}
        </span>
      )}
    </motion.button>
  );
}