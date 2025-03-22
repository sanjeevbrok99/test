
import { useState, useEffect } from 'react';
import { Transaction, mockTransactions } from '@/data/mockData';

interface UseTransactionsOptions {
  searchTerm?: string;
  filters?: {
    dateRange?: { from?: Date; to?: Date };
    payerId?: string;
    payeeId?: string;
    fraudStatus?: string[];
    paymentMode?: string[];
    channel?: string[];
  };
  sortBy?: {
    field: keyof Transaction;
    direction: 'asc' | 'desc';
  };
  page?: number;
  pageSize?: number;
}

interface UseTransactionsResult {
  transactions: Transaction[];
  loading: boolean;
  error: Error | null;
  totalCount: number;
  totalPages: number;
  currentPage: number;
  setOptions: (options: UseTransactionsOptions) => void;
}

export const useTransactions = (initialOptions: UseTransactionsOptions = {}): UseTransactionsResult => {
  const [options, setOptions] = useState<UseTransactionsOptions>(initialOptions);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  
  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // In a real application, this would be an API call
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Filter transactions based on options
        let filteredTransactions = [...mockTransactions];
        
        // Apply search
        if (options.searchTerm) {
          const searchLower = options.searchTerm.toLowerCase();
          filteredTransactions = filteredTransactions.filter(t => 
            t.id.toLowerCase().includes(searchLower) ||
            t.payerId.toLowerCase().includes(searchLower) ||
            t.payeeId.toLowerCase().includes(searchLower) ||
            t.payerName.toLowerCase().includes(searchLower) ||
            t.payeeName.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply filters
        if (options.filters) {
          const { dateRange, payerId, payeeId, fraudStatus, paymentMode, channel } = options.filters;
          
          if (dateRange?.from || dateRange?.to) {
            filteredTransactions = filteredTransactions.filter(t => {
              const txDate = new Date(t.timestamp);
              const isAfterFrom = dateRange.from ? txDate >= dateRange.from : true;
              const isBeforeTo = dateRange.to ? txDate <= dateRange.to : true;
              return isAfterFrom && isBeforeTo;
            });
          }
          
          if (payerId) {
            filteredTransactions = filteredTransactions.filter(t => 
              t.payerId.toLowerCase().includes(payerId.toLowerCase())
            );
          }
          
          if (payeeId) {
            filteredTransactions = filteredTransactions.filter(t => 
              t.payeeId.toLowerCase().includes(payeeId.toLowerCase())
            );
          }
          
          if (fraudStatus && fraudStatus.length > 0) {
            filteredTransactions = filteredTransactions.filter(t => 
              fraudStatus.includes(t.fraudStatus)
            );
          }
          
          if (paymentMode && paymentMode.length > 0) {
            filteredTransactions = filteredTransactions.filter(t => 
              paymentMode.includes(t.paymentMode)
            );
          }
          
          if (channel && channel.length > 0) {
            filteredTransactions = filteredTransactions.filter(t => 
              channel.includes(t.channel)
            );
          }
        }
        
        // Apply sorting
        if (options.sortBy) {
          const { field, direction } = options.sortBy;
          filteredTransactions.sort((a, b) => {
            if (a[field] < b[field]) return direction === 'asc' ? -1 : 1;
            if (a[field] > b[field]) return direction === 'asc' ? 1 : -1;
            return 0;
          });
        } else {
          // Default sort by timestamp desc
          filteredTransactions.sort((a, b) => 
            new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          );
        }
        
        // Set total count before pagination
        setTotalCount(filteredTransactions.length);
        
        // Apply pagination
        const pageSize = options.pageSize || 10;
        const page = options.page || 1;
        const startIndex = (page - 1) * pageSize;
        const paginatedTransactions = filteredTransactions.slice(startIndex, startIndex + pageSize);
        
        setTransactions(paginatedTransactions);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    };
    
    fetchTransactions();
  }, [options]);
  
  return {
    transactions,
    loading,
    error,
    totalCount,
    totalPages: Math.ceil(totalCount / (options.pageSize || 10)),
    currentPage: options.page || 1,
    setOptions,
  };
};
