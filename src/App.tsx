import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import Register from './pages/Register';
import RiskAssessment from './pages/RiskAssessment';
import Dashboard from './pages/Dashboard';
import Policy from './pages/Policy';
import Claims from './pages/Claims';
import AdminDashboard from './pages/AdminDashboard';
import FraudDetection from './pages/FraudDetection';
import AppShell from './components/AppShell';
import LiveDisruptions from './pages/LiveDisruptions';
import Payouts from './pages/Payouts';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import RequireRegistration from './components/RequireRegistration';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Routes location={location}>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/risk-insights" element={<RequireRegistration><RiskAssessment /></RequireRegistration>} />
          <Route path="/risk-assessment" element={<RequireRegistration><RiskAssessment /></RequireRegistration>} />
          <Route path="/dashboard" element={<RequireRegistration><Dashboard /></RequireRegistration>} />
          <Route path="/coverage-plans" element={<RequireRegistration><Policy /></RequireRegistration>} />
          <Route path="/policy" element={<RequireRegistration><Policy /></RequireRegistration>} />
          <Route path="/claims" element={<RequireRegistration><Claims /></RequireRegistration>} />
          <Route path="/admin" element={<RequireRegistration><AdminDashboard /></RequireRegistration>} />
          <Route path="/fraud-detection" element={<RequireRegistration><FraudDetection /></RequireRegistration>} />
          <Route path="/live-disruptions" element={<RequireRegistration><LiveDisruptions /></RequireRegistration>} />
          <Route path="/payouts" element={<RequireRegistration><Payouts /></RequireRegistration>} />
          <Route path="/analytics" element={<RequireRegistration><Analytics /></RequireRegistration>} />
          <Route path="/settings" element={<RequireRegistration><Settings /></RequireRegistration>} />
          <Route path="*" element={<Landing />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}

export default App;

function AppInner() {
  const location = useLocation();

  useEffect(() => {
    document.title = 'InsureGig';
  }, []);

  const showShell = location.pathname !== '/';

  return (
    <div className="min-h-screen flex flex-col">
      {showShell ? <div className="md:hidden"><Navbar /></div> : <Navbar />}
      <div className="flex-1 min-w-0">
        {showShell ? <AppShell><AnimatedRoutes /></AppShell> : <AnimatedRoutes />}
      </div>
      <Footer />
    </div>
  );
}
