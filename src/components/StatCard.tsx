import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { ReactNode } from 'react';
import Reveal from './Reveal';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: number;
  subtext?: string;
}

export default function StatCard({ label, value, icon, trend, subtext }: StatCardProps) {
  return (
    <Reveal className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-200 mb-2">{label}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{value}</p>
          {subtext && <p className="text-xs text-slate-500 dark:text-slate-300 mt-1">{subtext}</p>}
        </div>
        {icon && <div className="text-blue-600">{icon}</div>}
      </div>
      {trend !== undefined && (
        <div className={`flex items-center gap-1 text-sm font-semibold ${trend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {trend >= 0 ? (
            <ArrowUpRight className="w-4 h-4" />
          ) : (
            <ArrowDownLeft className="w-4 h-4" />
          )}
          {Math.abs(trend)}% from last week
        </div>
      )}
    </Reveal>
  );
}
