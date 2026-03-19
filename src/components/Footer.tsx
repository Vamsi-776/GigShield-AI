import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-400 py-12 px-4 border-t border-white/10">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          <div className="space-y-3">
            <p className="text-white font-bold text-lg">InsureGig</p>
            <p className="text-sm leading-relaxed">
              Weather + outage intelligence for automated protection and payouts for gig workers.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-white font-semibold">Product</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-white transition-colors" to="/policy">
                  Policy
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" to="/claims">
                  Claims
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" to="/risk-assessment">
                  Risk Assessment
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-white font-semibold">For Gig Workers</p>
            <ul className="space-y-2 text-sm">
              <li>
                <Link className="hover:text-white transition-colors" to="/register">
                  Apply / Register
                </Link>
              </li>
              <li>
                <Link className="hover:text-white transition-colors" to="/dashboard">
                  Check In
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <p className="text-white font-semibold">Support</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  FAQ
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Contact
                </a>
              </li>
              <li>
                <a className="hover:text-white transition-colors" href="#">
                  Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-6 border-t border-white/10">
          <p className="text-sm">&copy; {year} InsureGig. Protecting gig workers&apos; income.</p>
          <p className="text-sm text-slate-400">No medical exams. No paperwork required for eligible events.</p>
        </div>
      </div>
    </footer>
  );
}

