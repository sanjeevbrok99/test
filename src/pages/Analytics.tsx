
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import FraudTrends from '@/components/dashboard/FraudTrends';
import ModelEvaluation from '@/components/dashboard/ModelEvaluation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { generateModelEvaluationData, generateFraudTrendData, generateTimeSeriesData } from '@/data/mockData';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

const Analytics = () => {
  const [timeFrame, setTimeFrame] = useState<'7d' | '30d' | '90d'>('7d');
  const modelData = generateModelEvaluationData();
  const fraudData = generateFraudTrendData();
  const timeSeriesData = generateTimeSeriesData();

  // Create geographic distribution data
  const geoData = [
    { name: 'North America', value: 35 },
    { name: 'Europe', value: 25 },
    { name: 'Asia', value: 20 },
    { name: 'Africa', value: 10 },
    { name: 'South America', value: 7 },
    { name: 'Oceania', value: 3 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground mt-1">Comprehensive fraud analytics and insights</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fraud Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={timeFrame} onValueChange={(value: string) => setTimeFrame(value as '7d' | '30d' | '90d')}>
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
                  <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
                  <TabsTrigger value="90d">Last 90 Days</TabsTrigger>
                </TabsList>

                <TabsContent value="7d">
                  <FraudTrends />
                </TabsContent>
                <TabsContent value="30d">
                  <FraudTrends />
                </TabsContent>
                <TabsContent value="90d">
                  <FraudTrends />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Model Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={timeFrame} onValueChange={(value: string) => setTimeFrame(value as '7d' | '30d' | '90d')}>
                <TabsList className="grid w-full max-w-md grid-cols-3">
                  <TabsTrigger value="7d">Last 7 Days</TabsTrigger>
                  <TabsTrigger value="30d">Last 30 Days</TabsTrigger>
                  <TabsTrigger value="90d">Last 90 Days</TabsTrigger>
                </TabsList>

                <TabsContent value="7d">
                  <ModelEvaluation timeframe="7d" onTimeframeChange={setTimeFrame} />
                </TabsContent>
                <TabsContent value="30d">
                  <ModelEvaluation timeframe="30d" onTimeframeChange={setTimeFrame} />
                </TabsContent>
                <TabsContent value="90d">
                  <ModelEvaluation timeframe="90d" onTimeframeChange={setTimeFrame} />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Fraud by Payment Mode</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={fraudData.paymentModeData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="predicted" name="Predicted Fraud" fill="#ef4444" />
                    <Bar dataKey="reported" name="Reported Fraud" fill="#eab308" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Geographic Fraud Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={geoData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={90}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {geoData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
