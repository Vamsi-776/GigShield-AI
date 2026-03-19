import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import StatCard from '../components/StatCard';
import { Users, AlertCircle, TrendingUp, AlertTriangle } from 'lucide-react';
import { mockAdminMetrics, mockClaimsTrend, mockDisruptionsByCity } from '../utils/mockData';
import Reveal from '../components/Reveal';

const COLORS = ['#0ea5e9', '#38bdf8', '#7dd3fc', '#bae6fd', '#e0f2fe'];

export default function AdminDashboard() {
  return (
    <div className="flex-1 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Admin Panel</h1>
          <p className="text-slate-600 dark:text-slate-300">Platform overview for income-loss protection (income loss only; no health/accident coverage).</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <StatCard
            label="Total Workers"
            value={mockAdminMetrics.totalWorkers.toLocaleString()}
            icon={<Users className="w-8 h-8" />}
            trend={8}
          />
          <StatCard
            label="Active Policies"
            value={mockAdminMetrics.activePolicies}
            icon={<TrendingUp className="w-8 h-8" />}
            trend={5}
          />
          <StatCard
            label="Total Claims"
            value={mockAdminMetrics.claimsTriggered}
            icon={<AlertCircle className="w-8 h-8" />}
          />
          <StatCard
            label="Fraud Alerts"
            value={mockAdminMetrics.fraudAlerts}
            icon={<AlertTriangle className="w-8 h-8" />}
          />
        </div>

        <Reveal className="card p-6 mb-8">
          <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Disruption Hotspots (by city)</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {mockDisruptionsByCity.map((c) => {
              const intensity = Math.max(0.18, Math.min(1, c.disruptions / 60));
              return (
                <div
                  key={c.city}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                  style={{
                    background:
                      intensity > 0.7
                        ? 'rgba(239,68,68,0.14)'
                        : intensity > 0.4
                        ? 'rgba(14,165,233,0.14)'
                        : 'rgba(124,58,237,0.10)',
                  }}
                >
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{c.city}</div>
                  <div className="mt-2 text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-accent-600 bg-clip-text text-transparent">
                    {c.disruptions}
                  </div>
                  <div className="text-xs text-slate-600 dark:text-slate-300 mt-1">events</div>
                </div>
              );
            })}
          </div>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Weekly Claims Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={mockClaimsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="claims"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ fill: '#0ea5e9', r: 4 }}
                  name="Claims Count"
                />
              </LineChart>
            </ResponsiveContainer>
          </Reveal>

          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Payouts Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockClaimsTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Legend />
                <Bar dataKey="payouts" fill="#8b5cf6" name="Payouts (₹)" />
              </BarChart>
            </ResponsiveContainer>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Disruptions by City</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={mockDisruptionsByCity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="city" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
                <Bar dataKey="disruptions" fill="#ec4899" name="Disruption Events" />
              </BarChart>
            </ResponsiveContainer>
          </Reveal>

          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Platform Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Zomato', value: 35 },
                    { name: 'Swiggy', value: 30 },
                    { name: 'Amazon', value: 20 },
                    { name: 'Zepto', value: 15 },
                  ]}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[0, 1, 2, 3].map((index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#f1f5f9',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Key Metrics</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-600 dark:text-slate-300">Avg Risk Score</span>
                <span className="font-bold text-lg">{mockAdminMetrics.avgRiskScore}</span>
              </div>
              <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10">
                <span className="text-slate-600 dark:text-slate-300">Loss Ratio</span>
                <span className="font-bold text-lg">32%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Claim Rate</span>
                <span className="font-bold text-lg">12%</span>
              </div>
            </div>
          </Reveal>

          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Top Events</h3>
            <div className="space-y-4">
              {[
                { event: 'Heavy Rain', count: 85 },
                { event: 'Extreme Heat', count: 62 },
                { event: 'Platform Outage', count: 45 },
                { event: 'High Pollution', count: 38 },
                { event: 'Curfew', count: 12 },
              ].map((item) => (
                <div key={item.event} className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10 last:border-0">
                  <span className="text-slate-600 dark:text-slate-300 text-sm">{item.event}</span>
                  <span className="font-bold text-slate-900 dark:text-slate-50">{item.count}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="card">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">Fraud Detection</h3>
            <div className="space-y-4">
              {[
                { alert: 'GPS Mismatches', count: 8 },
                { alert: 'Duplicate Claims', count: 5 },
                { alert: 'Fake Weather', count: 3 },
                { alert: 'Unusual Patterns', count: 2 },
              ].map((item) => (
                <div key={item.alert} className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-white/10 last:border-0">
                  <span className="text-slate-600 dark:text-slate-300 text-sm">{item.alert}</span>
                  <span className="font-bold text-red-600 dark:text-red-300">{item.count}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
