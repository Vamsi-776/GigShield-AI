import { useMemo, useState } from 'react';
import Reveal from '../components/Reveal';
import { BarChart3, Filter } from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { formatCurrency } from '../utils/calculations';

const mockCity = [
  { city: 'Bangalore', disruptions: 45 },
  { city: 'Delhi', disruptions: 38 },
  { city: 'Mumbai', disruptions: 52 },
  { city: 'Hyderabad', disruptions: 28 },
  { city: 'Pune', disruptions: 22 },
];

const mockTrends = [
  { day: 'Mon', claims: 12, payouts: 5600 },
  { day: 'Tue', claims: 15, payouts: 7200 },
  { day: 'Wed', claims: 8, payouts: 3800 },
  { day: 'Thu', claims: 22, payouts: 10500 },
  { day: 'Fri', claims: 18, payouts: 8900 },
  { day: 'Sat', claims: 28, payouts: 13200 },
  { day: 'Sun', claims: 25, payouts: 11800 },
];

export default function Analytics() {
  const [city, setCity] = useState('All Cities');
  const [platform, setPlatform] = useState('All Platforms');
  const [range, setRange] = useState('7 Days');

  const cityData = useMemo(() => {
    if (city === 'All Cities') return mockCity;
    return mockCity.filter((c) => c.city === city);
  }, [city]);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Advanced Analytics</h1>
        <p className="text-slate-600 dark:text-slate-300 mt-1">Disruption frequency, claim trends, and payout efficiency.</p>
      </div>

      <div className="card mb-6 p-4">
        <div className="flex items-center gap-3 mb-3">
          <Filter className="w-5 h-5 text-blue-600" />
          <div className="font-semibold text-slate-900 dark:text-slate-50">Filters</div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          <label className="text-sm text-slate-600 dark:text-slate-300">
            City
            <select value={city} onChange={(e) => setCity(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/50">
              {['All Cities', ...mockCity.map((c) => c.city)].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-600 dark:text-slate-300">
            Platform
            <select value={platform} onChange={(e) => setPlatform(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/50">
              {['All Platforms', 'Zomato', 'Swiggy', 'Amazon', 'Zepto'].map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </label>
          <label className="text-sm text-slate-600 dark:text-slate-300">
            Time Range
            <select value={range} onChange={(e) => setRange(e.target.value)} className="mt-1 w-full px-3 py-2 rounded-lg border border-white/10 bg-white/5 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-400/50">
              {['7 Days', '30 Days', '90 Days'].map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-6">
        <Reveal className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-slate-900 dark:text-slate-50">Disruption frequency by city</div>
            <BarChart3 className="w-5 h-5 text-accent-600" />
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={cityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.35)" />
                <XAxis dataKey="city" stroke="rgba(148,163,184,0.9)" />
                <YAxis stroke="rgba(148,163,184,0.9)" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: 10,
                    color: '#f1f5f9',
                  }}
                />
                <Bar dataKey="disruptions" fill="#0ea5e9" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Reveal>

        <Reveal className="card p-6">
          <div className="font-semibold text-slate-900 dark:text-slate-50 mb-2">Weekly claim trends</div>
          <div className="text-sm text-slate-600 dark:text-slate-300 mb-4">
            Range: {range} • Platform: {platform}
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockTrends}>
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
                  formatter={(value: unknown, name: unknown) => {
                    const key = String(name);
                    const num = typeof value === 'number' ? value : Number(value);

                    if (key === 'payouts') return [formatCurrency(num), 'Payouts'];
                    return [num, key];
                  }}
                />
                <Line type="monotone" dataKey="claims" stroke="#38bdf8" strokeWidth={2} dot={{ r: 3, fill: '#38bdf8' }} name="Claims" />
                <Line type="monotone" dataKey="payouts" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3, fill: '#8b5cf6' }} name="Payouts (INR)" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

