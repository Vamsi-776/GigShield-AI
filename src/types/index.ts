export interface Worker {
  id: string;
  name: string;
  phone: string;
  platform: 'Zomato' | 'Swiggy' | 'Amazon' | 'Zepto';
  city: string;
  zone: string;
  weeklyEarnings: number;
  createdAt: string;
}

export interface RiskAssessment {
  id: string;
  workerId: string;
  rainRisk: number;
  heatRisk: number;
  pollutionRisk: number;
  curfewRisk: number;
  weeklyPremium: number;
  coverageLimit: number;
  createdAt: string;
}

export interface Policy {
  id: string;
  workerId: string;
  status: 'active' | 'inactive' | 'expired';
  weeklyPremium: number;
  coverageLimit: number;
  activatedAt: string;
  expiresAt: string;
}

export interface Claim {
  id: string;
  workerId: string;
  eventType: 'rain' | 'heat' | 'pollution' | 'curfew' | 'outage';
  location: string;
  triggerSource: string;
  incomeLoss: number;
  status: 'triggered' | 'processing' | 'approved' | 'paid' | 'rejected';
  payoutStatus: 'pending' | 'in_progress' | 'completed' | 'failed';
  createdAt: string;
}

export interface FraudAlert {
  id: string;
  workerId: string;
  claimId: string;
  type: 'gps_mismatch' | 'duplicate_claim' | 'fake_weather' | 'unusual_pattern';
  severity: 'low' | 'medium' | 'high';
  description: string;
  detectedAt: string;
}

export interface AdminMetrics {
  totalWorkers: number;
  activePolicies: number;
  claimsTriggered: number;
  fraudAlerts: number;
  totalPayouts: number;
  avgRiskScore: number;
}
