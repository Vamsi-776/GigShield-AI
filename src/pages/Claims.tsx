import { useState } from 'react';
import ClaimTable from '../components/ClaimTable';
import StatCard from '../components/StatCard';
import { AlertCircle, TrendingUp } from 'lucide-react';
import { mockClaims } from '../utils/mockData';
import { formatCurrency } from '../utils/calculations';
import Reveal from '../components/Reveal';

export default function Claims() {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredClaims =
    filterStatus === 'all'
      ? mockClaims
      : mockClaims.filter((c) => c.status === filterStatus);

  const totalPayouts = mockClaims
    .filter((c) => c.payoutStatus === 'completed')
    .reduce((sum, c) => sum + c.incomeLoss, 0);

  const processingClaims = mockClaims.filter((c) => c.status === 'processing' || c.payoutStatus === 'in_progress').length;

  const stats = [
    {
      label: 'Total Claims',
      value: mockClaims.length,
      icon: <AlertCircle className="w-8 h-8" />,
    },
    {
      label: 'Paid Out',
      value: formatCurrency(totalPayouts),
      icon: <TrendingUp className="w-8 h-8" />,
    },
    {
      label: 'Processing',
      value: processingClaims,
      subtext: `${processingClaims} claim(s) in progress`,
    },
  ];

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Claims Automation</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Track income-loss claims and payout progress: detected → verified → approved → paid.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {stats.map((stat, idx) => (
            <StatCard
              key={idx}
              label={stat.label}
              value={stat.value}
              icon={stat.icon}
              subtext={stat.subtext}
            />
          ))}
        </div>

        <Reveal className="card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Recent Claims</h2>
            <div className="flex gap-2">
              {['all', 'triggered', 'approved', 'paid'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
                    filterStatus === status
                      ? 'bg-gradient-to-r from-blue-600 to-accent-600 text-white'
                      : 'bg-white/10 text-slate-200 border border-white/10 hover:bg-white/15 dark:text-slate-200'
                  }`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <ClaimTable claims={filteredClaims} />
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Claim Status Breakdown</h3>
            <div className="space-y-3">
              {[
                { status: 'Triggered', count: 1, color: 'bg-blue-500' },
                { status: 'Processing', count: 1, color: 'bg-yellow-500' },
                { status: 'Approved', count: 1, color: 'bg-green-500' },
              ].map((item) => (
                <div key={item.status} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${item.color}`} />
                    <span className="text-slate-700 dark:text-slate-200">{item.status}</span>
                  </div>
                  <span className="font-bold text-slate-900 dark:text-slate-50">{item.count}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">How Auto-Claims Work</h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                  1
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Claims are triggered automatically when disruptions are detected in your area</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                  2
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">You'll receive a notification about the triggered claim on your phone</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                  3
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">No paperwork required. Our AI validates and processes claims instantly</p>
              </div>
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center font-bold text-blue-600 text-sm">
                  4
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300">Approved claims are paid within 24-48 hours to your account</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
