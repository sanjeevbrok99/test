
import React from 'react';
import TransactionTable from '@/components/dashboard/TransactionTable';
import StatCards from '@/components/dashboard/StatCards';
import { Transaction } from '@/data/mockData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FraudTrendsChart } from '@/components/dashboard/FraudTrendsChart';
import ModelEvaluation from '@/components/dashboard/ModelEvaluation';
import { PaymentMethodAnalysis } from '@/components/dashboard/PaymentMethodAnalysis';
import { FraudMetrics } from '@/components/dashboard/FraudMetrics';

interface DashboardContentProps {
  transactions: Transaction[];
  loading: boolean;
  totalPages: number;
  page: number;
  onPageChange: (newPage: number) => void;
  onReportFraud: (transaction: Transaction) => void;
  statsData: any;
  timeFrame: '7d' | '30d' | '90d';
  onTimeFrameChange: (value: '7d' | '30d' | '90d') => void;
}

const DashboardContent: React.FC<DashboardContentProps> = ({
  transactions,
  loading,
  totalPages,
  page,
  onPageChange,
  onReportFraud,
  statsData,
  timeFrame,
  onTimeFrameChange
}) => {
  return (
    <div className="space-y-6 animate-in slide-up">
      <StatCards data={statsData} />
      
      <h2 className="text-xl font-semibold mt-8 mb-4">Recent Transactions</h2>
      <TransactionTable
        transactions={transactions}
        loading={loading}
        pageCount={totalPages}
        pageIndex={page - 1}
        onPageChange={onPageChange}
        onReportFraud={onReportFraud}
      />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <Tabs defaultValue="channel">
          <TabsContent value="channel">
            <FraudTrendsChart />
          </TabsContent>
        </Tabs>
        
        <Tabs 
          value={timeFrame} 
          onValueChange={(value) => onTimeFrameChange(value as '7d' | '30d' | '90d')}
        >
          <TabsContent value={timeFrame}>
            <ModelEvaluation 
              timeframe={timeFrame}
              onTimeframeChange={onTimeFrameChange}
            />
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <PaymentMethodAnalysis />
        <FraudMetrics />
      </div>
    </div>
  );
};

export default DashboardContent;
