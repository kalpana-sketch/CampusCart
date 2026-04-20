import { useEffect } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router';
import { BookOpen, Upload, MessageCircle, Leaf, Users, Briefcase, GraduationCap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const steps = [
  {
    icon: GraduationCap,
    title: 'Sign Up with College Credentials',
    description: 'Create your account using your verified .edu email address. Only real students can access the marketplace.',
    step: '01',
  },
  {
    icon: Upload,
    title: 'Upload Product Listings',
    description: 'Sellers can quickly post items with photos, descriptions, and pricing. Reach students right on your campus.',
    step: '02',
  },
  {
    icon: MessageCircle,
    title: 'Search, Chat & Purchase',
    description: 'Buyers browse listings, message sellers directly, and arrange safe campus meetups for exchanges.',
    step: '03',
  },
];

const partners = [
  { name: 'Stanford University', initials: 'SU', color: 'from-red-500 to-red-700' },
  { name: 'MIT', initials: 'MIT', color: 'from-gray-600 to-gray-800' },
  { name: 'UC Berkeley', initials: 'UCB', color: 'from-blue-600 to-yellow-500' },
  { name: 'Harvard University', initials: 'HU', color: 'from-red-800 to-red-950' },
  { name: 'UCLA', initials: 'UCLA', color: 'from-blue-500 to-yellow-400' },
  { name: 'NYU', initials: 'NYU', color: 'from-purple-600 to-purple-800' },
];

export function About() {
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (location.hash) {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    handleScroll();
    const timer = setTimeout(handleScroll, 200);
    return () => clearTimeout(timer);
  }, [location.hash]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-28">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                <Users className="w-4 h-4" />
                About CampusCart
              </span>
              <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-6">
                The Marketplace{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Built for Students
                </span>
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-8 max-w-lg">
                CampusCart is a student-only marketplace where verified college students can buy and sell items within
                their campus community. Safe, trusted, and designed exclusively for the student experience.
              </p>
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Join CampusCart <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
              </Link>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl">
                <ImageWithFallback
                  src="/1.png"
                  alt="Students studying together"
                  className="w-full h-80 lg:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section id="story" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              {...fadeUp}
              className="relative order-2 lg:order-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl">
                <ImageWithFallback
                  src="/our_story.png"
                  alt="University campus"
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
            </motion.div>
            <motion.div {...fadeUp} className="order-1 lg:order-2">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4" />
                Our Story
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                Born from a Campus Need
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400">
                <p>
                  CampusCart was created by students, for students. We saw how difficult it was to find affordable
                  textbooks, dorm essentials, and electronics within campus communities. Generic marketplaces felt
                  impersonal and unsafe for student-to-student transactions.
                </p>
                <p>
                  So we built a platform where verified college students can easily exchange books, electronics, furniture,
                  and everyday essentials right inside their own college. No strangers, no spam — just real students
                  helping each other save money and reduce waste.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/50 to-purple-50/50 dark:from-blue-950/20 dark:to-purple-950/20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-4">
              Simple Process
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              How It Works
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Getting started with CampusCart is easy. Follow these three simple steps to join the campus marketplace.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <div className="relative h-full bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-8 shadow-xl hover:shadow-2xl transition-all group">
                  <div className="absolute top-6 right-6 text-5xl font-bold text-blue-500/10 dark:text-blue-400/10">
                    {step.step}
                  </div>
                  <div className="relative mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <step.icon className="w-7 h-7 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                    {step.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="py-16 lg:py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-green-50/30 to-blue-50/30 dark:from-green-950/10 dark:to-blue-950/10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-medium mb-6">
                <Leaf className="w-4 h-4" />
                Sustainability
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-6">
                Buy Second-Hand,{' '}
                <span className="bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                  Save the Planet
                </span>
              </h2>
              <div className="space-y-4 text-neutral-600 dark:text-neutral-400 mb-8">
                <p>
                  Sustainability is at the heart of CampusCart’s mission, encouraging students to make smarter, eco-friendly choices in their everyday lives. Every time you choose to buy a second-hand item, you actively contribute to reducing waste and minimizing the demand for new production. Manufacturing new products often consumes large amounts of natural resources, energy, and water, while also generating significant carbon emissions. By giving pre-owned items a second life—whether it’s textbooks, electronics, furniture, or clothing—you help extend their lifecycle and keep them out of landfills. This simple shift in buying behavior can collectively make a meaningful impact on the environment.
                </p>
              </div>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-2xl blur-2xl"></div>
              <div className="relative rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-2xl">
                <ImageWithFallback
                  src="/sustainability.jpeg" 
                  style={{ height: 'fit-content' }}
                  alt="Sustainability"
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
