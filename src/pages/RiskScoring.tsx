
import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, Cell
} from 'recharts';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Shield, Activity, BarChart3, LineChart as LineChartIcon } from 'lucide-react';
import { mockTransactions } from '@/data/mockData';

const RiskScoring = () => {
  const [riskThreshold, setRiskThreshold] = useState([0.7]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('line');
  
  // Generate risk distribution data
  const riskDistribution = [
    { score: '0.0-0.1', count: 145, label: '0-10%' },
    { score: '0.1-0.2', count: 203, label: '10-20%' },
    { score: '0.2-0.3', count: 278, label: '20-30%' },
    { score: '0.3-0.4', count: 354, label: '30-40%' },
    { score: '0.4-0.5', count: 286, label: '40-50%' },
    { score: '0.5-0.6', count: 198, label: '50-60%' },
    { score: '0.6-0.7', count: 154, label: '60-70%' },
    { score: '0.7-0.8', count: 87, label: '70-80%', isHigh: true },
    { score: '0.8-0.9', count: 43, label: '80-90%', isHigh: true },
    { score: '0.9-1.0', count: 21, label: '90-100%', isHigh: true }
  ];

  // Risk trend over time
  const riskTrend = [
    { date: '2023-01', avgScore: 0.32, highRiskCount: 24 },
    { date: '2023-02', avgScore: 0.35, highRiskCount: 28 },
    { date: '2023-03', avgScore: 0.33, highRiskCount: 26 },
    { date: '2023-04', avgScore: 0.38, highRiskCount: 31 },
    { date: '2023-05', avgScore: 0.42, highRiskCount: 37 },
    { date: '2023-06', avgScore: 0.39, highRiskCount: 33 },
    { date: '2023-07', avgScore: 0.41, highRiskCount: 35 },
    { date: '2023-08', avgScore: 0.44, highRiskCount: 41 },
    { date: '2023-09', avgScore: 0.47, highRiskCount: 45 },
    { date: '2023-10', avgScore: 0.43, highRiskCount: 38 },
    { date: '2023-11', avgScore: 0.41, highRiskCount: 36 },
    { date: '2023-12', avgScore: 0.45, highRiskCount: 42 }
  ];
  
  // Risk factors
  const riskFactors = [
    { factor: 'Location Mismatch', score: 0.85, color: '#ef4444' },
    { factor: 'Unusual Time', score: 0.72, color: '#f59e0b' },
    { factor: 'Amount Anomaly', score: 0.68, color: '#f59e0b' },
    { factor: 'New Device', score: 0.62, color: '#f59e0b' },
    { factor: 'Multiple Attempts', score: 0.58, color: '#f59e0b' },
    { factor: 'Velocity', score: 0.54, color: '#3b82f6' },
    { factor: 'IP Risk', score: 0.48, color: '#3b82f6' },
    { factor: 'Account Age', score: 0.42, color: '#3b82f6' },
    { factor: 'Browser Fingerprint', score: 0.35, color: '#10b981' },
    { factor: 'Historical Patterns', score: 0.28, color: '#10b981' }
  ];
  
  // Number of transactions above threshold
  const transactionsAboveThreshold = mockTransactions.filter(
    t => (t.fraudScore || 0) > riskThreshold[0]
  ).length;
  
  // Risk scoring models
  const modelOptions = [
    { id: 'standard', name: 'Standard Model', description: 'Our default risk scoring model balanced for most use cases' },
    { id: 'conservative', name: 'Conservative Model', description: 'Higher sensitivity to potential fraud signals' },
    { id: 'aggressive', name: 'Aggressive Model', description: 'Lower false positives, may miss some fraud cases' },
    { id: 'custom', name: 'Custom Model', description: 'Your tailored risk model with custom thresholds' }
  ];
  
  // Custom tooltip component for charts
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background/95 backdrop-blur-sm border border-border/40 p-3 rounded-lg shadow-lg">
          <p className="text-sm font-medium mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={`item-${index}`}
              className="text-xs flex items-center gap-2"
              style={{ color: entry.color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></span>
              <span className="capitalize">{entry.name}: {entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Get color based on whether a risk category is high
  const getBarColor = (entry: any) => {
    return entry.isHigh ? '#ef4444' : '#3b82f6';
  };

  return (
    <DashboardLayout>
      <div className="animate-in slide-up">
        <h1 className="text-3xl font-bold tracking-tight">Risk Scoring</h1>
        <p className="text-muted-foreground mt-1">Configure and monitor transaction risk assessment</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <Card className="glass-card col-span-3 md:col-span-1 animate-in slide-up delay-100">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Risk Threshold
            </CardTitle>
            <CardDescription>
              Set your fraud risk threshold for alerts and blocking
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="threshold">Threshold: {(riskThreshold[0] * 100).toFixed(0)}%</Label>
                <span className="text-sm text-muted-foreground">
                  {transactionsAboveThreshold} transactions above threshold
                </span>
              </div>
              <Slider
                id="threshold"
                defaultValue={[0.7]}
                max={1}
                step={0.01}
                value={riskThreshold}
                onValueChange={setRiskThreshold}
                className="py-4"
              />
              <div className="grid grid-cols-3 text-xs text-muted-foreground">
                <div>Low Risk</div>
                <div className="text-center">Medium</div>
                <div className="text-right">High Risk</div>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Risk Scoring Model</Label>
              <div className="space-y-2">
                {modelOptions.map(model => (
                  <div key={model.id} className="flex items-start space-x-2">
                    <div className="mt-0.5">
                      <input 
                        type="radio" 
                        id={model.id} 
                        name="model" 
                        className="h-4 w-4" 
                        defaultChecked={model.id === 'standard'}
                      />
                    </div>
                    <div>
                      <label htmlFor={model.id} className="font-medium text-sm cursor-pointer">
                        {model.name}
                      </label>
                      <p className="text-xs text-muted-foreground">{model.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <Button className="w-full">Apply Changes</Button>
          </CardContent>
        </Card>
        
        <Card className="glass-card col-span-3 md:col-span-2 animate-in slide-up delay-200">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-primary" />
                Risk Distribution
              </CardTitle>
              <CardDescription>
                Current distribution of risk scores across transactions
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Button 
                variant={chartType === 'bar' ? 'default' : 'outline'} 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setChartType('bar')}
              >
                <BarChart3 className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartType === 'line' ? 'default' : 'outline'} 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setChartType('line')}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
              <Button 
                variant={chartType === 'area' ? 'default' : 'outline'} 
                size="icon" 
                className="h-8 w-8"
                onClick={() => setChartType('area')}
              >
                <LineChartIcon className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={riskDistribution} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.15} />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="count" 
                      name="Transactions" 
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    >
                      {riskDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={getBarColor(entry)} />
                      ))}
                    </Bar>
                    <Legend />
                  </BarChart>
                ) : chartType === 'line' ? (
                  <LineChart data={riskTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.15} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.split('-')[1]}
                    />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip content={<CustomTooltip />} />
                    <Line 
                      yAxisId="left"
                      type="monotone" 
                      dataKey="avgScore" 
                      name="Avg Risk Score" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      animationDuration={1500}
                    />
                    <Line 
                      yAxisId="right"
                      type="monotone" 
                      dataKey="highRiskCount" 
                      name="High Risk Count" 
                      stroke="#ef4444" 
                      strokeWidth={2}
                      dot={{ r: 3 }}
                      activeDot={{ r: 5 }}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                    <Legend />
                  </LineChart>
                ) : (
                  <AreaChart data={riskTrend} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" opacity={0.15} />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => value.split('-')[1]}
                    />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Area 
                      type="monotone" 
                      dataKey="avgScore" 
                      name="Avg Risk Score" 
                      stroke="#3b82f6" 
                      fill="#3b82f6"
                      fillOpacity={0.2}
                      animationDuration={1500}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="highRiskCount" 
                      name="High Risk Count" 
                      stroke="#ef4444" 
                      fill="#ef4444"
                      fillOpacity={0.2}
                      animationDuration={1500}
                      animationBegin={300}
                    />
                    <Legend />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <Card className="glass-card animate-in slide-up delay-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-primary" />
              Key Risk Factors
            </CardTitle>
            <CardDescription>
              Most significant factors contributing to fraud risk
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {riskFactors.map((factor, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">{factor.factor}</span>
                    <span className="text-sm font-bold" style={{ color: factor.color }}>
                      {(factor.score * 100).toFixed(0)}%
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{ width: `${factor.score * 100}%`, backgroundColor: factor.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-card animate-in slide-up delay-400">
          <CardHeader>
            <CardTitle>Risk Scoring Rules</CardTitle>
            <CardDescription>
              Configure how different factors affect risk scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="active">
              <TabsList className="grid w-full grid-cols-2 mb-4">
                <TabsTrigger value="active">Active Rules</TabsTrigger>
                <TabsTrigger value="templates">Templates</TabsTrigger>
              </TabsList>
              <TabsContent value="active" className="space-y-4">
                <div className="space-y-4">
                  {riskFactors.slice(0, 5).map((factor, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-border/40 pb-2">
                      <div>
                        <p className="text-sm font-medium">{factor.factor}</p>
                        <p className="text-xs text-muted-foreground">Weight: {factor.score.toFixed(2)}</p>
                      </div>
                      <Button variant="outline" size="sm">Edit</Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full">Add New Rule</Button>
                </div>
              </TabsContent>
              <TabsContent value="templates" className="space-y-4">
                <div className="space-y-4">
                  <div className="border border-border/40 rounded-lg p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                    <p className="text-sm font-medium">E-commerce Template</p>
                    <p className="text-xs text-muted-foreground">Optimized for online retail transactions</p>
                  </div>
                  <div className="border border-border/40 rounded-lg p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                    <p className="text-sm font-medium">Banking Template</p>
                    <p className="text-xs text-muted-foreground">For financial institutions and banking apps</p>
                  </div>
                  <div className="border border-border/40 rounded-lg p-3 hover:bg-muted/30 transition-colors cursor-pointer">
                    <p className="text-sm font-medium">Subscription Services</p>
                    <p className="text-xs text-muted-foreground">For recurring payment business models</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default RiskScoring;
