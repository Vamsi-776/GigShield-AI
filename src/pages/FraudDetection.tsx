import { AlertTriangle, ShieldCheck, ShieldAlert } from 'lucide-react';
import FraudAlertCard from '../components/FraudAlertCard';
import StatCard from '../components/StatCard';
import { mockFraudAlerts, mockAdminMetrics } from '../utils/mockData';
import Reveal from '../components/Reveal';

export default function FraudDetection() {
  const highSeverity = mockFraudAlerts.filter((a) => a.severity === 'high').length;
  const mediumSeverity = mockFraudAlerts.filter((a) => a.severity === 'medium').length;
  const lowSeverity = mockFraudAlerts.filter((a) => a.severity === 'low').length;

  const fraudRiskScore = (() => {
    const weights: Record<string, number> = { low: 25, medium: 60, high: 90 };
    const total = mockFraudAlerts.length || 1;
    const weighted = mockFraudAlerts.reduce((sum, a) => sum + (weights[a.severity] ?? 25), 0);
    return Math.round(weighted / total);
  })();

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Fraud Detection</h1>
          <p className="text-slate-600 dark:text-slate-300">
            AI monitoring for suspicious patterns to protect income-loss payouts.
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <StatCard label="Total Alerts" value={mockAdminMetrics.fraudAlerts} icon={<ShieldAlert className="w-8 h-8" />} />
          <StatCard label="High Severity" value={highSeverity} subtext="Immediate review" />
          <StatCard label="Medium Severity" value={mediumSeverity} subtext="Investigating" />
          <StatCard label="Low Severity" value={lowSeverity} subtext="Monitoring" />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Reveal className="card p-6 lg:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Fraud Risk Score</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              Weighted score across recent signals.
            </p>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-5xl font-extrabold bg-gradient-to-r from-blue-600 to-accent-600 bg-clip-text text-transparent">
                {fraudRiskScore}
              </div>
              <div className="mt-2 text-sm text-slate-600 dark:text-slate-300">/100</div>
              <div className="mt-4 w-full h-2 rounded-full bg-white/10 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full"
                  style={{ width: `${fraudRiskScore}%` }}
                />
              </div>
              <div className="mt-3 flex items-center gap-2 text-sm text-amber-300">
                <AlertTriangle className="w-4 h-4" />
                {fraudRiskScore > 70 ? 'High risk window' : fraudRiskScore > 40 ? 'Moderate risk window' : 'Low risk window'}
              </div>
            </div>
          </Reveal>

          <Reveal className="card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50">Fraud alerts</h3>
              <div className="text-sm text-slate-600 dark:text-slate-300">Warning colors, AI-verified signals</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {mockFraudAlerts.map((alert) => (
                <FraudAlertCard key={alert.id} alert={alert} />
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="card p-6 bg-gradient-to-br from-blue-600/10 to-accent-600/10 border border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-2">Why fraud monitoring matters</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                GigShield AI focuses on income-loss only. Fraud detection ensures payouts go to eligible workers when disruptions are verified, not to unrelated categories like health, accidents, vehicles, or life coverage.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
