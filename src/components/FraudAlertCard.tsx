import { MapPin, Copy, Cloud, Activity } from 'lucide-react';
import type { FraudAlert } from '../types';
import { formatDate } from '../utils/calculations';
import Reveal from './Reveal';
import type { ReactNode } from 'react';

interface FraudAlertCardProps {
  alert: FraudAlert;
}

export default function FraudAlertCard({ alert }: FraudAlertCardProps) {
  const severityColors = {
    low: 'bg-blue-100 border-blue-300 text-blue-800',
    medium: 'bg-yellow-100 border-yellow-300 text-yellow-800',
    high: 'bg-red-100 border-red-300 text-red-800',
  };

  const typeLabels: { [key: string]: string } = {
    gps_mismatch: 'GPS Spoofing',
    duplicate_claim: 'Duplicate Claims',
    fake_weather: 'Weather Mismatch',
    unusual_pattern: 'Unusual Activity',
  };

  const typeIcons: { [key: string]: ReactNode } = {
    gps_mismatch: <MapPin className="w-6 h-6" />,
    duplicate_claim: <Copy className="w-6 h-6" />,
    fake_weather: <Cloud className="w-6 h-6" />,
    unusual_pattern: <Activity className="w-6 h-6" />,
  };

  return (
    <Reveal className={`card border-2 ${severityColors[alert.severity]}`}>
      <div className="flex items-start gap-4">
        <div className="pt-1">
          {typeIcons[alert.type]}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-slate-900 dark:text-slate-50">{typeLabels[alert.type]}</h3>
            <span className="text-xs font-bold uppercase opacity-75">{alert.severity}</span>
          </div>
          <p className="text-sm opacity-90 text-slate-700 dark:text-slate-200 mb-2">{alert.description}</p>
          <p className="text-xs opacity-75 text-slate-600 dark:text-slate-300">
            Detected: {formatDate(alert.detectedAt)}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
