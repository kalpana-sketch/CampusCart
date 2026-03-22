import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useNavigate } from 'react-router';
import {
  User, Mail, GraduationCap, BookOpen, ShoppingBag, Heart, MessageCircle,
  Settings, HelpCircle, ChevronRight, Edit3, Camera, Package, ClipboardList,
  Star, Calendar, MapPin, Shield, Bell, Lock, Eye, EyeOff, Save, X, LogOut,
  TrendingUp, ArrowRight, Loader2
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { useWishlist } from '../context/WishlistContext.js';
import { useChat } from '../context/ChatContext.js';
import api from '../services/api.js';

type ActiveSection = 'overview' | 'listings' | 'orders' | 'settings';

const mockOrders = [
  { id: 'ord-1', item: 'Calculus Early Transcendentals', price: 45, date: '2026-03-01', status: 'Completed' as const, seller: 'Sarah Chen' },
  { id: 'ord-2', item: 'Desk Lamp with USB Charging Port', price: 15, date: '2026-02-28', status: 'In Progress' as const, seller: 'Olivia Martinez' },
];

export function Profile() {
  const { user, logout, updateProfile, isAuthenticated } = useAuth();
  const { wishlist } = useWishlist();
  const { threads } = useChat();
  const navigate = useNavigate();

  const [activeSection, setActiveSection] = useState<ActiveSection>('overview');
  const [isEditing, setIsEditing] = useState(false);
  const [listingCount, setListingCount] = useState(0);
  const [loading, setLoading] = useState(false);
  
  const [editForm, setEditForm] = useState({
    name: user?.name || '',
    major: user?.major || '',
    year: user?.year || '',
    profileImage: user?.profileImage || '',
  });

  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserStats();
    }
  }, [isAuthenticated, user]);

  const fetchUserStats = async () => {
    try {
      const response = await api.get(`/items/user/${user?.id}`);
      setListingCount(response.data.length);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const unreadCount = threads.reduce((sum: number, t: any) => sum + t.unread, 0);

  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-10 shadow-2xl text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto mb-5">
            <User className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3">Sign In Required</h2>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">Please sign in to view your profile.</p>
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

  const memberSince = 'September 2025';

  const sidebarItems = [
    { id: 'overview' as const, icon: User, label: 'My Profile' },
    { id: 'listings' as const, icon: ClipboardList, label: 'My Listings', badge: listingCount, href: '/my-listings' },
    { id: 'orders' as const, icon: Package, label: 'Orders', badge: mockOrders.length },
    { id: 'settings' as const, icon: Settings, label: 'Settings' },
  ];

  const quickLinks = [
    { icon: MessageCircle, label: 'Messages', to: '/chat', badge: unreadCount },
    { icon: Heart, label: 'Wishlist', to: '/wishlist', badge: wishlist.length },
    { icon: HelpCircle, label: 'Customer Care', to: '/customer-care' },
  ];

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert('Image exceeds 5MB limit.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditForm(prev => ({...prev, profileImage: reader.result as string}));
      };
      reader.readAsDataURL(file);
      e.target.value = '';
    }
  };

  const handleSaveProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(editForm);
      setIsEditing(false);
    } catch (error) {
      console.error('Update profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const displayAvatar = isEditing && editForm.profileImage ? (
    <img src={editForm.profileImage} alt="Preview" className="w-full h-full object-cover rounded-2xl" />
  ) : user.profileImage ? (
    <img src={user.profileImage} alt={user.name} className="w-full h-full object-cover rounded-2xl" />
  ) : (
    <User className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
  );

  return (
    <div className="min-h-screen py-6 lg:py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-2xl overflow-hidden mb-8"
        >
          <div className="h-32 sm:h-40 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImEiIHBhdHRlcm5Vbml0cz0idXNlclNwYWNlT25Vc2UiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCI+PHBhdGggZD0iTTAgMGg2MHY2MEgweiIgZmlsbD0ibm9uZSIvPjxjaXJjbGUgY3g9IjMwIiBjeT0iMzAiIHI9IjEuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjEpIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCBmaWxsPSJ1cmwoI2EpIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+')] opacity-50"></div>
          </div>

          <div className="px-5 sm:px-8 pb-6 -mt-14 sm:-mt-16 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
              <div className="relative group/avatar">
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold shadow-2xl border-4 border-white dark:border-neutral-900 overflow-hidden">
                  {displayAvatar}
                </div>
                {isEditing && (
                  <label className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-white rounded-2xl opacity-0 hover:opacity-100 cursor-pointer transition-opacity backdrop-blur-sm z-10 m-1">
                    <Camera className="w-6 h-6 mb-1" />
                    <span className="text-xs font-semibold">Change</span>
                    <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleImageChange} />
                  </label>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white truncate">{user.name}</h1>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5 text-sm text-neutral-600 dark:text-neutral-400">
                  <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{user.email}</span>
                  {user.year && <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" />{user.year}</span>}
                  {user.major && <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" />{user.major}</span>}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => { setIsEditing(true); setActiveSection('overview'); }}
                className="self-start sm:self-auto px-5 py-2.5 rounded-xl font-medium text-sm bg-white/60 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-neutral-700 dark:text-neutral-300 hover:bg-white/80 dark:hover:bg-white/10 transition-all shadow-lg flex items-center gap-2"
              >
                <Edit3 className="w-4 h-4" /> Edit Profile
              </motion.button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
              {[
                { label: 'Listed', value: listingCount, icon: ShoppingBag },
                { label: 'Sold', value: 0, icon: TrendingUp },
                { label: 'Wishlist', value: wishlist.length, icon: Heart },
                { label: 'Member Since', value: memberSince, icon: Calendar },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 p-3.5 text-center">
                  <stat.icon className="w-5 h-5 mx-auto mb-1.5 text-blue-600 dark:text-blue-400" />
                  <p className="text-lg font-bold text-neutral-900 dark:text-white">{stat.value}</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <motion.aside initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }} className="space-y-4">
            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl p-3">
              <div className="space-y-1">
                {sidebarItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      if ('href' in item && item.href) {
                        navigate(item.href);
                      } else {
                        setActiveSection(item.id);
                        setIsEditing(false);
                      }
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                      activeSection === item.id && !('href' in item && item.href)
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-white/50 dark:hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium flex-1 text-left">{item.label}</span>
                    {item.badge != null && item.badge > 0 && (
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${activeSection === item.id ? 'bg-white/20' : 'bg-blue-500/10 text-blue-600'}`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl p-3">
              <p className="px-4 py-2 text-xs font-semibold uppercase text-neutral-500">Quick Links</p>
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <Link key={link.label} to={link.to} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-neutral-700 dark:text-neutral-300 hover:bg-white/50 dark:hover:bg-white/5">
                    <link.icon className="w-5 h-5 shrink-0" />
                    <span className="font-medium flex-1 text-left">{link.label}</span>
                    {link.badge != null && link.badge > 0 && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white">{link.badge}</span>}
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </Link>
                ))}
              </div>
            </div>

            <button onClick={() => { logout(); navigate('/'); }} className="w-full flex items-center gap-3 px-5 py-3.5 rounded-xl text-red-600 bg-red-500/5 border border-red-500/10">
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </motion.aside>

          <motion.div key={activeSection} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }}>
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {isEditing ? (
                  <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-bold">Edit Profile</h2>
                      <button onClick={() => setIsEditing(false)}><X className="w-5 h-5" /></button>
                    </div>
                    <div className="space-y-5">
                      <div>
                        <label className="block text-sm font-medium mb-2">Full Name</label>
                        <input type="text" value={editForm.name} onChange={(e) => setEditForm({...editForm, name: e.target.value})} className="w-full p-3 rounded-lg bg-white/50 border border-white/20" />
                      </div>
                      <div className="grid grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-medium mb-2">Year</label>
                          <select value={editForm.year} onChange={(e) => setEditForm({...editForm, year: e.target.value})} className="w-full p-3 rounded-lg bg-white/50 border border-white/20">
                            <option value="">Select Year</option>
                            <option value="1st Year">1st Year</option>
                            <option value="2nd Year">2nd Year</option>
                            <option value="3rd Year">3rd Year</option>
                            <option value="4th Year">4th Year</option>
                            <option value="Graduate">Graduate</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Major</label>
                          <input type="text" value={editForm.major} onChange={(e) => setEditForm({...editForm, major: e.target.value})} className="w-full p-3 rounded-lg bg-white/50 border border-white/20" />
                        </div>
                      </div>
                      <button onClick={handleSaveProfile} disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold flex items-center justify-center gap-2">
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />} Save Changes
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-xl">
                    <h2 className="text-xl font-bold mb-6">Profile Information</h2>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {[
                        { icon: User, label: 'Full Name', value: user.name },
                        { icon: Mail, label: 'Email', value: user.email },
                        { icon: GraduationCap, label: 'Year', value: user.year || 'Not specified' },
                        { icon: BookOpen, label: 'Major', value: user.major || 'Not specified' },
                      ].map((field) => (
                        <div key={field.label} className="flex gap-3">
                          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center"><field.icon className="w-5 h-5 text-blue-500" /></div>
                          <div><p className="text-xs text-neutral-500">{field.label}</p><p className="font-medium">{field.value}</p></div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Recent Activity */}
                {!isEditing && (
                  <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl p-6 sm:p-8 mt-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white mb-5">Recent Activity</h2>
                    <div className="space-y-4">
                      {[
                        { text: 'Joined CampusCart', time: 'Recently', type: 'system' },
                        { text: `Welcome, ${user.name}!`, time: 'Now', type: 'message' },
                      ].map((activity, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.08 }}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/30 dark:hover:bg-white/3 transition-colors"
                        >
                          <div className={`w-2.5 h-2.5 rounded-full shrink-0 bg-blue-500`} />
                          <p className="flex-1 text-sm text-neutral-700 dark:text-neutral-300">{activity.text}</p>
                          <span className="text-xs text-neutral-500 shrink-0">{activity.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Orders */}
            {activeSection === 'orders' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Orders</h2>
                {mockOrders.map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08 }}
                    className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-lg p-5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold truncate">{order.item}</h3>
                        <p className="text-sm text-neutral-500">Seller: {order.seller} • {order.date}</p>
                      </div>
                      <span className="text-lg font-bold text-blue-600">${order.price}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Settings */}
            {activeSection === 'settings' && (
              <div className="space-y-6">
                <h2 className="text-xl font-bold">Settings</h2>
                
                {/* Notifications */}
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold">Notifications</h3>
                  </div>
                  <div className="space-y-4">
                    {['New message notifications', 'Price drop alerts'].map((pref) => (
                      <label key={pref} className="flex items-center justify-between cursor-pointer">
                        <span className="text-sm">{pref}</span>
                        <div className="w-11 h-6 bg-neutral-300 dark:bg-neutral-700 rounded-full relative">
                          <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Security */}
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 shadow-xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <Shield className="w-5 h-5 text-purple-600" />
                    <h3 className="font-semibold">Security</h3>
                  </div>
                  <button onClick={() => setShowPasswordSection(!showPasswordSection)} className="w-full flex items-center justify-between p-4 rounded-xl bg-white/30 border border-white/10">
                    <span className="font-medium">Change Password</span>
                    <ChevronRight className={`w-5 h-5 transition-transform ${showPasswordSection ? 'rotate-90' : ''}`} />
                  </button>
                  {showPasswordSection && (
                    <div className="pt-5 space-y-4">
                      <input type="password" placeholder="Current Password" className="w-full p-3 rounded-lg bg-white/50 border border-white/20" />
                      <input type="password" placeholder="New Password" className="w-full p-3 rounded-lg bg-white/50 border border-white/20" />
                      <button className="px-6 py-2.5 bg-purple-600 text-white rounded-xl font-medium">Update Password</button>
                    </div>
                  )}
                </div>

                {/* Danger Zone */}
                <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-red-500/20 shadow-xl p-6">
                  <h3 className="font-semibold text-red-600 mb-2">Danger Zone</h3>
                  <p className="text-sm text-neutral-600 mb-4">Once you delete your account, there is no going back.</p>
                  <button className="px-5 py-2.5 rounded-xl text-sm font-medium text-red-600 border border-red-500/20">Delete Account</button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}