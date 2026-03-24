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
                  src="https://images.unsplash.com/photo-1625111380820-9a371d413cc4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMHN0dWR5aW5nJTIwdG9nZXRoZXJ8ZW58MXx8fHwxNzczMjk1MDMyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                  src="https://images.unsplash.com/photo-1631599143424-5bc234fbebf1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwYnVpbGRpbmd8ZW58MXx8fHwxNzczMjUyOTA0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
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
                <p>
                  Since our founding, CampusCart has grown to serve thousands of students across multiple universities,
                  facilitating tens of thousands of successful transactions and saving students an estimated $2 million collectively.
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

      {/* Campus Partners */}
      <section id="partners" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-600 dark:text-purple-400 text-sm font-medium mb-4">
              <GraduationCap className="w-4 h-4" />
              Campus Partners
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
              Trusted by Top Universities
            </h2>
            <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              CampusCart partners with leading universities to bring safe and verified student marketplaces to campuses nationwide.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-6 flex flex-col items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all cursor-default"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${partner.color} flex items-center justify-center shadow-md`}>
                  <span className="text-white font-bold text-xs">{partner.initials}</span>
                </div>
                <p className="text-xs font-medium text-neutral-700 dark:text-neutral-300 text-center">{partner.name}</p>
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
                  Every item sold on CampusCart is one less product that ends up in a landfill. By promoting the reuse of
                  textbooks, electronics, furniture, and clothing, we help students reduce their carbon footprint while
                  saving money.
                </p>
                <p>
                  Since launch, our community has prevented an estimated 15,000+ items from going to waste,
                  saving over 50 tons of CO2 emissions. That's the equivalent of planting 2,500 trees.
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { value: '15K+', label: 'Items Reused' },
                  { value: '50 tons', label: 'CO2 Saved' },
                  { value: '2,500', label: 'Trees Equivalent' },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white/40 dark:bg-white/5 backdrop-blur-md rounded-xl border border-white/20 dark:border-white/10 p-4 text-center"
                  >
                    <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-emerald-600 bg-clip-text text-transparent">
                      {stat.value}
                    </p>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">{stat.label}</p>
                  </div>
                ))}
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
                  src="https://images.unsplash.com/photo-1743082063778-bb0c2b04d2eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXN0YWluYWJsZSUyMHJlY3ljbGluZyUyMGdyZWVuJTIwZWFydGh8ZW58MXx8fHwxNzczMzI5NTgyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Sustainability"
                  className="w-full h-80 lg:h-96 object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers */}
      <section id="careers" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
            <div className="relative grid lg:grid-cols-2 gap-8 items-center p-8 lg:p-12">
              <motion.div {...fadeUp}>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                  <Briefcase className="w-4 h-4" />
                  Careers
                </span>
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 dark:text-white mb-4">
                  Join Our Team
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-6">
                  We're always looking for passionate students and recent graduates who want to make a difference.
                  Whether it's engineering, design, marketing, or community management — there's a place for you at CampusCart.
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  {['Engineering', 'Design', 'Marketing', 'Community', 'Operations'].map((role) => (
                    <span
                      key={role}
                      className="px-3 py-1.5 rounded-lg bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 text-sm text-neutral-700 dark:text-neutral-300"
                    >
                      {role}
                    </span>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative px-8 py-3.5 rounded-xl font-semibold text-white shadow-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    View Open Positions <ArrowRight className="w-5 h-5" />
                  </span>
                </motion.button>
              </motion.div>
              <motion.div
                {...fadeUp}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative hidden lg:block"
              >
                <div className="rounded-2xl overflow-hidden border border-white/20 dark:border-white/10 shadow-xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1758873268663-5a362616b5a7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaXZlcnNlJTIwdGVhbSUyMGNvbGxhYm9yYXRpb24lMjBzdGFydHVwfGVufDF8fHx8MTc3MzMyOTU4Mnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Team collaboration"
                    className="w-full h-80 object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
