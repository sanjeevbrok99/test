
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import SearchBar from '@/components/common/SearchBar';
import { FraudReport, mockFraudReports, mockTransactions } from '@/data/mockData';
import { format } from 'date-fns';
import { ExternalLink, AlertCircle, Clock, CheckCircle } from 'lucide-react';
import { toast } from "sonner";

const Reports = () => {
  const [reports, setReports] = useState<FraudReport[]>(mockFraudReports);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-white';
      case 'investigating':
        return 'bg-blue-500 text-white';
      case 'resolved':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="mr-1 h-3.5 w-3.5" />;
      case 'investigating':
        return <Clock className="mr-1 h-3.5 w-3.5" />;
      case 'resolved':
        return <CheckCircle className="mr-1 h-3.5 w-3.5" />;
      default:
        return null;
    }
  };

  const handleUpdateStatus = (reportId: string, newStatus: 'pending' | 'investigating' | 'resolved') => {
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === reportId
          ? { ...report, status: newStatus }
          : report
      )
    );
    
    toast.success(`Report ${reportId} status updated to ${newStatus}`);
  };

  const filteredReports = reports
    .filter(report => statusFilter === 'all' || report.status === statusFilter)
    .filter(report => 
      searchTerm === '' || 
      report.transactionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Fraud Reports</h1>
          <p className="text-muted-foreground mt-2">
            Review and manage fraud reports submitted by users
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <SearchBar
            onSearch={setSearchTerm}
            placeholder="Search by Transaction ID or User..."
            className="w-full md:w-64"
          />
          
          <Select
            value={statusFilter}
            onValueChange={setStatusFilter}
          >
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Reports</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="investigating">Investigating</SelectItem>
              <SelectItem value="resolved">Resolved</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {filteredReports.length > 0 ? (
            filteredReports.map(report => {
              const transaction = mockTransactions.find(t => t.id === report.transactionId);
              
              return (
                <Card key={report.id} className="hover-lift overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <h3 className="font-medium">Report #{report.id}</h3>
                          <Badge className={getStatusColor(report.status)} variant="outline">
                            <div className="flex items-center">
                              {getStatusIcon(report.status)}
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </div>
                          </Badge>
                        </div>
                        
                        <div className="text-sm">
                          <div>Transaction ID: <span className="font-medium">{report.transactionId}</span></div>
                          <div>Reported by: <span className="font-medium">{report.reportedBy}</span></div>
                          <div>Reason: <span className="font-medium">{report.reason}</span></div>
                          <div>Date: <span className="font-medium">{format(new Date(report.timestamp), 'MMM d, yyyy h:mm a')}</span></div>
                        </div>
                        
                        <p className="text-sm text-muted-foreground bg-muted p-2 rounded-sm">
                          {report.details}
                        </p>
                      </div>
                      
                      <div className="flex flex-col gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1 w-full"
                          onClick={() => toast.info(`Viewing details for ${report.transactionId}`)}
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          View Transaction
                        </Button>
                        
                        <div className="grid grid-cols-3 gap-2">
                          <Button
                            variant={report.status === 'pending' ? 'secondary' : 'outline'}
                            size="sm"
                            className="text-xs"
                            disabled={report.status === 'pending'}
                            onClick={() => handleUpdateStatus(report.id, 'pending')}
                          >
                            Pending
                          </Button>
                          <Button
                            variant={report.status === 'investigating' ? 'secondary' : 'outline'}
                            size="sm"
                            className="text-xs"
                            disabled={report.status === 'investigating'}
                            onClick={() => handleUpdateStatus(report.id, 'investigating')}
                          >
                            Investigating
                          </Button>
                          <Button
                            variant={report.status === 'resolved' ? 'secondary' : 'outline'}
                            size="sm"
                            className="text-xs"
                            disabled={report.status === 'resolved'}
                            onClick={() => handleUpdateStatus(report.id, 'resolved')}
                          >
                            Resolved
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    {transaction && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                          <div>
                            <span className="text-muted-foreground">Amount: </span>
                            <span className="font-medium">${transaction.amount.toFixed(2)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Fraud Score: </span>
                            <span className="font-medium">{transaction.fraudScore.toFixed(1)}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Payment Mode: </span>
                            <span className="font-medium">{transaction.paymentMode}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="text-center p-12">
              <h3 className="text-lg font-medium">No reports found</h3>
              <p className="text-muted-foreground">Try changing your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
