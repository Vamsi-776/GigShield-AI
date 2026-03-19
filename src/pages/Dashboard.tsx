import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { AlertCircle, TrendingUp, Shield, AlertTriangle, CloudRain, ThermometerSun, Wind, Zap, ArrowRight } from 'lucide-react';
import StatCard from '../components/StatCard';
import Reveal from '../components/Reveal';
import { mockWorker, mockWeeklyData, mockPayoutHistory, mockClaims, mockRiskAssessment } from '../utils/mockData';
import { calculateRiskScore, getRiskLevel, formatCurrency } from '../utils/calculations';

export default function Dashboard() {
  const totalEarningsProtected = mockWeeklyData.reduce((sum, d) => sum + d.covered, 0);
  const riskScore = calculateRiskScore(
    mockRiskAssessment.rainRisk,
    mockRiskAssessment.heatRisk,
    mockRiskAssessment.pollutionRisk,
    mockRiskAssessment.curfewRisk
  );
  const riskLevel = getRiskLevel(riskScore);

  const nextRiskAlert = (() => {
    const items = [
      { key: 'Rain', v: mockRiskAssessment.rainRisk, icon: CloudRain },
      { key: 'Heat', v: mockRiskAssessment.heatRisk, icon: ThermometerSun },
      { key: 'Pollution', v: mockRiskAssessment.pollutionRisk, icon: Wind },
      { key: 'Curfew', v: mockRiskAssessment.curfewRisk, icon: AlertTriangle },
    ];
    const top = items.sort((a, b) => b.v - a.v)[0];
    const days = top.key === 'Heat' ? 2 : top.key === 'Rain' ? 1 : top.key === 'Pollution' ? 3 : 4;
    return `${days} day${days === 1 ? '' : 's'} (${top.key} likely)`;
  })();

  const activeClaims = mockClaims.filter((c) => c.status === 'processing' || c.payoutStatus === 'in_progress').length;

  const riskAlerts = [
    { label: 'Rain', score: mockRiskAssessment.rainRisk, incomeLoss: 1500, icon: CloudRain },
    { label: 'Heat', score: mockRiskAssessment.heatRisk, incomeLoss: 2000, icon: ThermometerSun },
    { label: 'Pollution', score: mockRiskAssessment.pollutionRisk, incomeLoss: 900, icon: Wind },
    { label: 'Curfew', score: mockRiskAssessment.curfewRisk, incomeLoss: 1200, icon: AlertTriangle },
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Worker Dashboard</h1>
              <p className="text-slate-600 dark:text-slate-300">
                {mockWorker.platform} • {mockWorker.city}, {mockWorker.zone} • Coverage for income loss only
              </p>
            </div>
            <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/50 dark:bg-slate-900/40 border border-white/10">
              <Zap className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-slate-700 dark:text-slate-200">AI signals active</span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard label="Weekly Coverage Active" value={formatCurrency(3000)} icon={<Shield className="w-8 h-8" />} trend={12} />
          <StatCard label="Protected Income" value={formatCurrency(totalEarningsProtected)} icon={<TrendingUp className="w-8 h-8" />} />
          <StatCard
            label="Risk Level"
            value={riskLevel.toUpperCase()}
            icon={<AlertTriangle className="w-8 h-8" />}
            subtext={`${riskScore}/100 AI risk score`}
          />
          <StatCard
            label="Next Risk Alert"
            value={nextRiskAlert}
            icon={<AlertCircle className="w-8 h-8" />}
            subtext={`${activeClaims} active claim(s)`}
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Reveal className="card p-6 lg:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Weekly Earnings Protected</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" />
                  <XAxis dataKey="day" stroke="rgba(148,163,184,0.9)" />
                  <YAxis stroke="rgba(148,163,184,0.9)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: 10,
                      color: '#f1f5f9',
                    }}
                    formatter={(value) => {
                      const num = typeof value === 'number' ? value : Number(value);
                      if (Number.isNaN(num)) return ['-', 'Protected (₹)'];
                      return [formatCurrency(num), 'Protected (₹)'];
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="covered"
                    stroke="#0ea5e9"
                    strokeWidth={3}
                    dot={{ r: 3, fill: '#0ea5e9' }}
                    name="Protected (₹)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <Reveal className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">Live Weather Risk</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-5">Rain, heat, and pollution signals for your delivery zone.</p>

            {[
              { label: 'Rain probability', v: mockRiskAssessment.rainRisk, color: 'from-blue-600 to-accent-600', icon: CloudRain },
              { label: 'Heat risk', v: mockRiskAssessment.heatRisk, color: 'from-amber-500 to-red-500', icon: ThermometerSun },
              { label: 'Pollution risk', v: mockRiskAssessment.pollutionRisk, color: 'from-violet-500 to-accent-600', icon: Wind },
            ].map((r) => (
              <div key={r.label} className="mb-4 last:mb-0">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <r.icon className="w-4 h-4 text-blue-600" />
                    <div className="text-sm text-slate-700 dark:text-slate-200">{r.label}</div>
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{r.v}%</div>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className={`h-full bg-gradient-to-r ${r.color} rounded-full`} style={{ width: `${r.v}%` }} />
                </div>
              </div>
            ))}
          </Reveal>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Reveal className="card p-6 lg:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Disruptions This Month</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockWeeklyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" />
                  <XAxis dataKey="day" stroke="rgba(148,163,184,0.9)" />
                  <YAxis stroke="rgba(148,163,184,0.9)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: 10,
                      color: '#f1f5f9',
                    }}
                  />
                  <Bar dataKey="disruptions" fill="#ef4444" radius={[12, 12, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <Reveal className="card p-6 lg:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Claim Payout Trend</h3>
            <div className="h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockPayoutHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" />
                  <XAxis dataKey="date" stroke="rgba(148,163,184,0.9)" />
                  <YAxis stroke="rgba(148,163,184,0.9)" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      border: 'none',
                      borderRadius: 10,
                      color: '#f1f5f9',
                    }}
                    formatter={(value) => {
                      const num = typeof value === 'number' ? value : Number(value);
                      if (Number.isNaN(num)) return ['-', 'Payout (₹)'];
                      return [formatCurrency(num), 'Payout (₹)'];
                    }}
                  />
                  <Line type="monotone" dataKey="amount" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 3, fill: '#8b5cf6' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Reveal>

          <Reveal className="card p-6 lg:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Today's Risk Alerts</h3>
            <div className="space-y-3">
              {riskAlerts.map((a) => (
                <div key={a.label} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      <a.icon className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-50">{a.label}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">Income loss estimate: {formatCurrency(a.incomeLoss)}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        Auto claim: <span className="text-emerald-400 font-semibold">Triggered on coverage</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-slate-900 dark:text-slate-50">{a.score}%</div>
                    <div className="flex items-center justify-end gap-2 mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-xs text-emerald-300">Live</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 pt-4 border-t border-white/10">
              <Link to="/live-disruptions" className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-300 font-semibold hover:underline">
                View live disruptions <ArrowRight />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Link
                to="/coverage-plans"
                className="block p-4 bg-gradient-to-br from-blue-600/10 to-accent-600/10 border border-white/10 rounded-2xl hover:shadow-medium transition-all duration-300"
              >
                <div className="font-semibold text-slate-900 dark:text-slate-50">View Coverage Plans</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">Choose the weekly tier that matches your income.</div>
              </Link>
              <Link
                to="/claims"
                className="block p-4 bg-gradient-to-br from-accent-600/10 to-blue-600/10 border border-white/10 rounded-2xl hover:shadow-medium transition-all duration-300"
              >
                <div className="font-semibold text-slate-900 dark:text-slate-50">Track Claims</div>
                <div className="text-sm text-slate-600 dark:text-slate-300">See detected → verified → approved → paid progress.</div>
              </Link>
            </div>
          </Reveal>

          <Reveal className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {mockClaims.slice(0, 3).map((claim) => (
                <div key={claim.id} className="flex items-start justify-between gap-4 rounded-2xl border border-white/10 bg-white/5 p-3">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">
                      {claim.eventType === 'rain' && '🌧️'}
                      {claim.eventType === 'heat' && '🌡️'}
                      {claim.eventType === 'pollution' && '💨'}
                      {claim.eventType === 'curfew' && '🚨'}
                      {claim.eventType === 'outage' && '📡'}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-slate-50 capitalize">{claim.eventType} income-loss claim</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{formatCurrency(claim.incomeLoss)}</div>
                    </div>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{claim.status.replace('_', ' ')}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
