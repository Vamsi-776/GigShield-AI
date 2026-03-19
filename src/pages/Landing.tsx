import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Reveal from '../components/Reveal';
import {
  CloudRain,
  ThermometerSun,
  Wind,
  ShieldCheck,
  Sparkles,
  Zap,
  Wallet,
  ArrowRight,
  Quote,
  Star,
} from 'lucide-react';

function FloatingIcon({
  Icon,
  className,
  delay,
  duration,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  className: string;
  delay: number;
  duration: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: [10, -16, 10], scale: [0.95, 1.02, 0.95] }}
      transition={{ delay, duration, repeat: Infinity, repeatType: 'loop', ease: 'easeInOut' }}
    >
      <Icon className="w-7 h-7 text-white/90" />
    </motion.div>
  );
}

export default function Landing() {
  const features = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: 'AI Risk Prediction',
      description: 'AI predicts disruption risk for your delivery zone and helps you get protected before income is impacted.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Automatic Claims',
      description: 'When disruptions occur, claims are triggered from trusted signals—no paperwork delays for income loss.',
    },
    {
      icon: <Wallet className="w-6 h-6" />,
      title: 'Instant Payouts',
      description: 'Get paid quickly for verified income loss. Built for the speed gig work depends on.',
    },
  ];

  const workflow = [
    { title: 'Worker registers', desc: 'Share earnings + zone details on a few taps.' },
    { title: 'AI predicts risk', desc: 'We score disruption probability for your location.' },
    { title: 'Disruption occurs', desc: 'Rain/heat/pollution/curfew signals trigger a claim.' },
    { title: 'Automatic payout sent', desc: 'Fast payout for covered income loss.' },
  ];

  const testimonials = [
    {
      name: 'Rajesh • Zomato Rider',
      quote: 'Heavy rain hit my area and I had a claim running in minutes. The payout helped me keep deliveries going.',
      rating: 5,
    },
    {
      name: 'Priya • Swiggy Partner',
      quote: 'AI risk alerts actually helped. When curfews happened, the claim got approved without the usual back-and-forth.',
      rating: 5,
    },
    {
      name: 'Amit • Amazon Flex',
      quote: 'Fast, transparent, and focused only on income loss. No distractions like health coverage.',
      rating: 5,
    },
  ];

  return (
    <div className="flex-1 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-28 w-72 h-72 rounded-full bg-blue-500/30 blur-3xl" />
        <div className="absolute top-24 -right-24 w-72 h-72 rounded-full bg-accent-600/25 blur-3xl" />

        <FloatingIcon Icon={CloudRain} className="absolute top-28 left-10" delay={0} duration={6.5} />
        <FloatingIcon Icon={ThermometerSun} className="absolute top-44 right-16" delay={0.8} duration={7.2} />
        <FloatingIcon Icon={Wind} className="absolute bottom-24 left-20" delay={1.2} duration={7.6} />
      </div>

      <header className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-accent-600 text-white py-20 px-4">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 backdrop-blur-xl text-sm text-white/90 mb-6">
              <ShieldCheck className="w-4 h-4" />
              Parametric insurance for income loss (not health coverage)
            </div>

            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              AI Insurance for India&apos;s Gig Economy
            </h1>

            <p className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto">
              Get paid for covered income loss when disruptions like heavy rain, extreme heat, pollution spikes, or curfews impact your deliveries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="btn-primary text-white bg-white/90 hover:bg-white">
                Get Protected
              </Link>
              <Link
                to="/dashboard"
                className="btn-secondary border-white text-white hover:bg-white hover:bg-opacity-10"
              >
                View Dashboard <ArrowRight className="inline w-4 h-4 ml-2" />
              </Link>
            </div>
          </motion.div>
        </div>
      </header>

      <section className="relative py-16 px-4 max-w-6xl mx-auto">
        <div className="flex items-center justify-center mb-8">
          <Reveal className="card-interactive inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-white/40 dark:bg-slate-900/40 border border-white/20">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <span className="font-semibold text-slate-900 dark:text-slate-50">Premium fintech-grade protection</span>
          </Reveal>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 text-slate-900 dark:text-slate-50">
          Built for the speed gig work demands
        </h2>
        <p className="text-center text-slate-600 dark:text-slate-300 mb-10 max-w-2xl mx-auto">
          Glassmorphism UI + instant automation for disruptions, designed around income-loss coverage only.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((f) => (
            <Reveal key={f.title} className="card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-blue-600/20 to-accent-600/20 border border-white/15 flex items-center justify-center text-blue-700 dark:text-blue-200">
                  {f.icon}
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-50">{f.title}</div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{f.description}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative pb-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">How it works</h3>
              <p className="text-slate-600 dark:text-slate-300 mt-2">A simple flow from registration to payout.</p>
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {workflow.map((step, idx) => (
              <Reveal key={step.title} className="card p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-accent-600 text-white flex items-center justify-center font-bold">
                    {idx + 1}
                  </div>
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{step.title}</div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{step.desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { value: '50k+', label: 'Delivery Partners', hint: 'Active gig workers protected' },
              { value: '₹2Cr', label: 'Income Protected', hint: 'Covered weekly income loss' },
              { value: '95%', label: 'Automatic Claims', hint: 'Triggered without manual processing' },
            ].map((s) => (
              <Reveal key={s.label} className="card p-6">
                <div className="text-4xl font-extrabold bg-gradient-to-r from-blue-600 to-accent-600 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="font-semibold text-slate-900 dark:text-slate-50 mt-2">{s.label}</div>
                <div className="text-sm text-slate-600 dark:text-slate-300 mt-1">{s.hint}</div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Gig worker testimonials</h3>
            <p className="text-slate-600 dark:text-slate-300 mt-2">Real stories from people protecting their income.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <Reveal key={t.name} className="card p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-semibold text-slate-900 dark:text-slate-50">{t.name}</div>
                  <div className="flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent-600 fill-accent-600" />
                    ))}
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="mt-1">
                    <Quote className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">{t.quote}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 pb-24">
        <div className="max-w-5xl mx-auto card p-8 bg-gradient-to-br from-blue-600/15 to-accent-600/10 border border-white/15">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="text-3xl font-bold text-slate-900 dark:text-slate-50">Protect your income today.</div>
              <p className="text-slate-600 dark:text-slate-300 mt-2">
                Coverage is designed for income loss only from disruptions—not health or accident claims.
              </p>
            </div>
            <div className="flex gap-3">
              <Link to="/register" className="btn-primary bg-white text-blue-600">
                Get Protected
              </Link>
              <Link to="/dashboard" className="btn-secondary border-blue-200 text-blue-700 dark:border-white/15 dark:text-slate-100">
                View Dashboard
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
