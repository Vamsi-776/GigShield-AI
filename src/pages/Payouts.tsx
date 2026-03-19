import Reveal from '../components/Reveal';
import { CheckCircle2, Clock3 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Payouts() {
  const rows = [
    { claim: 'c1', amount: '₹1,500', worker: 'Rajesh Kumar', eventType: 'Rain', method: 'UPI', status: 'Completed' },
    { claim: 'c2', amount: '₹2,000', worker: 'Rajesh Kumar', eventType: 'Heat', method: 'Bank Transfer', status: 'In Progress' },
    { claim: 'c3', amount: '₹800', worker: 'Rajesh Kumar', eventType: 'Outage', method: 'UPI', status: 'Pending' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Payout System</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Track payout status for income-loss claims.</p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="card mb-6 p-6 bg-gradient-to-br from-emerald-500/10 to-blue-600/10 border border-white/10"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-semibold text-slate-900 dark:text-slate-50">Latest payout successful</div>
              <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                ₹1,500 paid to <span className="font-semibold">Rajesh Kumar</span> for <span className="font-semibold">Rain</span>.
              </div>
            </div>
          </div>
          <div className="hidden sm:block text-right">
            <div className="text-xs text-slate-500 dark:text-slate-400">Status</div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Completed
            </div>
          </div>
        </div>
      </motion.div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-slate-600 dark:text-slate-300 border-b border-white/10">
                <th className="px-4 py-3 font-semibold">Claim Amount</th>
                <th className="px-4 py-3 font-semibold">Worker</th>
                <th className="px-4 py-3 font-semibold">Event Type</th>
                <th className="px-4 py-3 font-semibold">Payment Method</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, idx) => (
                <Reveal key={idx} className="contents">
                  <tr className="border-b border-white/5 hover:bg-white/5 dark:hover:bg-white/5">
                    <td className="px-4 py-4 font-semibold text-slate-900 dark:text-slate-100">{r.amount}</td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{r.worker}</td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{r.eventType}</td>
                    <td className="px-4 py-4 text-slate-700 dark:text-slate-200">{r.method}</td>
                    <td className="px-4 py-4">
                      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/10 text-sm text-slate-200">
                        {r.status === 'Completed' ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Clock3 className="w-4 h-4 text-amber-300" />}
                        {r.status}
                      </div>
                    </td>
                  </tr>
                </Reveal>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

