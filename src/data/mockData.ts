
// Mock data for development purposes

// Transaction statuses
export type TransactionStatus = 'safe' | 'medium' | 'high';

// Payment modes
export type PaymentMode = 'UPI' | 'Card' | 'NEFT' | 'RTGS' | 'IMPS' | 'Wallet';

// Transaction channels
export type TransactionChannel = 'Web' | 'Mobile' | 'POS' | 'ATM' | 'Branch';

// Banks
export type Bank = 'HDFC' | 'SBI' | 'ICICI' | 'Axis' | 'Kotak' | 'Yes' | 'Other';

// Transaction interface
export interface Transaction {
  id: string;
  amount: number;
  timestamp: string;
  channel: TransactionChannel;
  paymentMode: PaymentMode;
  payerId: string;
  payerName: string;
  payerBank: Bank;
  payeeId: string;
  payeeName: string;
  payeeBank: Bank;
  fraudStatus: TransactionStatus;
  fraudScore: number;
  reportedFraud: boolean;
  details?: string;
}

// Generate random transactions
const generateRandomTransactions = (count: number): Transaction[] => {
  const transactions: Transaction[] = [];
  
  const channels: TransactionChannel[] = ['Web', 'Mobile', 'POS', 'ATM', 'Branch'];
  const paymentModes: PaymentMode[] = ['UPI', 'Card', 'NEFT', 'RTGS', 'IMPS', 'Wallet'];
  const banks: Bank[] = ['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'Yes', 'Other'];
  const statuses: TransactionStatus[] = ['safe', 'medium', 'high'];
  
  for (let i = 0; i < count; i++) {
    const fraudScore = Math.random() * 100;
    let fraudStatus: TransactionStatus;
    
    if (fraudScore >= 80) {
      fraudStatus = 'high';
    } else if (fraudScore >= 40) {
      fraudStatus = 'medium';
    } else {
      fraudStatus = 'safe';
    }
    
    const reportedFraud = Math.random() > 0.9 || fraudStatus === 'high';
    
    transactions.push({
      id: `TXN${Math.floor(Math.random() * 10000000).toString().padStart(8, '0')}`,
      amount: Math.floor(Math.random() * 1000000) / 100,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30)).toISOString(),
      channel: channels[Math.floor(Math.random() * channels.length)],
      paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
      payerId: `P${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      payerName: `Payer ${Math.floor(Math.random() * 1000)}`,
      payerBank: banks[Math.floor(Math.random() * banks.length)],
      payeeId: `P${Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}`,
      payeeName: `Payee ${Math.floor(Math.random() * 1000)}`,
      payeeBank: banks[Math.floor(Math.random() * banks.length)],
      fraudStatus,
      fraudScore,
      reportedFraud,
    });
  }
  
  return transactions;
};

// Generate 100 random transactions
export const mockTransactions = generateRandomTransactions(100);

// Rule interface
export interface Rule {
  id: string;
  name: string;
  description: string;
  condition: string;
  action: string;
  priority: number;
  enabled: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock rules
export const mockRules: Rule[] = [
  {
    id: '1',
    name: 'High Amount Transaction',
    description: 'Flag transactions above $10,000 as high risk',
    condition: 'amount > 10000',
    action: 'FLAG_HIGH_RISK',
    priority: 1,
    enabled: true,
    createdAt: '2023-01-01T00:00:00Z',
    updatedAt: '2023-01-01T00:00:00Z',
  },
  {
    id: '2',
    name: 'International Transaction',
    description: 'Flag international transactions as medium risk',
    condition: 'country != "US"',
    action: 'FLAG_MEDIUM_RISK',
    priority: 2,
    enabled: true,
    createdAt: '2023-01-02T00:00:00Z',
    updatedAt: '2023-01-02T00:00:00Z',
  },
  {
    id: '3',
    name: 'New Payee Transaction',
    description: 'Flag transactions to new payees as medium risk',
    condition: 'isNewPayee == true',
    action: 'FLAG_MEDIUM_RISK',
    priority: 3,
    enabled: true,
    createdAt: '2023-01-03T00:00:00Z',
    updatedAt: '2023-01-03T00:00:00Z',
  },
  {
    id: '4',
    name: 'Blacklisted Payee',
    description: 'Block transactions to blacklisted payees',
    condition: 'isBlacklisted == true',
    action: 'BLOCK_TRANSACTION',
    priority: 0,
    enabled: true,
    createdAt: '2023-01-04T00:00:00Z',
    updatedAt: '2023-01-04T00:00:00Z',
  },
  {
    id: '5',
    name: 'Unusual Location',
    description: 'Flag transactions from unusual locations as high risk',
    condition: 'isUnusualLocation == true',
    action: 'FLAG_HIGH_RISK',
    priority: 1,
    enabled: false,
    createdAt: '2023-01-05T00:00:00Z',
    updatedAt: '2023-01-05T00:00:00Z',
  },
];

// Generate fraud trend data
export const generateFraudTrendData = () => {
  const channels = ['Web', 'Mobile', 'POS', 'ATM', 'Branch'];
  const paymentModes = ['UPI', 'Card', 'NEFT', 'RTGS', 'IMPS', 'Wallet'];
  const banks = ['HDFC', 'SBI', 'ICICI', 'Axis', 'Kotak', 'Yes', 'Other'];

  const channelData = channels.map(channel => ({
    name: channel,
    predicted: Math.floor(Math.random() * 100),
    reported: Math.floor(Math.random() * 100),
  }));

  const paymentModeData = paymentModes.map(mode => ({
    name: mode,
    predicted: Math.floor(Math.random() * 100),
    reported: Math.floor(Math.random() * 100),
  }));

  const bankData = banks.map(bank => ({
    name: bank,
    predicted: Math.floor(Math.random() * 100),
    reported: Math.floor(Math.random() * 100),
  }));

  return {
    channelData,
    paymentModeData,
    bankData,
  };
};

// Generate time series data for fraud trends
export const generateTimeSeriesData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      predicted: Math.floor(Math.random() * 50),
      reported: Math.floor(Math.random() * 30),
    });
  }
  
  return data;
};

// Generate model evaluation data
export const generateModelEvaluationData = () => {
  // Confusion matrix
  const tp = Math.floor(Math.random() * 80) + 100; // True Positives
  const fp = Math.floor(Math.random() * 40) + 20; // False Positives
  const tn = Math.floor(Math.random() * 200) + 300; // True Negatives
  const fn = Math.floor(Math.random() * 30) + 10; // False Negatives
  
  // Calculate metrics
  const precision = tp / (tp + fp);
  const recall = tp / (tp + fn);
  const accuracy = (tp + tn) / (tp + tn + fp + fn);
  const f1Score = 2 * (precision * recall) / (precision + recall);
  
  return {
    confusionMatrix: {
      truePositive: tp,
      falsePositive: fp,
      trueNegative: tn,
      falseNegative: fn,
    },
    metrics: {
      precision,
      recall,
      accuracy,
      f1Score,
    },
  };
};

// Generate fraud reports
export interface FraudReport {
  id: string;
  transactionId: string;
  reportedBy: string;
  reason: string;
  details: string;
  timestamp: string;
  status: 'pending' | 'investigating' | 'resolved';
}

export const fraudReportReasons = [
  'Unauthorized transaction',
  'Identity theft',
  'Account takeover',
  'Card not received',
  'Counterfeit card',
  'Card not present fraud',
  'Phishing',
  'Other',
];

export const mockFraudReports: FraudReport[] = mockTransactions
  .filter(t => t.reportedFraud)
  .map(t => ({
    id: `FR${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
    transactionId: t.id,
    reportedBy: `User ${Math.floor(Math.random() * 1000)}`,
    reason: fraudReportReasons[Math.floor(Math.random() * fraudReportReasons.length)],
    details: 'This transaction was not authorized by me.',
    timestamp: new Date(Date.parse(t.timestamp) + Math.floor(Math.random() * 1000 * 60 * 60 * 24)).toISOString(),
    status: ['pending', 'investigating', 'resolved'][Math.floor(Math.random() * 3)] as 'pending' | 'investigating' | 'resolved',
  }));

// Generate stats data
export const generateStatsData = () => {
  return {
    totalTransactions: mockTransactions.length,
    fraudulentTransactions: mockTransactions.filter(t => t.fraudStatus === 'high').length,
    suspiciousTransactions: mockTransactions.filter(t => t.fraudStatus === 'medium').length,
    reportedFrauds: mockFraudReports.length,
    fraudAmount: mockTransactions
      .filter(t => t.fraudStatus === 'high' || t.reportedFraud)
      .reduce((sum, t) => sum + t.amount, 0),
    averageFraudScore: mockTransactions.reduce((sum, t) => sum + t.fraudScore, 0) / mockTransactions.length,
  };
};
