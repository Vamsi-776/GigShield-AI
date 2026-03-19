export const calculateRiskScore = (
  rainRisk: number,
  heatRisk: number,
  pollutionRisk: number,
  curfewRisk: number
): number => {
  return Math.round((rainRisk * 0.4 + heatRisk * 0.3 + pollutionRisk * 0.2 + curfewRisk * 0.1));
};

export const calculateWeeklyPremium = (
  weeklyEarnings: number,
  riskScore: number
): number => {
  const baseRate = weeklyEarnings * 0.005;
  const riskMultiplier = 1 + (riskScore / 100) * 0.5;
  return Math.round(baseRate * riskMultiplier);
};

export const calculateCoverageLimit = (weeklyEarnings: number): number => {
  return Math.round(weeklyEarnings * 0.4);
};

export const getRiskLevel = (score: number): 'low' | 'medium' | 'high' => {
  if (score < 40) return 'low';
  if (score < 70) return 'medium';
  return 'high';
};

export const getRiskColor = (
  level: 'low' | 'medium' | 'high'
): string => {
  const colors = {
    low: 'bg-green-100 text-green-800 border-green-300',
    medium: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    high: 'bg-red-100 text-red-800 border-red-300',
  };
  return colors[level];
};

export const getStatusColor = (status: string): string => {
  const colors: { [key: string]: string } = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    expired: 'bg-red-100 text-red-800',
    triggered: 'bg-blue-100 text-blue-800',
    processing: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-green-100 text-green-800',
    paid: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    pending: 'bg-gray-100 text-gray-800',
    in_progress: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-green-100 text-green-800',
    failed: 'bg-red-100 text-red-800',
  };
  return colors[status] || 'bg-gray-100 text-gray-800';
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
