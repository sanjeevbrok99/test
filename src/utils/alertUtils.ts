import { toast } from "sonner";
import { Transaction, Rule, PaymentMode, TransactionChannel } from "@/data/mockData";

export type AlertType = 'high' | 'medium' | 'info';
export type AlertChannel = 'app' | 'email' | 'sms';

interface AlertOptions {
  type?: AlertType;
  channels?: AlertChannel[];
  autoClose?: boolean;
  timeout?: number;
}

const defaultOptions: AlertOptions = {
  type: 'info',
  channels: ['app'],
  autoClose: true,
  timeout: 5000
};

export const sendFraudAlert = (
  transaction: Transaction, 
  message: string, 
  options: AlertOptions = {}
) => {
  const alertOptions = { ...defaultOptions, ...options };
  
  // Format currency
  const amount = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(transaction.amount);
  
  const title = `Fraud Alert: ${transaction.id}`;
  const description = `${message}\nAmount: ${amount}\nDetected: ${new Date().toLocaleString()}`;
  
  // Send in-app notification
  if (alertOptions.channels?.includes('app')) {
    switch (alertOptions.type) {
      case 'high':
        toast.error(title, { description });
        break;
      case 'medium':
        toast.warning(title, { description });
        break;
      default:
        toast.info(title, { description });
    }
  }
  
  // Log all channels that would be activated in a real system
  console.log(
    `Alert for transaction ${transaction.id} sent via ${alertOptions.channels?.join(', ')}`
  );
  
  return {
    id: `alert-${Date.now()}`,
    transactionId: transaction.id,
    message,
    timestamp: new Date().toISOString(),
    channels: alertOptions.channels,
    type: alertOptions.type
  };
};

export const testRuleAgainstTransaction = (rule: Rule, transaction: Transaction): boolean => {
  // This is a simplified implementation - in a real system this would be more robust
  try {
    // For demonstration purposes, we'll implement a few basic conditions
    const condition = rule.condition.toLowerCase();
    
    // Check amount conditions
    if (condition.includes('amount >')) {
      const threshold = parseFloat(condition.split('amount >')[1].trim());
      if (transaction.amount <= threshold) return false;
    }
    
    if (condition.includes('amount <')) {
      const threshold = parseFloat(condition.split('amount <')[1].trim());
      if (transaction.amount >= threshold) return false;
    }
    
    // Check country conditions
    if (condition.includes("country =")) {
      const country = condition.split("country =")[1].trim().replace(/'/g, '');
      if (transaction.payerBank !== country) return false; // Using payerBank as substitute for country
    }
    
    if (condition.includes("country !=")) {
      const country = condition.split("country !=")[1].trim().replace(/'/g, '');
      if (transaction.payerBank === country) return false; // Using payerBank as substitute for country
    }
    
    // Check payment mode conditions
    if (condition.includes("paymentmode =")) {
      const mode = condition.split("paymentmode =")[1].trim().replace(/'/g, '');
      if (transaction.paymentMode !== mode) return false;
    }
    
    // Check channel conditions
    if (condition.includes("channel =")) {
      const channel = condition.split("channel =")[1].trim().replace(/'/g, '');
      if (transaction.channel !== channel) return false;
    }
    
    // If all conditions passed (or none were checked), the rule matches
    return true;
  } catch (error) {
    console.error("Error evaluating rule:", error);
    return false;
  }
};

export const simulateRealtimeAlert = () => {
  // This function simulates receiving real-time alerts
  const randomAmount = Math.floor(Math.random() * 10000) + 500;
  const randomId = `TX-${Date.now().toString().slice(-6)}`;
  
  const paymentModes: PaymentMode[] = ["UPI", "Card", "Wallet"];
  const channels: TransactionChannel[] = ["Web", "Mobile", "POS"];
  const banks = ["US", "UK", "IN", "CA"];
  
  const mockTransaction: Transaction = {
    id: randomId,
    amount: randomAmount,
    timestamp: new Date().toISOString(),
    payerId: `P-${Math.floor(Math.random() * 1000)}`,
    payerName: "Random User",
    payerBank: banks[Math.floor(Math.random() * banks.length)] as any,
    payeeId: `M-${Math.floor(Math.random() * 1000)}`,
    payeeName: "Random Merchant",
    payeeBank: banks[Math.floor(Math.random() * banks.length)] as any,
    paymentMode: paymentModes[Math.floor(Math.random() * paymentModes.length)],
    channel: channels[Math.floor(Math.random() * channels.length)],
    fraudScore: Math.floor(Math.random() * 100),
    fraudStatus: Math.random() > 0.7 ? "high" : Math.random() > 0.4 ? "medium" : "safe",
    reportedFraud: false
  };
  
  const alertType: AlertType = mockTransaction.fraudStatus === "high" 
    ? "high" 
    : mockTransaction.fraudStatus === "medium" 
      ? "medium" 
      : "info";
  
  sendFraudAlert(
    mockTransaction,
    `Suspicious ${mockTransaction.paymentMode} transaction detected from ${mockTransaction.payerBank}`,
    { type: alertType, channels: ['app', 'email'] }
  );
  
  return mockTransaction;
};
