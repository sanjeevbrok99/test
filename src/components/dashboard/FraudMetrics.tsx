
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell 
} from "recharts";
import { 
  getFraudByChannel, 
  getFraudByPaymentMode, 
  getFraudByGateway, 
  getConfusionMatrix,
  transactions 
} from "@/lib/mockData";

type MetricType = "channel" | "payment" | "gateway";

export function FraudMetrics() {
  const [activeTab, setActiveTab] = useState<MetricType>("channel");
  
  const metrics = {
    channel: getFraudByChannel(transactions),
    payment: getFraudByPaymentMode(transactions),
    gateway: getFraudByGateway(transactions)
  };

  const formatData = (data: any, type: MetricType) => {
    return data.map((item: any) => ({
      name: type === "channel" 
        ? item.channel.charAt(0).toUpperCase() + item.channel.slice(1) 
        : type === "payment" 
          ? item.mode.toUpperCase() 
          : `Bank ${item.gateway.split('_')[1].toUpperCase()}`,
      Predicted: item.fraudPredicted,
      Reported: item.fraudReported,
      Total: item.total
    }));
  };

  const displayData = formatData(metrics[activeTab], activeTab);
  const matrix = getConfusionMatrix(transactions);
  
  // Format matrix data for pie chart
  const pieData = [
    { name: "True Positive", value: matrix.truePositives },
    { name: "False Positive", value: matrix.falsePositives },
    { name: "True Negative", value: matrix.trueNegatives },
    { name: "False Negative", value: matrix.falseNegatives }
  ];

  const COLORS = ["#10b981", "#f59e0b", "#3b82f6", "#ef4444"];

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 animate-in slide-up">
      <Card className="glass-card overflow-hidden col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Fraud Distribution</CardTitle>
          <CardDescription>Analysis by channel, payment mode, and gateway</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as MetricType)}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="channel">By Channel</TabsTrigger>
              <TabsTrigger value="payment">By Payment Mode</TabsTrigger>
              <TabsTrigger value="gateway">By Gateway</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-0">
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={displayData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis tick={{ fontSize: 12 }} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "rgba(15, 23, 42, 0.8)",
                        backdropFilter: "blur(8px)",
                        borderRadius: "8px",
                        border: "1px solid rgba(255, 255, 255, 0.1)",
                        color: "white",
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="Total"
                      fill="#3b82f6"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar
                      dataKey="Predicted"
                      fill="#8b5cf6"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                    <Bar
                      dataKey="Reported"
                      fill="#f43f5e"
                      radius={[4, 4, 0, 0]}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle>Detection Metrics</CardTitle>
          <CardDescription>Precision: {(matrix.precision * 100).toFixed(1)}% | Recall: {(matrix.recall * 100).toFixed(1)}%</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={3}
                  dataKey="value"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  animationDuration={1500}
                  animationBegin={200}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [value, name]}
                  contentStyle={{
                    backgroundColor: "rgba(15, 23, 42, 0.8)",
                    backdropFilter: "blur(8px)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    color: "white",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="glass-card overflow-hidden">
        <CardHeader>
          <CardTitle>Confusion Matrix</CardTitle>
          <CardDescription>Model performance evaluation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 p-4">
            <div className="bg-green-500/10 rounded-lg p-4 text-center border border-green-500/20">
              <p className="text-muted-foreground text-sm">True Positives</p>
              <p className="text-3xl font-bold text-green-500 mt-2">{matrix.truePositives}</p>
            </div>
            <div className="bg-yellow-500/10 rounded-lg p-4 text-center border border-yellow-500/20">
              <p className="text-muted-foreground text-sm">False Positives</p>
              <p className="text-3xl font-bold text-yellow-500 mt-2">{matrix.falsePositives}</p>
            </div>
            <div className="bg-blue-500/10 rounded-lg p-4 text-center border border-blue-500/20">
              <p className="text-muted-foreground text-sm">True Negatives</p>
              <p className="text-3xl font-bold text-blue-500 mt-2">{matrix.trueNegatives}</p>
            </div>
            <div className="bg-rose-500/10 rounded-lg p-4 text-center border border-rose-500/20">
              <p className="text-muted-foreground text-sm">False Negatives</p>
              <p className="text-3xl font-bold text-rose-500 mt-2">{matrix.falseNegatives}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Precision</p>
                <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${matrix.precision * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-sm font-medium">{(matrix.precision * 100).toFixed(1)}%</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Recall</p>
                <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${matrix.recall * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-sm font-medium">{(matrix.recall * 100).toFixed(1)}%</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-muted-foreground">F1 Score</p>
                <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary" 
                    style={{ width: `${matrix.f1Score * 100}%` }}
                  />
                </div>
                <p className="mt-1 text-sm font-medium">{(matrix.f1Score * 100).toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
