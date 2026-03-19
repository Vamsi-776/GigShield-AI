import { AlertCircle, Check, Clock, XCircle } from 'lucide-react';
import type { Claim } from '../types';
import { getStatusColor, formatCurrency } from '../utils/calculations';

interface ClaimTableProps {
  claims: Claim[];
}

export default function ClaimTable({ claims }: ClaimTableProps) {
  const getProgressStep = (claim: Claim) => {
    if (claim.status === 'rejected' || claim.payoutStatus === 'failed') return -1;
    if (claim.payoutStatus === 'completed' || claim.status === 'paid') return 3;
    if (claim.status === 'triggered') return 0;
    if (claim.status === 'processing') return 1;
    if (claim.status === 'approved') return 2;
    return 0;
  };

  const steps = ['Detected', 'Verified', 'Approved', 'Paid'] as const;

  const getEventIcon = (eventType: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      rain: '🌧️',
      heat: '🌡️',
      pollution: '💨',
      curfew: '🚨',
      outage: '📡',
    };
    return icons[eventType] || '📌';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'triggered':
        return <AlertCircle className="w-4 h-4" />;
      case 'processing':
        return <Clock className="w-4 h-4" />;
      case 'approved':
        return <Check className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-slate-200">
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">Event Type</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">Location</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">Trigger Source</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">Claim Amount</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">Status</th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-slate-50">Payout Status</th>
          </tr>
        </thead>
        <tbody>
          {claims.map((claim) => (
            <tr
              key={claim.id}
              className="border-b border-slate-200 hover:bg-slate-100/60 dark:border-white/10 dark:hover:bg-white/5"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{getEventIcon(claim.eventType)}</span>
                  <span className="font-medium text-slate-900 dark:text-slate-50 capitalize">{claim.eventType}</span>
                </div>
              </td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-300">{claim.location}</td>
              <td className="px-6 py-4 text-slate-600 dark:text-slate-300 text-sm">{claim.triggerSource}</td>
              <td className="px-6 py-4 font-semibold text-slate-900 dark:text-slate-50">{formatCurrency(claim.incomeLoss)}</td>
              <td className="px-6 py-4">
                <div className="space-y-2">
                  <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(claim.status)}`}>
                    {getStatusIcon(claim.status)}
                    {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
                  </div>
                  <div className="flex items-center gap-2">
                    {steps.map((s, idx) => {
                      const step = getProgressStep(claim);
                      const done = step >= idx;
                      const isFailed = step === -1;
                      return (
                        <div key={s} className="flex items-center gap-2">
                          <div
                            className={`w-2.5 h-2.5 rounded-full ${isFailed ? 'bg-red-500' : done ? 'bg-emerald-400' : 'bg-white/30'}`}
                          />
                      <span className={`text-[10px] font-semibold whitespace-nowrap ${done ? 'text-emerald-300' : 'text-slate-500 dark:text-slate-400'}`}>
                            {s}
                          </span>
                          {idx !== steps.length - 1 && (
                            <div className={`h-px w-10 ${done ? 'bg-emerald-400/60' : 'bg-white/20'}`} />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(claim.payoutStatus)}`}>
                  {claim.payoutStatus === 'completed' ? <Check className="w-4 h-4" /> : claim.payoutStatus === 'failed' ? <XCircle className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                  {claim.payoutStatus.charAt(0).toUpperCase() + claim.payoutStatus.slice(1).replace(/_/g, ' ')}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
