import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useTransactions } from '@/hooks/useTransactions';
import { generateStatsData } from '@/data/mockData';
import { useRealTimeAlerts } from '@/hooks/useRealTimeAlerts';
import { useFraudReport } from '@/hooks/useFraudReport';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import StatCards from '@/components/dashboard/StatCards';
import TransactionTable from '@/components/dashboard/TransactionTable';
import FraudReportDialog from '@/components/dashboard/FraudReportDialog';
import { FilterOption } from '@/components/common/FilterDropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { FraudMetrics } from '@/components/dashboard/FraudMetrics';
import { PaymentMethodAnalysis } from '@/components/dashboard/PaymentMethodAnalysis';
import { FraudTrendsChart } from '@/components/dashboard/FraudTrendsChart';
import ModelEvaluation from '@/components/dashboard/ModelEvaluation';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [timeFrame, setTimeFrame] = useState<'7d' | '30d' | '90d'>('7d');
  
  const { transactions, loading, totalPages } = useTransactions({
    searchTerm,
    filters,
    page,
    pageSize: 10,
  });
  
  const statsData = generateStatsData();
  
  // Filter options
  const statusOptions: FilterOption[] = [
    { id: 'safe', label: 'Safe' },
    { id: 'medium', label: 'Medium Risk' },
    { id: 'high', label: 'High Risk' },
  ];
  
  const paymentModeOptions: FilterOption[] = [
    { id: 'UPI', label: 'UPI' },
    { id: 'Card', label: 'Card' },
    { id: 'NEFT', label: 'NEFT' },
    { id: 'RTGS', label: 'RTGS' },
    { id: 'IMPS', label: 'IMPS' },
    { id: 'Wallet', label: 'Wallet' },
  ];
  
  const channelOptions: FilterOption[] = [
    { id: 'Web', label: 'Web' },
    { id: 'Mobile', label: 'Mobile' },
    { id: 'POS', label: 'POS' },
    { id: 'ATM', label: 'ATM' },
    { id: 'Branch', label: 'Branch' },
  ];
  
  // Custom hooks
  const { toggleAlerts } = useRealTimeAlerts(alertsEnabled);
  const {
    reportDialogOpen,
    setReportDialogOpen,
    reportingTransaction,
    reportReason,
    setReportReason,
    reportDetails,
    setReportDetails,
    handleReportFraud,
    submitFraudReport
  } = useFraudReport();
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setPage(1);
  };
  
  const handleFiltersChange = (newFilters: any) => {
    setFilters(newFilters);
    setPage(1);
  };
  
  const handleTimeFrameChange = (value: '7d' | '30d' | '90d') => {
    setTimeFrame(value);
  };
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
  };
  
  const handleToggleAlerts = () => {
    setAlertsEnabled(toggleAlerts(alertsEnabled));
  };

  return (
    <DashboardLayout>
      <DashboardHeader
        alertsEnabled={alertsEnabled}
        toggleAlerts={handleToggleAlerts}
        onSearch={handleSearch}
        onFiltersChange={handleFiltersChange}
        statusOptions={statusOptions}
        paymentModeOptions={paymentModeOptions}
        channelOptions={channelOptions}
      />
      
      <div className="space-y-6 mt-6">
        <StatCards data={statsData} />
        
        <h2 className="text-xl font-semibold mt-8 mb-4">Recent Transactions</h2>
        <TransactionTable
          transactions={transactions}
          loading={loading}
          pageCount={totalPages}
          pageIndex={page - 1}
          onPageChange={handlePageChange}
          onReportFraud={handleReportFraud}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-rose-500"></span>
                Fraud Trends Analysis
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs defaultValue="channel">
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="h-8">
                    <TabsTrigger value="channel" className="text-xs px-3">By Channel</TabsTrigger>
                    <TabsTrigger value="time" className="text-xs px-3">By Time</TabsTrigger>
                    <TabsTrigger value="location" className="text-xs px-3">By Location</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value="channel" className="mt-0">
                  <FraudTrendsChart />
                </TabsContent>
                <TabsContent value="time" className="mt-0">
                  <FraudTrendsChart />
                </TabsContent>
                <TabsContent value="location" className="mt-0">
                  <FraudTrendsChart />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
          
          <Card className="shadow-sm hover:shadow transition-shadow">
            <CardHeader className="pb-2 border-b">
              <CardTitle className="text-lg flex items-center gap-2">
                <span className="inline-block h-3 w-3 rounded-full bg-blue-500"></span>
                Model Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <Tabs 
                value={timeFrame} 
                onValueChange={(value) => handleTimeFrameChange(value as '7d' | '30d' | '90d')}
              >
                <div className="flex justify-between items-center mb-4">
                  <TabsList className="h-8">
                    <TabsTrigger value="7d" className="text-xs px-3">7 Days</TabsTrigger>
                    <TabsTrigger value="30d" className="text-xs px-3">30 Days</TabsTrigger>
                    <TabsTrigger value="90d" className="text-xs px-3">90 Days</TabsTrigger>
                  </TabsList>
                </div>
                
                <TabsContent value={timeFrame} className="mt-0">
                  <ModelEvaluation 
                    timeframe={timeFrame}
                    onTimeframeChange={handleTimeFrameChange}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <PaymentMethodAnalysis />
          <FraudMetrics />
        </div>
      </div>
      
      <FraudReportDialog
        open={reportDialogOpen}
        onOpenChange={setReportDialogOpen}
        transaction={reportingTransaction}
        reportReason={reportReason}
        reportDetails={reportDetails}
        onReasonChange={setReportReason}
        onDetailsChange={setReportDetails}
        onSubmit={submitFraudReport}
      />
    </DashboardLayout>
  );
};

export default Dashboard;
