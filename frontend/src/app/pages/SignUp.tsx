import { useState } from 'react';
import { motion } from 'motion/react';
import { ShoppingBag, Mail, Lock, User, GraduationCap, BookOpen, ArrowRight, LogIn, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../context/AuthContext';

export function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    year: '1st Year',
    major: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    setIsLoading(true);

    try {
      await signup(formData.name, formData.email, formData.password);
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20 flex items-center justify-center p-4 relative overflow-hidden py-12">
      {/* Animated background orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-50"></div>
              <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-lg">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
            </motion.div>
            <span className="font-bold text-2xl text-neutral-900 dark:text-white">
              Campus<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cart</span>
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-white mb-2">
            Join CampusCart
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400">
            Create your student marketplace account
          </p>
        </motion.div>

        {/* Sign Up Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-8 shadow-2xl space-y-5"
        >
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-600 dark:text-red-400 text-sm"
            >
              {error}
            </motion.div>
          )}

          {/* Full Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              University Email
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="student@university.edu"
                className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-sm transition-all"
              />
            </div>
          </div>

          {/* Year & Major */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Year
              </label>
              <div className="relative">
                <GraduationCap className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <select
                  required
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  className="w-full pl-10 pr-3 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm transition-all appearance-none text-sm"
                >
                  <option value="1st Year">1st Year</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="4th Year">4th Year</option>
                  <option value="5th Year">5th Year</option>
                  <option value="Graduate">Graduate</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                Major
              </label>
              <div className="relative">
                <BookOpen className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  required
                  value={formData.major}
                  onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                  placeholder="CS"
                  className="w-full pl-10 pr-3 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-sm transition-all text-sm"
                />
              </div>
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Min. 8 characters"
                className="w-full pl-12 pr-12 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
              Confirm Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="Re-enter password"
                className="w-full pl-12 pr-12 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-sm transition-all"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-2 cursor-pointer text-sm">
            <input
              type="checkbox"
              required
              className="w-4 h-4 mt-0.5 rounded border-neutral-300 text-blue-600 focus:ring-2 focus:ring-blue-500"
            />
            <span className="text-neutral-600 dark:text-neutral-400">
              I agree to the <button type="button" className="text-blue-600 dark:text-blue-500 hover:underline">Terms of Service</button> and <button type="button" className="text-blue-600 dark:text-blue-500 hover:underline">Privacy Policy</button>
            </span>
          </label>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }}
            whileTap={{ scale: isLoading ? 1 : 0.98 }}
            className="relative w-full px-6 py-3 rounded-lg font-semibold text-white shadow-lg overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                  Creating Account...
                </>
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </span>
          </motion.button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20 dark:border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/40 dark:bg-white/5 backdrop-blur-md text-neutral-500 dark:text-neutral-400 rounded-full">
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <Link to="/login">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md text-neutral-900 dark:text-white rounded-lg font-medium hover:bg-white/70 dark:hover:bg-white/10 transition-all border border-white/20 shadow-lg flex items-center justify-center gap-2"
            >
              <LogIn className="w-5 h-5 text-blue-600 dark:text-blue-500" />
              Sign In
            </motion.button>
          </Link>
        </motion.form>

        {/* Student Verification Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-6 text-center"
        >
          <p className="text-xs text-neutral-500 dark:text-neutral-500">
            🎓 Only students with verified .edu emails can join
          </p>
        </motion.div>
      </div>
    </div>
  );
}