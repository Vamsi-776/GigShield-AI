import Reveal from '../components/Reveal';
import RiskCard from '../components/RiskCard';
import StatCard from '../components/StatCard';
import {
  Shield,
  AlertTriangle,
  TrendingUp,
  Droplets,
  Layers,
  MapPin,
} from 'lucide-react';
import { mockRiskAssessment, mockWorker } from '../utils/mockData';
import {
  calculateRiskScore,
  calculateWeeklyPremium,
  getRiskLevel,
  formatCurrency,
} from '../utils/calculations';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';

function RiskGauge({ value }: { value: number }) {
  const radius = 62;
  const stroke = 10;
  const normalized = Math.max(0, Math.min(100, value));
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (normalized / 100) * circumference;

  return (
    <div className="relative w-[180px] h-[180px] flex items-center justify-center">
      <svg width="180" height="180" className="absolute inset-0">
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="rgba(148,163,184,0.25)"
          strokeWidth={stroke}
          fill="transparent"
        />
        <circle
          cx="90"
          cy="90"
          r={radius}
          stroke="url(#riskGradient)"
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform="rotate(-90 90 90)"
        />
        <defs>
          <linearGradient id="riskGradient" x1="0" y1="0" x2="180" y2="180">
            <stop offset="0%" stopColor="#0ea5e9" stopOpacity="1" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="1" />
          </linearGradient>
        </defs>
      </svg>
      <div className="relative text-center">
        <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-accent-600 bg-clip-text text-transparent">
          {value}
        </div>
        <div className="text-sm text-slate-600 dark:text-slate-300">AI Risk Score</div>
      </div>
    </div>
  );
}

export default function RiskAssessment() {
  const riskScore = calculateRiskScore(
    mockRiskAssessment.rainRisk,
    mockRiskAssessment.heatRisk,
    mockRiskAssessment.pollutionRisk,
    mockRiskAssessment.curfewRisk
  );

  const riskLevel = getRiskLevel(riskScore);
  const floodRisk = Math.min(100, Math.round(mockRiskAssessment.rainRisk * 0.85));

  const weeklyPremiumPrediction = calculateWeeklyPremium(mockWorker.weeklyEarnings, riskScore);

  const next7Days = (() => {
    const base = riskScore / 100;
    return Array.from({ length: 7 }).map((_, i) => {
      const wave = Math.sin((i / 6) * Math.PI) * 0.12;
      const bump = i === 2 ? 0.08 : 0;
      const v = Math.max(0, Math.min(1, base + wave + bump));
      return {
        day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
        probability: Math.round(v * 100),
      };
    });
  })();

  const cityHeatmap = (() => {
    const cityProb = [
      { city: 'Bangalore', v: mockRiskAssessment.rainRisk },
      { city: 'Delhi', v: mockRiskAssessment.heatRisk },
      {
        city: 'Mumbai',
        v: Math.round(mockRiskAssessment.rainRisk * 0.6 + mockRiskAssessment.pollutionRisk * 0.4),
      },
      { city: 'Hyderabad', v: mockRiskAssessment.curfewRisk + 20 },
      { city: 'Pune', v: Math.round(mockRiskAssessment.pollutionRisk + 15) },
      { city: 'Chennai', v: Math.round(mockRiskAssessment.heatRisk * 0.9) },
      {
        city: 'Lucknow',
        v: Math.round(mockRiskAssessment.rainRisk * 0.7 + mockRiskAssessment.curfewRisk * 0.2),
      },
      { city: 'Kolkata', v: Math.round(mockRiskAssessment.pollutionRisk + mockRiskAssessment.rainRisk * 0.2) },
      { city: 'Ahmedabad', v: mockRiskAssessment.heatRisk - 10 },
    ].map((c) => ({ ...c, v: Math.max(0, Math.min(100, c.v)) }));

    return cityProb;
  })();

  return (
    <div className="flex-1 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 flex items-start justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">AI Risk Intelligence</h1>
            <p className="text-slate-600 dark:text-slate-300">
              Disruption risk analysis for income loss (rain/flood, pollution, curfew) in {mockWorker.city}.
            </p>
          </div>
          <div className="hidden md:block">
            <Reveal className="card p-6 flex items-center justify-center">
              <RiskGauge value={riskScore} />
            </Reveal>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <StatCard label="Risk Level" value={riskLevel.toUpperCase()} icon={<AlertTriangle className="w-8 h-8" />} subtext={`${riskScore}/100`} />
          <StatCard
            label="Weekly Premium (Predicted)"
            value={formatCurrency(weeklyPremiumPrediction)}
            icon={<TrendingUp className="w-8 h-8" />}
            subtext="AI-calculated"
          />
          <StatCard
            label="Coverage Limit"
            value={formatCurrency(mockRiskAssessment.coverageLimit)}
            icon={<Shield className="w-8 h-8" />}
            subtext="Per week"
          />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          <Reveal className="card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-600" />
                <div className="font-semibold text-slate-900 dark:text-slate-50">Heatmap of city disruption zones</div>
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-300">Higher score = higher income-loss risk</div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {cityHeatmap.map((c) => (
                <div
                  key={c.city}
                  className="rounded-2xl border border-white/10 bg-white/5 p-3"
                  style={{
                    background:
                      c.v > 70
                        ? 'rgba(239,68,68,0.12)'
                        : c.v > 40
                        ? 'rgba(250,204,21,0.12)'
                        : 'rgba(34,197,94,0.10)',
                  }}
                >
                  <div className="font-semibold text-sm text-slate-900 dark:text-slate-50">{c.city}</div>
                  <div className="mt-2 flex items-center justify-between text-xs">
                    <span className="text-slate-600 dark:text-slate-300">Risk</span>
                    <span className="font-bold text-slate-900 dark:text-slate-50">{c.v}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full overflow-hidden bg-white/10 mt-2">
                    <div className="h-full bg-gradient-to-r from-blue-600 to-accent-600" style={{ width: `${c.v}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="card p-6">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="w-5 h-5 text-accent-600" />
              <div className="font-semibold text-slate-900 dark:text-slate-50">Risk summary</div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {riskLevel === 'low' && 'Conditions look favorable. Coverage triggers when disruptions spike.'}
              {riskLevel === 'medium' && 'Moderate disruption risk detected. Automatic claims trigger when signals confirm coverage.'}
              {riskLevel === 'high' && 'High disruption risk detected. Choose a tier that matches your weekly income exposure.'}
            </p>

            <div className="mt-5 grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-slate-600 dark:text-slate-300">Insurance scope</div>
                <div className="font-bold text-slate-900 dark:text-slate-50">Income Loss Only</div>
                <div className="mt-2 flex items-center gap-2 text-xs text-emerald-300">
                  <Droplets className="w-4 h-4" />
                  Verified signals
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="text-xs text-slate-600 dark:text-slate-300">Next window</div>
                <div className="font-bold text-slate-900 dark:text-slate-50">48 hours</div>
                <div className="mt-2 w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-blue-600 to-accent-600 animate-pulse" style={{ width: '72%' }} />
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Reveal className="card p-6 md:col-span-2">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">
              Predictive chart for disruption probability (next 7 days)
            </h3>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={next7Days}>
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
                    formatter={(value: unknown) => [`${value}%`, 'Probability']}
                  />
                  <Line type="monotone" dataKey="probability" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 3, fill: '#0ea5e9' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          <Reveal>
            <RiskCard title="Rain Risk" risk={mockRiskAssessment.rainRisk} icon="rain" />
          </Reveal>
          <Reveal>
            <RiskCard title="Flood Risk" risk={floodRisk} icon="flood" />
          </Reveal>
          <Reveal>
            <RiskCard title="Pollution Risk" risk={mockRiskAssessment.pollutionRisk} icon="pollution" />
          </Reveal>
          <Reveal>
            <RiskCard title="Curfew Risk" risk={mockRiskAssessment.curfewRisk} icon="curfew" />
          </Reveal>
        </div>
      </div>
    </div>
  );
}
