import type { ReactNode } from 'react';
import { useEffect, useMemo, useState } from 'react';
import {
  LayoutDashboard,
  Radar,
  Package,
  Radio,
  FileText,
  ShieldAlert,
  Wallet,
  BarChart3,
  UserCog,
  Settings,
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

export default function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    try {
      return localStorage.getItem('gs.sidebar.collapsed') === '1';
    } catch {
      return false;
    }
  });
  const [dark, setDark] = useState<boolean>(() => {
    try {
      return localStorage.getItem('gs.theme') === 'dark';
    } catch {
      return false;
    }
  });

  const navItems: NavItem[] = useMemo(
    () => [
      { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
      { label: 'Risk Insights', href: '/risk-insights', icon: <Radar className="w-5 h-5" /> },
      { label: 'Coverage Plans', href: '/coverage-plans', icon: <Package className="w-5 h-5" /> },
      { label: 'Live Disruptions', href: '/live-disruptions', icon: <Radio className="w-5 h-5" /> },
      { label: 'Claims', href: '/claims', icon: <FileText className="w-5 h-5" /> },
      { label: 'Fraud Detection', href: '/fraud-detection', icon: <ShieldAlert className="w-5 h-5" /> },
      { label: 'Payouts', href: '/payouts', icon: <Wallet className="w-5 h-5" /> },
      { label: 'Analytics', href: '/analytics', icon: <BarChart3 className="w-5 h-5" /> },
      { label: 'Admin Panel', href: '/admin', icon: <UserCog className="w-5 h-5" /> },
      { label: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
    ],
    []
  );

  const [hovering, setHovering] = useState(false);
  const effectiveCollapsed = collapsed && !hovering;

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('gs.theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    localStorage.setItem('gs.sidebar.collapsed', collapsed ? '1' : '0');
  }, [collapsed]);

  return (
    <motion.aside
      className="hidden lg:flex flex-col"
      initial={false}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      animate={{ width: effectiveCollapsed ? 88 : 280 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <div className="h-screen sticky top-0 flex flex-col border-r border-white/10 bg-slate-950/30 dark:bg-slate-950/40 backdrop-blur-xl">
        <div className="p-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-accent-600 flex items-center justify-center text-white font-bold">
              IG
            </div>
            <AnimatePresence initial={false}>
              {!effectiveCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-lg"
                >
                  InsureGig
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setCollapsed((v) => !v)}
            className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-200"
            aria-label="Toggle sidebar"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </motion.button>
        </div>

        <nav className="px-3 pb-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.href;
            return (
              <Link key={item.href} to={item.href}>
                <motion.div
                  className="relative"
                  initial={false}
                  animate={active ? { scale: 1 } : { scale: 1 }}
                >
                  {active && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute inset-y-0 left-0 right-0 rounded-2xl bg-gradient-to-r from-blue-600/30 to-accent-600/30 border border-white/10"
                    />
                  )}

                  <div className="relative flex items-center gap-3 px-3 py-2.5 rounded-2xl text-slate-200 hover:text-white transition-colors">
                    <div
                      className={
                        active ? 'text-white' : 'text-slate-300'
                      }
                    >
                      {item.icon}
                    </div>

                    <AnimatePresence initial={false}>
                      {!effectiveCollapsed && (
                        <motion.span
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -8 }}
                          className="font-medium"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto p-3 border-t border-white/10">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center text-slate-200">
                {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
              </div>
              <AnimatePresence initial={false}>
              {!effectiveCollapsed && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-sm text-slate-200"
                  >
                    {dark ? 'Dark' : 'Light'}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setDark((v) => !v)}
              className="p-2 rounded-lg hover:bg-white/5 transition-colors text-slate-200"
              aria-label="Toggle theme"
            >
              <span className="sr-only">Toggle theme</span>
              {dark ? <Moon className="w-4 h-4 opacity-90" /> : <Sun className="w-4 h-4 opacity-90" />}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}

