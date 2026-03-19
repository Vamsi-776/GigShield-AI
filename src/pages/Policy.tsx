import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import { CheckCircle2, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import { mockRiskAssessment } from '../utils/mockData';
import { calculateRiskScore, getRiskLevel } from '../utils/calculations';

const plans = [
  {
    name: 'Basic Plan',
    price: '₹29/week',
    coverage: 'Coverage up to ₹1,500',
    gradient: 'from-blue-600/20 to-sky-500/10',
    cta: 'Start Basic',
  },
  {
    name: 'Standard Plan',
    price: '₹49/week',
    coverage: 'Coverage up to ₹3,000',
    gradient: 'from-amber-500/20 to-accent-600/10',
    cta: 'Start Standard',
  },
  {
    name: 'Premium Plan',
    price: '₹79/week',
    coverage: 'Coverage up to ₹5,000',
    gradient: 'from-accent-600/25 to-fuchsia-600/10',
    cta: 'Go Premium',
  },
];

export default function CoveragePlans() {
  const riskScore = calculateRiskScore(
    mockRiskAssessment.rainRisk,
    mockRiskAssessment.heatRisk,
    mockRiskAssessment.pollutionRisk,
    mockRiskAssessment.curfewRisk
  );
  const riskLevel = getRiskLevel(riskScore);

  const recommended = riskLevel === 'low' ? 'Basic Plan' : riskLevel === 'medium' ? 'Standard Plan' : 'Premium Plan';

  const benefits = [
    'Income-loss payouts when weather/pollution/curfew disrupt deliveries',
    'Parametric auto-claims from verified external signals',
    'Instant payout flow designed for gig worker cashflow',
    'Fraud safeguards to protect payouts',
  ];

  return (
    <div className="flex-1 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Coverage Plans</h1>
          <p className="text-slate-600 dark:text-slate-300">
            Choose a weekly tier that fits your income-loss exposure. Coverage is for income loss only (not health, accident, or life insurance).
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {plans.map((p) => {
            const isRecommended = p.name === recommended;
            return (
              <Reveal key={p.name} className="card p-6">
                <motion.div
                  className="h-full flex flex-col"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                >
                  <div className={`rounded-3xl border border-white/15 bg-gradient-to-br ${p.gradient} p-4 mb-4`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-semibold text-slate-900 dark:text-slate-50">{p.name}</div>
                      {isRecommended && (
                        <div className="px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                          Recommended
                        </div>
                      )}
                    </div>
                    <div className="text-4xl font-extrabold text-slate-900 dark:text-slate-50 mt-3">{p.price}</div>
                    <div className="text-sm text-slate-600 dark:text-slate-300 mt-2">{p.coverage}</div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                      Parametric income protection
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Zap className="w-4 h-4 text-accent-600" />
                      Auto claims on disruption signals
                    </div>
                    <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                      <Sparkles className="w-4 h-4 text-sky-500" />
                      Designed for instant payouts
                    </div>
                  </div>

                  <Link
                    to="/dashboard"
                    className="mt-auto inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-accent-600 text-white font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                  >
                    {p.cta}
                  </Link>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Reveal className="card p-6">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-4">What you get</h3>
            <ul className="space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />
                  <span className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="card p-6 bg-gradient-to-br from-blue-600/10 to-accent-600/10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-50 mb-3">Coverage focus</h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              GigShield AI covers only <span className="font-semibold text-slate-900 dark:text-slate-50">income loss</span> caused by external disruptions (heavy rain, floods, extreme heat, pollution spikes, curfews, and confirmed platform outages). We do not offer health, accident, vehicle repair, or life insurance.
            </p>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
