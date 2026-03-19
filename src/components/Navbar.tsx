import { Menu, X, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Risk Insights', href: '/risk-insights' },
    { label: 'Coverage Plans', href: '/coverage-plans' },
    { label: 'Live Disruptions', href: '/live-disruptions' },
    { label: 'Claims', href: '/claims' },
    { label: 'Fraud Detection', href: '/fraud-detection' },
    { label: 'Payouts', href: '/payouts' },
    { label: 'Analytics', href: '/analytics' },
    { label: 'Admin Panel', href: '/admin' },
    { label: 'Settings', href: '/settings' },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="sticky top-0 z-50 bg-gradient-to-r from-slate-950/95 to-slate-900/95 backdrop-blur border-b border-white/10 shadow-soft"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-accent-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">IG</span>
            </div>
            <span className="font-bold text-lg gradient-text">InsureGig</span>
          </Link>

          <div className="hidden md:flex gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="relative text-slate-200 hover:text-white transition-colors font-medium py-2"
              >
                <span className="relative z-10">{link.label}</span>
                {location.pathname === link.href && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-blue-600 to-accent-600"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors" type="button" aria-label="Logout">
              <LogOut className="w-5 h-5 text-slate-200" />
            </button>
          </div>

          <motion.button
            className="md:hidden p-2 text-slate-200"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              className="md:hidden pb-4 overflow-hidden"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
            >
              <div className="space-y-2 pt-2 max-h-[70vh] overflow-y-auto pr-1">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2, delay: idx * 0.03 }}
                  >
                    <Link
                      to={link.href}
                      className="block px-4 py-2 text-slate-200 hover:bg-white/10 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
