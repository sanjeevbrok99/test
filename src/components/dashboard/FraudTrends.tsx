
import React, { useState } from 'react';
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
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { generateFraudTrendData, generateTimeSeriesData } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface FraudTrendsProps {
  className?: string;
}

const FraudTrends: React.FC<FraudTrendsProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState('channel');
  const trendData = generateFraudTrendData();
  const timeSeriesData = generateTimeSeriesData();

  // Custom tooltip for bar charts
  const CustomBarTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-blur p-3 rounded-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-status-high">
            Predicted: {payload[0].value}
          </p>
          <p className="text-xs text-status-medium">
            Reported: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  // Custom tooltip for line chart
  const CustomLineTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="neo-blur p-3 rounded-lg">
          <p className="text-sm font-medium">{label}</p>
          <p className="text-xs text-status-high">
            Predicted: {payload[0].value}
          </p>
          <p className="text-xs text-status-medium">
            Reported: {payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-0">
        <CardTitle>Fraud Trend Analysis</CardTitle>
        <Tabs
          defaultValue="channel"
          value={activeTab}
          onValueChange={setActiveTab}
          className="mt-2"
        >
          <TabsList className="grid grid-cols-4 h-9">
            <TabsTrigger value="channel" className="text-xs">
              Channel
            </TabsTrigger>
            <TabsTrigger value="paymentMode" className="text-xs">
              Payment Mode
            </TabsTrigger>
            <TabsTrigger value="bank" className="text-xs">
              Bank
            </TabsTrigger>
            <TabsTrigger value="timeSeries" className="text-xs">
              Time Series
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </CardHeader>
      <CardContent className="pt-4">
        <TabsContent value="channel" className="mt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendData.channelData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="predicted" name="Predicted Fraud" fill="rgba(239, 68, 68, 0.8)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reported" name="Reported Fraud" fill="rgba(234, 179, 8, 0.8)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="paymentMode" className="mt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendData.paymentModeData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="predicted" name="Predicted Fraud" fill="rgba(239, 68, 68, 0.8)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reported" name="Reported Fraud" fill="rgba(234, 179, 8, 0.8)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="bank" className="mt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={trendData.bankData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomBarTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="predicted" name="Predicted Fraud" fill="rgba(239, 68, 68, 0.8)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="reported" name="Reported Fraud" fill="rgba(234, 179, 8, 0.8)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
        <TabsContent value="timeSeries" className="mt-0">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={timeSeriesData}
                margin={{ top: 10, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" vertical={false} />
                <XAxis 
                  dataKey="date" 
                  tick={{ fontSize: 12 }} 
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getDate()}/${date.getMonth() + 1}`;
                  }}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip content={<CustomLineTooltip />} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line 
                  type="monotone" 
                  dataKey="predicted" 
                  name="Predicted Fraud" 
                  stroke="rgba(239, 68, 68, 0.8)" 
                  activeDot={{ r: 4 }} 
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="reported" 
                  name="Reported Fraud" 
                  stroke="rgba(234, 179, 8, 0.8)" 
                  activeDot={{ r: 4 }} 
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </TabsContent>
      </CardContent>
    </Card>
  );
};

export default FraudTrends;
