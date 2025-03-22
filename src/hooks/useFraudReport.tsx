
import { useState } from 'react';
import { toast } from "sonner";
import { Transaction } from '@/data/mockData';

export const useFraudReport = () => {
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportingTransaction, setReportingTransaction] = useState<Transaction | null>(null);
  const [reportReason, setReportReason] = useState('');
  const [reportDetails, setReportDetails] = useState('');

  const handleReportFraud = (transaction: Transaction) => {
    setReportingTransaction(transaction);
    setReportDialogOpen(true);
  };
  
  const submitFraudReport = () => {
    if (!reportingTransaction || !reportReason) return;
    
    // In a real app, this would call an API
    toast.success(`Fraud report submitted for ${reportingTransaction.id}`);
    
    // Reset form
    setReportDialogOpen(false);
    setReportingTransaction(null);
    setReportReason('');
    setReportDetails('');
  };

  return {
    reportDialogOpen,
    setReportDialogOpen,
    reportingTransaction,
    reportReason,
    setReportReason,
    reportDetails,
    setReportDetails,
    handleReportFraud,
    submitFraudReport
  };
};
