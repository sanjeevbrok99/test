
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import TransactionTable from '@/components/dashboard/TransactionTable';
import { useTransactions } from '@/hooks/useTransactions';
import SearchBar from '@/components/common/SearchBar';
import FilterDropdown, { FilterOption } from '@/components/common/FilterDropdown';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useFraudReport } from '@/hooks/useFraudReport';
import FraudReportDialog from '@/components/dashboard/FraudReportDialog';

const Transactions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);
  const [timeFrame, setTimeFrame] = useState<'7d' | '30d' | '90d'>('7d');
  
  const { transactions, loading, totalPages } = useTransactions({
    searchTerm,
    filters,
    page,
    pageSize: 10,
  });

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
  
  const handlePageChange = (newPage: number) => {
    setPage(newPage + 1);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4 flex-col md:flex-row">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Transaction Monitoring</h1>
            <p className="text-muted-foreground mt-1">View and analyze all transactions in the system</p>
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search transactions..."
              className="w-full md:w-64"
            />
            <FilterDropdown
              onFiltersChange={handleFiltersChange}
              statusOptions={statusOptions}
              paymentModeOptions={paymentModeOptions}
              channelOptions={channelOptions}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={timeFrame} onValueChange={(value: string) => setTimeFrame(value as '7d' | '30d' | '90d')} className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-4">
                <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
                <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
                <TabsTrigger value="90d">Last 90 Days</TabsTrigger>
              </TabsList>
              <TabsContent value="7d">
                <TransactionTable
                  transactions={transactions}
                  loading={loading}
                  pageCount={totalPages}
                  pageIndex={page - 1}
                  onPageChange={handlePageChange}
                  onReportFraud={handleReportFraud}
                />
              </TabsContent>
              <TabsContent value="30d">
                <TransactionTable
                  transactions={transactions}
                  loading={loading}
                  pageCount={totalPages}
                  pageIndex={page - 1}
                  onPageChange={handlePageChange}
                  onReportFraud={handleReportFraud}
                />
              </TabsContent>
              <TabsContent value="90d">
                <TransactionTable
                  transactions={transactions}
                  loading={loading}
                  pageCount={totalPages}
                  pageIndex={page - 1}
                  onPageChange={handlePageChange}
                  onReportFraud={handleReportFraud}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
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

export default Transactions;
