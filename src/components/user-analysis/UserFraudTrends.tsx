
import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts';

interface UserFraudTrendsProps {
  weeklyFraudData: any[];
  monthlyFraudData: any[];
}

const UserFraudTrends = ({ weeklyFraudData, monthlyFraudData }: UserFraudTrendsProps) => {
  const [fraudTimeView, setFraudTimeView] = useState<'weekly' | 'monthly'>('weekly');
  
  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium">Fraud Activity Trends</h3>
          <div className="flex">
            <Button 
              variant={fraudTimeView === 'weekly' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-r-none"
              onClick={() => setFraudTimeView('weekly')}
            >
              Weekly
            </Button>
            <Button 
              variant={fraudTimeView === 'monthly' ? 'default' : 'outline'} 
              size="sm" 
              className="rounded-l-none"
              onClick={() => setFraudTimeView('monthly')}
            >
              Monthly
            </Button>
          </div>
        </div>
        
        <Card className="p-4">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              {fraudTimeView === 'weekly' ? (
                <BarChart
                  data={weeklyFraudData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="day" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'value' ? `$${value}` : value,
                      name === 'value' ? 'Amount' : name === 'attempts' ? 'Attempts' : 'Blocked'
                    ]}
                  />
                  <Legend />
                  <Bar yAxisId="left" dataKey="attempts" name="Fraud Attempts" fill="#8b5cf6" />
                  <Bar yAxisId="left" dataKey="blocked" name="Blocked Attempts" fill="#10b981" />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="value"
                    name="Transaction Amount"
                    stroke="#f43f5e"
                    strokeWidth={2}
                  />
                </BarChart>
              ) : (
                <AreaChart
                  data={monthlyFraudData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                  <XAxis dataKey="week" />
                  <YAxis yAxisId="left" orientation="left" />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip 
                    formatter={(value, name) => [
                      name === 'value' ? `$${value}` : value,
                      name === 'value' ? 'Amount' : name === 'attempts' ? 'Attempts' : 'Blocked'
                    ]}
                  />
                  <Legend />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="attempts"
                    name="Fraud Attempts"
                    fill="#8b5cf6"
                    fillOpacity={0.6}
                    stroke="#8b5cf6"
                  />
                  <Area
                    yAxisId="left"
                    type="monotone"
                    dataKey="blocked"
                    name="Blocked Attempts"
                    fill="#10b981"
                    fillOpacity={0.6}
                    stroke="#10b981"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="value"
                    name="Transaction Amount"
                    stroke="#f43f5e"
                    strokeWidth={2}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-3">Fraud Prevention Actions</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-primary mt-0.5" />
            <span>Enhanced authentication required for high-value transactions</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-primary mt-0.5" />
            <span>User account monitoring activated</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-primary mt-0.5" />
            <span>Geolocation verification enabled</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserFraudTrends;
