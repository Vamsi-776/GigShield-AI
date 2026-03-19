import { CheckCircle, AlertCircle } from 'lucide-react';
import type { Policy } from '../types';
import { getStatusColor, formatCurrency, formatDate } from '../utils/calculations';
import Reveal from './Reveal';

interface PolicyCardProps {
  policy: Policy;
  onActivate?: () => void;
}

export default function PolicyCard({ policy, onActivate }: PolicyCardProps) {
  return (
    <Reveal className="card">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50">Weekly Policy</h3>
          <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">Coverage Details</p>
        </div>
        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(policy.status)}`}>
          {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
          <span className="text-slate-600 dark:text-slate-300">Weekly Premium</span>
          <span className="font-bold text-lg text-slate-900 dark:text-slate-50">{formatCurrency(policy.weeklyPremium)}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
          <span className="text-slate-600 dark:text-slate-300">Coverage Limit</span>
          <span className="font-bold text-lg text-slate-900 dark:text-slate-50">{formatCurrency(policy.coverageLimit)}</span>
        </div>
        <div className="flex justify-between items-center pb-4 border-b border-slate-200 dark:border-white/10">
          <span className="text-slate-600 dark:text-slate-300">Activated</span>
          <span className="text-sm text-slate-900 dark:text-slate-50">{formatDate(policy.activatedAt)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-600 dark:text-slate-300">Expires</span>
          <span className="text-sm text-slate-900 dark:text-slate-50">{formatDate(policy.expiresAt)}</span>
        </div>
      </div>

      {policy.status === 'inactive' && onActivate && (
        <button
          onClick={onActivate}
          className="btn-primary w-full"
        >
          Activate Policy Now
        </button>
      )}

      {policy.status === 'active' && (
        <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <CheckCircle className="w-5 h-5 text-green-600" />
          <span className="text-sm text-green-800 dark:text-green-200">Your policy is active and protecting you</span>
        </div>
      )}

      {policy.status === 'expired' && (
        <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-sm text-red-800 dark:text-red-200">Your policy has expired. Please renew.</span>
        </div>
      )}
    </Reveal>
  );
}
