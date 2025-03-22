
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Badge } from '@/components/ui/badge';
import UserSearch from '@/components/user-analysis/UserSearch';
import UserDetails from '@/components/user-analysis/UserDetails';
import { User } from '@/types/user-analysis';

const UserAnalysis = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  // Mock user list
  const users = [
    { id: 'USR001', name: 'Alice Johnson', email: 'alice@example.com', riskScore: 0.12, transactions: 45, status: 'safe', location: 'New York, US', lastActive: '2 hours ago' },
    { id: 'USR002', name: 'Bob Smith', email: 'bob@example.com', riskScore: 0.34, transactions: 27, status: 'safe', location: 'London, UK', lastActive: '5 days ago' },
    { id: 'USR003', name: 'Charlie Patel', email: 'charlie@example.com', riskScore: 0.72, transactions: 18, status: 'high', location: 'Mumbai, IN', lastActive: '1 day ago' },
    { id: 'USR004', name: 'Diana Wang', email: 'diana@example.com', riskScore: 0.23, transactions: 32, status: 'safe', location: 'Singapore, SG', lastActive: '3 hours ago' },
    { id: 'USR005', name: 'Ethan Kim', email: 'ethan@example.com', riskScore: 0.52, transactions: 21, status: 'medium', location: 'Seoul, KR', lastActive: '6 hours ago' },
  ];
  
  // Filter users based on search query
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.id.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // User transaction history data
  const userTransactionHistory = [
    { month: 'Jan', value: 3100, risk: 0.21 },
    { month: 'Feb', value: 2450, risk: 0.18 },
    { month: 'Mar', value: 5200, risk: 0.24 },
    { month: 'Apr', value: 4800, risk: 0.20 },
    { month: 'May', value: 5700, risk: 0.42 },
    { month: 'Jun', value: 4750, risk: 0.38 },
    { month: 'Jul', value: 6800, risk: 0.32 },
    { month: 'Aug', value: 5400, risk: 0.29 },
    { month: 'Sep', value: 7200, risk: 0.45 },
    { month: 'Oct', value: 8100, risk: 0.53 },
    { month: 'Nov', value: 6700, risk: 0.47 },
    { month: 'Dec', value: 7900, risk: 0.39 },
  ];
  
  // Device distribution
  const deviceData = [
    { name: 'Mobile App', value: 45 },
    { name: 'Web Browser', value: 30 },
    { name: 'Tablet', value: 15 },
    { name: 'API Access', value: 10 },
  ];
  
  const COLORS = ['#3b82f6', '#8b5cf6', '#f59e0b', '#10b981'];
  
  // Mock fraud trends data by time period
  const weeklyFraudData = [
    { day: 'Mon', attempts: 3, blocked: 2, value: 1250 },
    { day: 'Tue', attempts: 5, blocked: 4, value: 2800 },
    { day: 'Wed', attempts: 7, blocked: 6, value: 3200 },
    { day: 'Thu', attempts: 4, blocked: 3, value: 1800 },
    { day: 'Fri', attempts: 8, blocked: 7, value: 3900 },
    { day: 'Sat', attempts: 6, blocked: 5, value: 2400 },
    { day: 'Sun', attempts: 2, blocked: 1, value: 950 },
  ];
  
  const monthlyFraudData = [
    { week: 'Week 1', attempts: 12, blocked: 9, value: 5400 },
    { week: 'Week 2', attempts: 18, blocked: 15, value: 7600 },
    { week: 'Week 3', attempts: 15, blocked: 13, value: 6200 },
    { week: 'Week 4', attempts: 21, blocked: 18, value: 9300 },
  ];

  // Recent transactions for selected user
  const recentTransactions = [
    { id: 'TRX12345', date: '2023-12-18', amount: 432.12, status: 'completed', riskScore: 0.14, type: 'purchase' },
    { id: 'TRX12356', date: '2023-12-15', amount: 127.50, status: 'completed', riskScore: 0.22, type: 'purchase' },
    { id: 'TRX12289', date: '2023-12-10', amount: 89.99, status: 'completed', riskScore: 0.19, type: 'purchase' },
    { id: 'TRX12188', date: '2023-12-05', amount: 350.00, status: 'completed', riskScore: 0.67, type: 'transfer' },
    { id: 'TRX12001', date: '2023-11-28', amount: 75.25, status: 'completed', riskScore: 0.12, type: 'purchase' },
  ];
  
  // User risk factors
  const riskFactors = [
    { factor: 'New Device Login', severity: 'high', details: 'Login from unrecognized device in Singapore' },
    { factor: 'Unusual Transaction Amount', severity: 'medium', details: 'Transaction 250% larger than user average' },
    { factor: 'Velocity Check', severity: 'medium', details: '5 transactions in 30 minutes' },
    { factor: 'Location Change', severity: 'low', details: 'User accessing from different city than usual' },
  ];
  
  const getRiskBadge = (status: string) => {
    switch (status) {
      case 'safe':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">Low Risk</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Medium Risk</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">High Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getRiskColor = (score: number) => {
    if (score < 0.3) return 'text-green-500';
    if (score < 0.6) return 'text-yellow-500';
    return 'text-rose-500';
  };
  
  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'low':
        return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">Low</Badge>;
      case 'medium':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Medium</Badge>;
      case 'high':
        return <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">High</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <DashboardLayout>
      <div className="animate-in slide-up">
        <h1 className="text-3xl font-bold tracking-tight">User Analysis</h1>
        <p className="text-muted-foreground mt-1">Analyze user behavior and identify suspicious activities</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <UserSearch 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          filteredUsers={filteredUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          getRiskBadge={getRiskBadge}
          getRiskColor={getRiskColor}
        />
        
        <UserDetails
          selectedUser={selectedUser}
          getRiskBadge={getRiskBadge}
          userTransactionHistory={userTransactionHistory}
          deviceData={deviceData}
          COLORS={COLORS}
          getRiskColor={getRiskColor}
          recentTransactions={recentTransactions}
          formatDate={formatDate}
          riskFactors={riskFactors}
          getSeverityBadge={getSeverityBadge}
          weeklyFraudData={weeklyFraudData}
          monthlyFraudData={monthlyFraudData}
        />
      </div>
    </DashboardLayout>
  );
};

export default UserAnalysis;
