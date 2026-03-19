import Reveal from '../components/Reveal';
import { CloudRain, ThermometerSun, Wind, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function LiveDisruptions() {
  const events = [
    {
      title: 'Heavy Rain Detected',
      icon: CloudRain,
      gradient: 'from-blue-600/25 to-accent-600/15',
      location: 'Bangalore • Whitefield',
      time: 'Just now',
      incomeLoss: '₹1,500',
    },
    {
      title: 'Extreme Heat Alert',
      icon: ThermometerSun,
      gradient: 'from-amber-500/25 to-red-500/15',
      location: 'Bangalore • Indiranagar',
      time: '2 minutes ago',
      incomeLoss: '₹2,000',
    },
    {
      title: 'Pollution Spike',
      icon: Wind,
      gradient: 'from-violet-500/25 to-accent-600/15',
      location: 'Delhi • Connaught Place',
      time: '8 minutes ago',
      incomeLoss: '₹900',
    },
    {
      title: 'Local Curfew',
      icon: AlertTriangle,
      gradient: 'from-red-500/25 to-accent-600/15',
      location: 'Mumbai • Andheri',
      time: '14 minutes ago',
      incomeLoss: '₹1,200',
    },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Live Disruption Monitoring</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">
          Income loss events are detected in real time and auto-claims are triggered automatically.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((e) => {
          const Icon = e.icon;
          return (
            <Reveal key={e.title} className="card p-6">
              <div className={`rounded-2xl border border-white/10 bg-gradient-to-br ${e.gradient} p-4`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 text-white/95" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-100">{e.title}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                        Location: <span className="font-semibold">{e.location}</span>
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                        Time detected: <span className="font-semibold">{e.time}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-200">
                      Auto claim
                    </div>
                    <motion.div
                      className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-sm text-slate-200"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <motion.span
                        className="w-2 h-2 rounded-full bg-emerald-400"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                      Triggered
                    </motion.div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4">
                  <div className="text-sm text-slate-600 dark:text-slate-300">
                    Income loss estimate: <span className="font-semibold text-slate-900 dark:text-slate-50">{e.incomeLoss}</span>
                  </div>
                </div>

                <div className="mt-4 w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 to-accent-600"
                    initial={{ width: '20%' }}
                    animate={{ width: ['20%', '70%', '40%'] }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

