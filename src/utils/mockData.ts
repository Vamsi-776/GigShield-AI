import type { Worker, RiskAssessment, Claim, FraudAlert, AdminMetrics } from '../types';

export const mockWorker: Worker = {
  id: 'w1',
  name: 'Rajesh Kumar',
  phone: '9876543210',
  platform: 'Zomato',
  city: 'Bangalore',
  zone: 'Whitefield',
  weeklyEarnings: 8000,
  createdAt: '2024-01-15',
};

export const mockRiskAssessment: RiskAssessment = {
  id: 'ra1',
  workerId: 'w1',
  rainRisk: 65,
  heatRisk: 72,
  pollutionRisk: 48,
  curfewRisk: 15,
  weeklyPremium: 49,
  coverageLimit: 3000,
  createdAt: '2024-03-15',
};

export const mockClaims: Claim[] = [
  {
    id: 'c1',
    workerId: 'w1',
    eventType: 'rain',
    location: 'Bangalore',
    triggerSource: 'Weather API',
    incomeLoss: 1500,
    status: 'approved',
    payoutStatus: 'completed',
    createdAt: '2024-03-10',
  },
  {
    id: 'c2',
    workerId: 'w1',
    eventType: 'heat',
    location: 'Bangalore',
    triggerSource: 'Temperature Sensor',
    incomeLoss: 2000,
    status: 'processing',
    payoutStatus: 'in_progress',
    createdAt: '2024-03-12',
  },
  {
    id: 'c3',
    workerId: 'w1',
    eventType: 'outage',
    location: 'Bangalore',
    triggerSource: 'Platform API',
    incomeLoss: 800,
    status: 'triggered',
    payoutStatus: 'pending',
    createdAt: '2024-03-14',
  },
];

export const mockFraudAlerts: FraudAlert[] = [
  {
    id: 'f1',
    workerId: 'w1',
    claimId: 'c1',
    type: 'gps_mismatch',
    severity: 'medium',
    description: 'Claimed location differs from GPS coordinates by 5km',
    detectedAt: '2024-03-10',
  },
  {
    id: 'f2',
    workerId: 'w2',
    claimId: 'c4',
    type: 'duplicate_claim',
    severity: 'high',
    description: 'Similar claim filed 2 hours after previous one for same event',
    detectedAt: '2024-03-13',
  },
  {
    id: 'f3',
    workerId: 'w3',
    claimId: 'c5',
    type: 'fake_weather',
    severity: 'high',
    description: 'No weather data from official sources for claimed disruption',
    detectedAt: '2024-03-14',
  },
];

export const mockAdminMetrics: AdminMetrics = {
  totalWorkers: 2847,
  activePolicies: 1923,
  claimsTriggered: 342,
  fraudAlerts: 18,
  totalPayouts: 425000,
  avgRiskScore: 52,
};

export const mockClaimsTrend = [
  { date: 'Mon', claims: 12, payouts: 5600 },
  { date: 'Tue', claims: 15, payouts: 7200 },
  { date: 'Wed', claims: 8, payouts: 3800 },
  { date: 'Thu', claims: 22, payouts: 10500 },
  { date: 'Fri', claims: 18, payouts: 8900 },
  { date: 'Sat', claims: 28, payouts: 13200 },
  { date: 'Sun', claims: 25, payouts: 11800 },
];

export const mockDisruptionsByCity = [
  { city: 'Bangalore', disruptions: 45 },
  { city: 'Delhi', disruptions: 38 },
  { city: 'Mumbai', disruptions: 52 },
  { city: 'Hyderabad', disruptions: 28 },
  { city: 'Pune', disruptions: 22 },
];

export const mockWorkers = [
  { ...mockWorker, id: 'w1', name: 'Rajesh Kumar' },
  { ...mockWorker, id: 'w2', name: 'Priya Singh' },
  { ...mockWorker, id: 'w3', name: 'Amit Patel' },
  { ...mockWorker, id: 'w4', name: 'Fatima Khan' },
  { ...mockWorker, id: 'w5', name: 'Vikram Reddy' },
];

export const mockWeeklyData = [
  { day: 'Mon', covered: 6000, disruptions: 2 },
  { day: 'Tue', covered: 7500, disruptions: 1 },
  { day: 'Wed', covered: 8000, disruptions: 0 },
  { day: 'Thu', covered: 6500, disruptions: 2 },
  { day: 'Fri', covered: 8500, disruptions: 1 },
  { day: 'Sat', covered: 9000, disruptions: 3 },
  { day: 'Sun', covered: 5000, disruptions: 2 },
];

export const mockPayoutHistory = [
  { date: 'Week 1', amount: 1500 },
  { date: 'Week 2', amount: 2000 },
  { date: 'Week 3', amount: 800 },
  { date: 'Week 4', amount: 1200 },
  { date: 'Week 5', amount: 2500 },
  { date: 'Week 6', amount: 1800 },
];
