
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { MapPin, Clock } from 'lucide-react';
import { User } from '@/types/user-analysis';

interface UserOverviewProps {
  selectedUser: User;
  userTransactionHistory: any[];
  deviceData: any[];
  COLORS: string[];
  getRiskColor: (score: number) => string;
}

const UserOverview = ({ 
  selectedUser, 
  userTransactionHistory, 
  deviceData, 
  COLORS, 
  getRiskColor 
}: UserOverviewProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Risk Score</p>
            <div className="flex items-center mt-1">
              <div className="w-full bg-muted rounded-full h-2 mr-2">
                <div
                  className={`h-2 rounded-full ${
                    selectedUser.riskScore > 0.6
                      ? 'bg-rose-500'
                      : selectedUser.riskScore > 0.3
                      ? 'bg-yellow-500'
                      : 'bg-green-500'
                  }`}
                  style={{ width: `${selectedUser.riskScore * 100}%` }}
                />
              </div>
              <span className={`font-bold ${getRiskColor(selectedUser.riskScore)}`}>
                {(selectedUser.riskScore * 100).toFixed(0)}%
              </span>
            </div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-2xl font-bold mt-1">{selectedUser.transactions}</p>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Location</p>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{selectedUser.location}</p>
            </div>
          </div>
          <div className="bg-muted/30 p-4 rounded-lg">
            <p className="text-sm text-muted-foreground">Last Active</p>
            <div className="flex items-center gap-1 mt-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <p className="font-medium">{selectedUser.lastActive}</p>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-2">Device Usage</h3>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={deviceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  labelLine={false}
                >
                  {deviceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-sm font-medium mb-2">Transaction Activity</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={userTransactionHistory} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.15} />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="value" 
                name="Transaction Amount" 
                stroke="#3b82f6" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="risk" 
                name="Risk Score" 
                stroke="#ef4444" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default UserOverview;
