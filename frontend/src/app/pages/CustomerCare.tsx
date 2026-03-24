import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { motion } from 'motion/react';
import {
  HelpCircle,
  Shield,
  ShoppingCart,
  Tag,
  AlertTriangle,
  ChevronDown,
  Search,
  MessageSquare,
  CheckCircle,
  Eye,
  Lock,
  MapPin,
  DollarSign,
  Camera,
  Send,
  User,
  Mail,
} from 'lucide-react';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.6 },
};

const faqs = [
  {
    question: 'How do I create an account on CampusCart?',
    answer:
      'Sign up using your verified university .edu email address. Fill in your details including name, year, and major. Once your email is verified, you can start buying and selling immediately.',
  },
  {
    question: 'Is CampusCart free to use?',
    answer:
      'Yes! CampusCart is completely free for students. There are no listing fees, no transaction fees, and no hidden charges. We believe in making student life easier and more affordable.',
  },
  {
    question: 'How do I contact a seller?',
    answer:
      'Click on any item listing to view its details, then use the "Chat with Seller" button to send a direct message. All conversations are kept within the platform for your safety.',
  },
  {
    question: 'Can I sell items from outside my campus?',
    answer:
      'CampusCart is designed for intra-campus transactions to ensure safety. You can only list and browse items within your verified university community.',
  },
  {
    question: 'What happens if I receive a defective item?',
    answer:
      'Contact the seller through our chat system first. If you cannot resolve the issue, use the "Report an Issue" form below and our team will mediate the situation within 48 hours.',
  },
  {
    question: 'How do I delete my account?',
    answer:
      'Go to Settings in your profile menu and scroll to the bottom. Click "Delete Account" and confirm. Note that this action is permanent and all your listings and messages will be removed.',
  },
];

const safetyTips = [
  {
    icon: MapPin,
    title: 'Meet in Public Places',
    description: 'Always arrange meetups in well-lit, public campus locations like the library, student center, or campus cafe.',
  },
  {
    icon: Eye,
    title: 'Inspect Before Buying',
    description: 'Check the item thoroughly before completing the transaction. Verify it matches the listing description and photos.',
  },
  {
    icon: Lock,
    title: 'Keep It On Platform',
    description: 'Communicate through CampusCart chat only. Avoid sharing personal phone numbers or social media with strangers.',
  },
  {
    icon: DollarSign,
    title: 'Use Secure Payments',
    description: 'Prefer digital payments over cash. Never send payment before receiving the item, and always get a receipt.',
  },
  {
    icon: AlertTriangle,
    title: 'Trust Your Instincts',
    description: 'If a deal seems too good to be true, it probably is. Report suspicious listings or users immediately.',
  },
  {
    icon: Shield,
    title: 'Verify Seller Profiles',
    description: 'Check the seller\'s reviews, rating, and account age. Verified students with positive feedback are more trustworthy.',
  },
];

const buyerSteps = [
  {
    icon: Search,
    title: 'Search & Browse',
    description: 'Use the search bar or browse by category to find items you need. Filter by price, condition, and category.',
  },
  {
    icon: Eye,
    title: 'Review Listings',
    description: 'Check photos, descriptions, seller ratings, and reviews. Compare prices across similar listings.',
  },
  {
    icon: MessageSquare,
    title: 'Chat with Seller',
    description: 'Ask questions about the item, negotiate price, and arrange a safe campus meetup for the exchange.',
  },
  {
    icon: CheckCircle,
    title: 'Complete Purchase',
    description: 'Meet the seller, inspect the item, make payment, and leave a review to help other students.',
  },
];

const sellerSteps = [
  {
    icon: Camera,
    title: 'Take Great Photos',
    description: 'Capture clear, well-lit photos from multiple angles. Show any wear or defects honestly.',
  },
  {
    icon: Tag,
    title: 'Set Fair Price',
    description: 'Research similar items on CampusCart to price competitively. Consider the item\'s condition and original value.',
  },
  {
    icon: MessageSquare,
    title: 'Respond Quickly',
    description: 'Reply to buyer messages promptly. Quick responses build trust and lead to faster sales.',
  },
  {
    icon: CheckCircle,
    title: 'Complete the Sale',
    description: 'Arrange a safe campus meetup, hand over the item, receive payment, and mark the listing as sold.',
  },
];

const issueTypes = [
  'Item not as described',
  'Seller not responding',
  'Payment issue',
  'Account problem',
  'Safety concern',
  'Bug report',
  'Feature request',
  'Other',
];

export function CustomerCare() {
  const [searchParams] = useSearchParams();
  const tabParam = searchParams.get('tab') as 'help' | 'safety' | 'buyer' | 'seller' | 'report' | null;
  
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'help' | 'safety' | 'buyer' | 'seller' | 'report'>(tabParam || 'help');

  useEffect(() => {
    if (tabParam) {
      setActiveTab(tabParam);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [tabParam]);
  const [formData, setFormData] = useState({ name: '', email: '', issueType: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({ name: '', email: '', issueType: '', message: '' });
    }, 3000);
  };

  const tabs = [
    { id: 'help' as const, label: 'Help Center', icon: HelpCircle },
    { id: 'safety' as const, label: 'Safety Tips', icon: Shield },
    { id: 'buyer' as const, label: 'Buyer Guide', icon: ShoppingCart },
    { id: 'seller' as const, label: 'Seller Guide', icon: Tag },
    { id: 'report' as const, label: 'Report Issue', icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div {...fadeUp}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
              <HelpCircle className="w-4 h-4" />
              Customer Care
            </span>
            <h1 className="text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
              How Can We{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Help You?
              </span>
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
              Find answers, stay safe, and get the most out of CampusCart. We're here to support you every step of the way.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          {...fadeUp}
          className="flex flex-wrap justify-center gap-2 sm:gap-3"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-sm font-medium transition-all border ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white border-transparent shadow-lg shadow-blue-500/25'
                  : 'bg-white/40 dark:bg-white/5 backdrop-blur-md border-white/20 dark:border-white/10 text-neutral-600 dark:text-neutral-400 hover:bg-white/60 dark:hover:bg-white/10'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
            </button>
          ))}
        </motion.div>
      </div>

      {/* Tab Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 lg:pb-24">
        {/* Help Center - FAQs */}
        {activeTab === 'help' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Frequently Asked Questions</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Quick answers to common questions about CampusCart.</p>
            </div>
            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-xl border border-white/20 dark:border-white/10 overflow-hidden shadow-sm"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-neutral-900 dark:text-white pr-4">{faq.question}</span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown className="w-5 h-5 text-neutral-400 shrink-0" />
                    </motion.div>
                  </button>
                  {openFaq === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      className="px-5 pb-5"
                    >
                      <p className="text-neutral-600 dark:text-neutral-400 border-t border-white/10 pt-4">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Safety Tips */}
        {activeTab === 'safety' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Safety Tips</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Stay safe while buying and selling on campus.</p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {safetyTips.map((tip, index) => (
                <motion.div
                  key={tip.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08 }}
                  className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-lg hover:shadow-xl transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-md mb-4 group-hover:scale-110 transition-transform">
                    <tip.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{tip.title}</h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400">{tip.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Buyer Guide */}
        {activeTab === 'buyer' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Buyer Guide</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Everything you need to know about buying on CampusCart.</p>
            </div>
            <div className="relative">
              {/* Connector line */}
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-blue-500/30 via-purple-500/30 to-blue-500/30"></div>
              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
                {buyerSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.12 }}
                    className={`relative ${index % 2 === 1 ? 'lg:mt-16' : ''}`}
                  >
                    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-lg hover:shadow-xl transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                          <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                            {index + 1}
                          </div>
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600/10 to-purple-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <step.icon className="w-7 h-7 text-blue-600 dark:text-blue-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Seller Guide */}
        {activeTab === 'seller' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Seller Guide</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Tips and steps for posting items and making sales.</p>
            </div>
            <div className="relative">
              <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-purple-500/30 via-blue-500/30 to-purple-500/30"></div>
              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8">
                {sellerSteps.map((step, index) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.12 }}
                    className={`relative ${index % 2 === 1 ? 'lg:mt-16' : ''}`}
                  >
                    <div className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-6 shadow-lg hover:shadow-xl transition-all group">
                      <div className="flex items-start gap-4">
                        <div className="relative shrink-0">
                          <div className="absolute -top-1 -left-1 w-6 h-6 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold shadow-md">
                            {index + 1}
                          </div>
                          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600/10 to-blue-600/10 border border-purple-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <step.icon className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                          </div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{step.title}</h3>
                          <p className="text-sm text-neutral-600 dark:text-neutral-400">{step.description}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Report an Issue */}
        {activeTab === 'report' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-2xl mx-auto"
          >
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Report an Issue</h2>
              <p className="text-neutral-600 dark:text-neutral-400">Let us know what's wrong and we'll get back to you within 48 hours.</p>
            </div>

            {formSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-green-500/20 p-12 shadow-xl text-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Report Submitted!</h3>
                <p className="text-neutral-600 dark:text-neutral-400">We've received your report. Our team will review it and get back to you within 48 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white/40 dark:bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 dark:border-white/10 p-8 shadow-xl space-y-6">
                {/* Name */}
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
                      placeholder="Your full name"
                      className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-sm transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                    Email Address
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

                {/* Issue Type */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                    Issue Type
                  </label>
                  <div className="relative">
                    <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <select
                      required
                      value={formData.issueType}
                      onChange={(e) => setFormData({ ...formData, issueType: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white shadow-sm transition-all appearance-none"
                    >
                      <option value="" disabled>Select an issue type</option>
                      {issueTypes.map((type) => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-neutral-900 dark:text-white mb-2">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your issue in detail..."
                    className="w-full px-4 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900 dark:text-white placeholder-neutral-400 shadow-sm transition-all resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative w-full px-6 py-3.5 rounded-xl font-semibold text-white shadow-lg overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"></div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-white/20 to-purple-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Submit Report
                  </span>
                </motion.button>
              </form>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
