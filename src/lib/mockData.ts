
export interface Transaction {
  transaction_id: string;
  transaction_date: string;
  transaction_amount: number;
  transaction_channel: string;
  payment_mode: string;
  gateway: string;
  payer_email: string;
  payee_id: string;
  status: 'completed' | 'pending' | 'failed';
  is_fraud_predicted: boolean;
  is_fraud_reported: boolean;
  fraud_score?: number;
}

// Generate mock transactions
export const transactions: Transaction[] = Array.from({ length: 100 }, (_, i) => {
  const channels = ['web', 'mobile', 'in-store', 'atm'];
  const paymentModes = ['UPI', 'CARD', 'NEFT', 'RTGS', 'IMPS', 'Wallet'];
  const gateways = ['bank_sbi', 'bank_hdfc', 'bank_icici', 'bank_axis', 'bank_yes'];
  
  const isFraudPredicted = Math.random() < 0.15;
  const isFraudReported = isFraudPredicted && Math.random() < 0.6;
  
  // Some simple logic to make numbers more realistic
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  date.setHours(Math.floor(Math.random() * 24), Math.floor(Math.random() * 60));
  
  return {
    transaction_id: `TXN${(1000000 + i).toString()}`,
    transaction_date: date.toISOString(),
    transaction_amount: Math.floor(Math.random() * 10000) + 100,
    transaction_channel: channels[Math.floor(Math.random() * channels.length)],
    payment_mode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
    gateway: gateways[Math.floor(Math.random() * gateways.length)],
    payer_email: `user${i}@example.com`,
    payee_id: `PAYEE${1000 + Math.floor(Math.random() * 1000)}`,
    status: Math.random() < 0.1 ? 'failed' : Math.random() < 0.2 ? 'pending' : 'completed',
    is_fraud_predicted: isFraudPredicted,
    is_fraud_reported: isFraudReported,
    fraud_score: isFraudPredicted ? 0.5 + Math.random() * 0.5 : Math.random() * 0.4
  };
});

// Utility functions for data analysis
export const getFraudByChannel = (transactions: Transaction[]) => {
  const channels = [...new Set(transactions.map(t => t.transaction_channel))];
  
  return channels.map(channel => {
    const filtered = transactions.filter(t => t.transaction_channel === channel);
    return {
      channel,
      total: filtered.length,
      fraudPredicted: filtered.filter(t => t.is_fraud_predicted).length,
      fraudReported: filtered.filter(t => t.is_fraud_reported).length
    };
  });
};

export const getFraudByPaymentMode = (transactions: Transaction[]) => {
  const modes = [...new Set(transactions.map(t => t.payment_mode))];
  
  return modes.map(mode => {
    const filtered = transactions.filter(t => t.payment_mode === mode);
    return {
      mode,
      total: filtered.length,
      fraudPredicted: filtered.filter(t => t.is_fraud_predicted).length,
      fraudReported: filtered.filter(t => t.is_fraud_reported).length
    };
  });
};

export const getFraudByGateway = (transactions: Transaction[]) => {
  const gateways = [...new Set(transactions.map(t => t.gateway))];
  
  return gateways.map(gateway => {
    const filtered = transactions.filter(t => t.gateway === gateway);
    return {
      gateway,
      total: filtered.length,
      fraudPredicted: filtered.filter(t => t.is_fraud_predicted).length,
      fraudReported: filtered.filter(t => t.is_fraud_reported).length
    };
  });
};

export const getConfusionMatrix = (transactions: Transaction[]) => {
  const truePositives = transactions.filter(t => t.is_fraud_predicted && t.is_fraud_reported).length;
  const falsePositives = transactions.filter(t => t.is_fraud_predicted && !t.is_fraud_reported).length;
  const trueNegatives = transactions.filter(t => !t.is_fraud_predicted && !t.is_fraud_reported).length;
  const falseNegatives = transactions.filter(t => !t.is_fraud_predicted && t.is_fraud_reported).length;
  
  const precision = truePositives / (truePositives + falsePositives) || 0;
  const recall = truePositives / (truePositives + falseNegatives) || 0;
  const f1Score = 2 * (precision * recall) / (precision + recall) || 0;
  
  return {
    truePositives,
    falsePositives,
    trueNegatives,
    falseNegatives,
    precision,
    recall,
    f1Score
  };
};

export const generateTimeSeriesData = () => {
  const data = [];
  const today = new Date();
  
  for (let i = 29; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    data.push({
      date: date.toISOString().split('T')[0],
      predicted: Math.floor(Math.random() * 15) + 5,
      reported: Math.floor(Math.random() * 10) + 2,
      resolved: Math.floor(Math.random() * 8) + 1
    });
  }
  
  return data;
};

// Create fraud trend components for dashboard
export const generateFraudTrendData = () => {
  return {
    channelData: [
      { name: "Web", predicted: 78, reported: 42, total: 156 },
      { name: "Mobile", predicted: 65, reported: 38, total: 132 },
      { name: "In-store", predicted: 42, reported: 25, total: 98 },
      { name: "ATM", predicted: 34, reported: 21, total: 76 },
    ],
    paymentModeData: [
      { name: "UPI", predicted: 56, reported: 32, total: 128 },
      { name: "Card", predicted: 87, reported: 47, total: 174 },
      { name: "NEFT", predicted: 34, reported: 18, total: 86 },
      { name: "RTGS", predicted: 23, reported: 12, total: 62 },
      { name: "IMPS", predicted: 45, reported: 27, total: 96 },
    ],
    bankData: [
      { name: "SBI", predicted: 67, reported: 35, total: 145 },
      { name: "HDFC", predicted: 54, reported: 32, total: 128 },
      { name: "ICICI", predicted: 48, reported: 26, total: 112 },
      { name: "Axis", predicted: 42, reported: 23, total: 96 },
      { name: "Yes", predicted: 38, reported: 19, total: 86 },
    ]
  };
};

export const generateStatsData = () => {
  return [
    {
      title: "Total Transactions",
      value: "4,287",
      change: "+12.4%",
      icon: "activity",
    },
    {
      title: "Fraud Alerts",
      value: "127",
      change: "-3.2%",
      icon: "alert-triangle",
    },
    {
      title: "Risk Score",
      value: "87%",
      change: "+5.1%",
      icon: "shield",
    },
    {
      title: "Response Time",
      value: "546ms",
      change: "-18.5%",
      icon: "clock",
    },
  ];
};

// Create components for dashboard
export const FraudMetrics = () => {
  // This is just a placeholder to avoid errors when importing
  return null;
};

export const PaymentMethodAnalysis = () => {
  // This is just a placeholder to avoid errors when importing
  return null;
};

export const TransactionTable = () => {
  // This is just a placeholder to avoid errors when importing
  return null;
};
