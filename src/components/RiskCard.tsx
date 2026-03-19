import { Cloud, Thermometer, Wind, ShieldAlert, CloudRain } from 'lucide-react';
import Reveal from './Reveal';

interface RiskCardProps {
  title: string;
  risk: number;
  icon: 'rain' | 'flood' | 'heat' | 'pollution' | 'curfew';
}

export default function RiskCard({ title, risk, icon }: RiskCardProps) {
  const icons = {
    rain: Cloud,
    flood: CloudRain,
    heat: Thermometer,
    pollution: Wind,
    curfew: ShieldAlert,
  };

  const IconComponent = icons[icon];

  const getRiskColor = (score: number) => {
    if (score < 40) return 'text-green-800 dark:text-emerald-200 bg-green-100 dark:bg-emerald-500/15 border border-green-200/50 dark:border-emerald-400/20';
    if (score < 70) return 'text-yellow-800 dark:text-yellow-200 bg-yellow-100 dark:bg-yellow-500/15 border border-yellow-200/50 dark:border-yellow-400/20';
    return 'text-red-800 dark:text-red-200 bg-red-100 dark:bg-red-500/15 border border-red-200/50 dark:border-red-400/20';
  };

  const getProgressColor = (score: number) => {
    if (score < 40) return 'bg-green-500';
    if (score < 70) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <Reveal className="card">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm text-slate-600 dark:text-slate-200 mb-1">{title}</p>
          <p className="text-3xl font-bold text-slate-900 dark:text-slate-50">{risk}%</p>
        </div>
        <div className={`p-3 rounded-lg ${getRiskColor(risk)}`}>
          <IconComponent className="w-6 h-6" />
        </div>
      </div>
      <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${getProgressColor(risk)}`}
          style={{ width: `${risk}%` }}
        />
      </div>
    </Reveal>
  );
}
