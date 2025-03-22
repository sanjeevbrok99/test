
export interface User {
  id: string;
  name: string;
  email: string;
  riskScore: number;
  transactions: number;
  status: string;
  location: string;
  lastActive: string;
}

export interface Transaction {
  id: string;
  date: string;
  amount: number;
  status: string;
  riskScore: number;
  type: string;
}

export interface RiskFactor {
  factor: string;
  severity: 'low' | 'medium' | 'high';
  details: string;
}

export interface ChartDataPoint {
  month?: string;
  week?: string;
  day?: string;
  value: number;
  risk?: number;
  attempts?: number;
  blocked?: number;
}

export interface DeviceData {
  name: string;
  value: number;
}
