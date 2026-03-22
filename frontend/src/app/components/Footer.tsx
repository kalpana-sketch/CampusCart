import { Link } from 'react-router';
import { ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative mt-auto">
      {/* Top gradient divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

      <div className="bg-white/30 dark:bg-white/5 backdrop-blur-xl border-t border-white/20 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Column */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Link to="/" className="inline-flex items-center gap-2 mb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur-md opacity-50"></div>
                  <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-1.5 rounded-lg">
                    <ShoppingBag className="w-5 h-5 text-white" />
                  </div>
                </div>
                <span className="font-bold text-lg text-neutral-900 dark:text-white">
                  Campus<span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Cart</span>
                </span>
              </Link>
              <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4 max-w-xs">
                The trusted student-only marketplace for buying and selling second-hand items on campus. Safe, simple, and sustainable.
              </p>
              <div className="flex items-center gap-3">
                {[
                  { icon: Facebook, label: 'Facebook' },
                  { icon: Twitter, label: 'Twitter' },
                  { icon: Instagram, label: 'Instagram' },
                  { icon: Youtube, label: 'YouTube' },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-9 h-9 flex items-center justify-center rounded-lg bg-white/40 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10 text-neutral-500 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/30 transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                ))}
              </div>
            </div>

            {/* About Us */}
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                About Us
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Our Story', href: '/about#story' },
                  { label: 'How It Works', href: '/about#how-it-works' },
                  { label: 'Campus Partners', href: '/about#partners' },
                  { label: 'Sustainability', href: '/about#sustainability' },
                  { label: 'Careers', href: '/about#careers' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Care */}
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                Customer Care
              </h3>
              <ul className="space-y-3">
                {[
                  { label: 'Help Center', href: '/customer-care?tab=help' },
                  { label: 'Safety Tips', href: '/customer-care?tab=safety' },
                  { label: 'Buyer Guide', href: '/customer-care?tab=buyer' },
                  { label: 'Seller Guide', href: '/customer-care?tab=seller' },
                  { label: 'Report an Issue', href: '/customer-care?tab=report' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link
                      to={item.href}
                      className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Us */}
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-4 text-sm uppercase tracking-wider">
                Contact Us
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <a href="mailto:support@campuscart.edu" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    support@campuscart.edu
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <a href="tel:+18005551234" className="text-sm text-neutral-600 dark:text-neutral-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                    +1 (800) 555-1234
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-neutral-400 mt-0.5 shrink-0" />
                  <span className="text-sm text-neutral-600 dark:text-neutral-400">
                    123 University Ave, Campus Hub, CA 90210
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10 dark:border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-xs text-neutral-500 dark:text-neutral-500">
              &copy; 2026 CampusCart. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-500">
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Privacy Policy</a>
              <span>&middot;</span>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Terms of Service</a>
              <span>&middot;</span>
              <a href="#" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">Cookie Policy</a>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-500 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-red-500 fill-red-500" /> for students
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}