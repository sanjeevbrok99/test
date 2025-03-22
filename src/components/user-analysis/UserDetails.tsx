
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User } from '@/types/user-analysis';
import { UserRound } from 'lucide-react';
import UserOverview from './UserOverview';
import UserTransactions from './UserTransactions';
import UserRiskAnalysis from './UserRiskAnalysis';
import UserFraudTrends from './UserFraudTrends';

interface UserDetailsProps {
  selectedUser: User | null;
  getRiskBadge: (status: string) => React.ReactNode;
  userTransactionHistory: any[];
  deviceData: any[];
  COLORS: string[];
  getRiskColor: (score: number) => string;
  recentTransactions: any[];
  formatDate: (dateString: string) => string;
  riskFactors: any[];
  getSeverityBadge: (severity: string) => React.ReactNode;
  weeklyFraudData: any[];
  monthlyFraudData: any[];
}

const UserDetails = ({
  selectedUser,
  getRiskBadge,
  userTransactionHistory,
  deviceData,
  COLORS,
  getRiskColor,
  recentTransactions,
  formatDate,
  riskFactors,
  getSeverityBadge,
  weeklyFraudData,
  monthlyFraudData
}: UserDetailsProps) => {
  if (!selectedUser) {
    return (
      <Card className="glass-card col-span-3 md:col-span-2 animate-in slide-up delay-200">
        <div className="flex flex-col items-center justify-center h-full py-12">
          <UserRound className="h-16 w-16 text-muted-foreground/30" />
          <h3 className="text-xl font-medium mt-4">Select a User</h3>
          <p className="text-muted-foreground mt-1">Select a user from the list to view detailed analysis</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="glass-card col-span-3 md:col-span-2 animate-in slide-up delay-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <UserRound className="h-5 w-5 text-primary" />
              {selectedUser.name}
            </CardTitle>
            <CardDescription>User ID: {selectedUser.id} | {selectedUser.email}</CardDescription>
          </div>
          {getRiskBadge(selectedUser.status)}
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="fraud">Fraud Trends</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <UserOverview 
              selectedUser={selectedUser}
              userTransactionHistory={userTransactionHistory}
              deviceData={deviceData}
              COLORS={COLORS}
              getRiskColor={getRiskColor}
            />
          </TabsContent>
          
          <TabsContent value="transactions">
            <UserTransactions
              recentTransactions={recentTransactions}
              getRiskColor={getRiskColor}
              formatDate={formatDate}
            />
          </TabsContent>
          
          <TabsContent value="risk">
            <UserRiskAnalysis
              riskFactors={riskFactors}
              getSeverityBadge={getSeverityBadge}
            />
          </TabsContent>
          
          <TabsContent value="fraud">
            <UserFraudTrends
              weeklyFraudData={weeklyFraudData}
              monthlyFraudData={monthlyFraudData}
            />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default UserDetails;
