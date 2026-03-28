import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck, Leaf, Users, TrendingUp } from 'lucide-react';
import { Link } from 'react-router';
<<<<<<< HEAD
import { ItemCard } from '../components/ItemCard';
import { mockItems } from '../data/mockData';
=======
<<<<<<< HEAD
import { ItemCard } from '../components/ItemCard.js';
import { mockItems } from '../data/mockData.js';
=======
import { ItemCard } from '../components/ItemCard';
import { mockItems } from '../data/mockData';
>>>>>>> 3bb46ca4d2d31115eb02cb98dad088dcab647242
>>>>>>> 170944ca248775a90c71923f2fb9d532fa0bffbe

export function Home() {
  const featuredItems = mockItems.slice(0, 6);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 dark:from-blue-700 dark:via-purple-700 dark:to-blue-900 text-white">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
            backgroundSize: '40px 40px'
          }} />
        </div>
        
        {/* Animated gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6"
            >
              Your Campus Marketplace
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl sm:text-2xl mb-8 text-blue-100"
            >
              Buy, sell, and donate within your verified student community
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/browse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/20 w-full sm:w-auto shadow-lg"
                >
                  Browse Items
                </motion.button>
              </Link>
              <Link to="/post">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-3 bg-white/10 backdrop-blur-md text-white rounded-lg font-semibold hover:bg-white/20 transition-all border-2 border-white/20 w-full sm:w-auto shadow-lg"
                >
                  Post an Item
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-neutral-50 dark:fill-neutral-950"
              style={{ opacity: 0.5 }}
            />
            <path
              d="M0 120L60 105C120 90 240 60 360 50C480 40 600 50 720 60C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              className="fill-gradient-to-br from-neutral-50 via-blue-50/30 to-purple-50/30 dark:from-neutral-950 dark:via-blue-950/20 dark:to-purple-950/20"
            />
          </svg>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<ShieldCheck className="w-8 h-8" />}
            title="Verified Students"
            description="Trade safely within your trusted campus community"
            delay={0}
          />
          <FeatureCard
            icon={<Leaf className="w-8 h-8" />}
            title="Sustainable"
            description="Reduce waste by giving items a second life"
            delay={0.1}
          />
          <FeatureCard
            icon={<Users className="w-8 h-8" />}
            title="Build Community"
            description="Connect with fellow students on campus"
            delay={0.2}
          />
          <FeatureCard
            icon={<TrendingUp className="w-8 h-8" />}
            title="Save Money"
            description="Find essentials at student-friendly prices"
            delay={0.3}
          />
        </div>
      </section>

      {/* Featured Items */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-3xl font-bold text-neutral-900 dark:text-white"
          >
            Featured Items
          </motion.h2>
          <Link to="/browse">
            <motion.button
              whileHover={{ x: 5 }}
              className="text-blue-600 dark:text-blue-500 font-medium flex items-center gap-1"
            >
              View All
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <ItemCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 dark:from-blue-700 dark:via-purple-700 dark:to-blue-800 rounded-3xl p-8 sm:p-12 text-white text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4">Ready to declutter or find great deals?</h2>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              Join thousands of students making campus life more affordable and sustainable
            </p>
            <Link to="/post">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg font-semibold hover:shadow-xl transition-all relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-white"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">List Your First Item</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -4 }}
      className="relative group"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-xl p-6 rounded-2xl border border-white/20 dark:border-white/10 hover:border-blue-400/50 dark:hover:border-blue-500/50 transition-all duration-300 shadow-lg shadow-neutral-200/50 dark:shadow-black/20 hover:shadow-xl">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white mb-4 shadow-lg">
          {icon}
        </div>
        <h3 className="font-semibold text-lg mb-2 text-neutral-900 dark:text-white">{title}</h3>
        <p className="text-neutral-600 dark:text-neutral-400 text-sm">{description}</p>
      </div>
    </motion.div>
  );
}