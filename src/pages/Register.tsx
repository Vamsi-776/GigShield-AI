import { useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';
import Reveal from '../components/Reveal';

export default function Register() {
  const navigate = useNavigate();
  const location = useLocation();

  const alreadyRegistered = useMemo(() => {
    try {
      return localStorage.getItem('gs.registered') === '1';
    } catch {
      return false;
    }
  }, []);

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    platform: 'Zomato',
    city: '',
    zone: '',
    weeklyEarnings: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else {
      // Mock "registration" gate. We only unlock income-loss coverage features.
      try {
        localStorage.setItem('gs.registered', '1');
      } catch {
        // ignore
      }

      const from = (location.state as { from?: string } | null)?.from;
      const target = typeof from === 'string' && from !== '/register' ? from : '/dashboard';
      navigate(target);
    }
  };

  const handlePrev = () => {
    if (step > 1) setStep(step - 1);
  };

  const platforms = ['Zomato', 'Swiggy', 'Amazon', 'Zepto'];

  return (
    <div className="flex-1 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-50 mb-2">Join InsureGig</h1>
          <p className="text-slate-600 dark:text-slate-300">AI parametric income protection for delivery disruptions.</p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
            Covers income loss only (no health/accident/vehicle repair/life insurance).
          </p>
        </div>

        {alreadyRegistered ? (
          <Reveal className="card p-6 mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50 mb-2">You are already registered</h2>
            <p className="text-slate-600 dark:text-slate-300 mb-4">Go to your dashboard to view risk alerts and manage coverage.</p>
            <Link to="/dashboard" className="btn-primary inline-flex items-center justify-center w-full">
              Go to Dashboard
            </Link>
          </Reveal>
        ) : null}

        <Reveal className="card mb-8">
          <div className="flex justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-300 ${
                    s <= step
                      ? 'bg-gradient-to-r from-blue-600 to-accent-600 text-white'
                      : 'bg-white/10 text-slate-500 dark:text-slate-300 border border-white/10'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`h-1 w-12 mx-2 transition-all duration-300 ${
                      s < step ? 'bg-gradient-to-r from-blue-600 to-accent-600' : 'bg-slate-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Personal Information</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Rajesh Kumar"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="9876543210"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50"
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Delivery Platform</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Which platform do you work for?</label>
                <select
                  name="platform"
                  value={formData.platform}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50"
                >
                  {platforms.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">City</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    placeholder="Bangalore"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Work Zone</label>
                  <input
                    type="text"
                    name="zone"
                    value={formData.zone}
                    onChange={handleChange}
                    placeholder="Whitefield"
                    className="w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">Earnings Information</h2>
              <div>
                <label className="block text-sm font-semibold text-slate-900 dark:text-slate-50 mb-2">Average Weekly Earnings (₹)</label>
                <input
                  type="number"
                  name="weeklyEarnings"
                  value={formData.weeklyEarnings}
                  onChange={handleChange}
                  placeholder="8000"
                  className="w-full px-4 py-3 border border-slate-300 dark:border-white/10 bg-white/60 dark:bg-slate-900/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-slate-900 dark:text-slate-50"
                />
                <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">This helps us calculate your coverage limit (income loss only).</p>
              </div>
              <div className="bg-blue-50/70 dark:bg-blue-900/20 border border-blue-200/70 dark:border-blue-200/10 rounded-lg p-4">
                <p className="text-sm text-slate-700 dark:text-slate-200">
                  <strong>Review:</strong> Your information will be used to assess risk and calculate your weekly premium.
                </p>
              </div>
            </div>
          )}

          <div className="flex gap-4 mt-8">
            <button
              onClick={handlePrev}
              disabled={step === 1}
              className="flex items-center gap-2 px-6 py-3 border border-slate-300 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-50 font-semibold hover:bg-slate-50 dark:hover:bg-white/5 disabled:opacity-50 disabled:cursor-not-allowed transition-colors bg-white/40 dark:bg-slate-900/20"
            >
              <ChevronLeft className="w-5 h-5" />
              Back
            </button>
            <button onClick={handleNext} className="btn-primary ml-auto flex items-center gap-2">
              {step === 3 ? 'Complete' : 'Next'}
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </Reveal>

        <p className="text-center text-slate-600 dark:text-slate-300 mt-4">
          Already registered?{' '}
          <Link to="/dashboard" className="text-blue-600 dark:text-blue-300 font-semibold hover:underline">
            Go to dashboard
          </Link>
        </p>
      </div>
    </div>
  );
}
