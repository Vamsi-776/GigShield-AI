import { useState } from 'react';
import { Bell, ShieldCheck, Moon, Sun } from 'lucide-react';

export default function Settings() {
  const [dark, setDark] = useState<boolean>(() => {
    if (typeof document === 'undefined') return false;
    return document.documentElement.classList.contains('dark');
  });
  const [notifications, setNotifications] = useState(true);
  const [autoUpdates, setAutoUpdates] = useState(true);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('gs.theme', next ? 'dark' : 'light');
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Settings</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Personalize your experience for income protection.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Moon className="w-5 h-5 text-blue-600" />
            <div className="font-semibold">Theme</div>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm text-slate-600 dark:text-slate-300">Dark mode</div>
            <button
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg bg-white/10 border border-white/10 hover:bg-white/15 transition-colors text-slate-200"
            >
              {dark ? <span className="inline-flex items-center gap-2"><Moon className="w-4 h-4" /> Enabled</span> : <span className="inline-flex items-center gap-2"><Sun className="w-4 h-4" /> Disabled</span>}
            </button>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center gap-3 mb-3">
            <Bell className="w-5 h-5 text-blue-600" />
            <div className="font-semibold">Notifications</div>
          </div>
          <div className="space-y-4">
            <label className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span>Risk alerts</span>
              <input type="checkbox" checked={notifications} onChange={(e) => setNotifications(e.target.checked)} />
            </label>
            <label className="flex items-center justify-between gap-3 text-sm text-slate-600 dark:text-slate-300">
              <span>Auto updates</span>
              <input type="checkbox" checked={autoUpdates} onChange={(e) => setAutoUpdates(e.target.checked)} />
            </label>
          </div>
        </div>

        <div className="card p-6 md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <ShieldCheck className="w-5 h-5 text-accent-600" />
            <div className="font-semibold">Insurance Scope</div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            GigShield AI covers <span className="font-semibold text-slate-900 dark:text-slate-100">income loss</span> caused by external disruptions like heavy rain,
            extreme heat, pollution spikes, and curfews. It does not include health, accident, vehicle repair, or life insurance.
          </p>
        </div>
      </div>
    </div>
  );
}

