
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { CreditCard, Landmark, Smartphone, Bitcoin, LineChart } from "lucide-react";
import { Button } from "@/components/ui/button";

// Payment method fraud data
const paymentMethodData = {
  creditCard: [
    { name: "Visa", total: 1245, fraudulent: 78 },
    { name: "Mastercard", total: 987, fraudulent: 62 },
    { name: "Amex", total: 567, fraudulent: 41 },
    { name: "Discover", total: 321, fraudulent: 18 },
  ],
  bankTransfer: [
    { name: "ACH", total: 876, fraudulent: 32 },
    { name: "Wire", total: 432, fraudulent: 15 },
    { name: "SWIFT", total: 321, fraudulent: 11 },
    { name: "SEPA", total: 198, fraudulent: 7 },
  ],
  digitalWallet: [
    { name: "PayPal", total: 1432, fraudulent: 43 },
    { name: "ApplePay", total: 967, fraudulent: 25 },
    { name: "GooglePay", total: 743, fraudulent: 19 },
    { name: "Venmo", total: 532, fraudulent: 12 },
  ],
  cryptocurrency: [
    { name: "Bitcoin", total: 342, fraudulent: 21 },
    { name: "Ethereum", total: 198, fraudulent: 13 },
    { name: "USDC", total: 121, fraudulent: 6 },
    { name: "XRP", total: 87, fraudulent: 5 },
  ]
};

type PaymentMethodType = "creditCard" | "bankTransfer" | "digitalWallet" | "cryptocurrency";

export function PaymentMethodAnalysis() {
  const [activeMethod, setActiveMethod] = useState<PaymentMethodType>("creditCard");
  const [showPercentage, setShowPercentage] = useState(false);

  const getIcon = (method: PaymentMethodType) => {
    switch (method) {
      case "creditCard": return <CreditCard className="h-4 w-4" />;
      case "bankTransfer": return <Landmark className="h-4 w-4" />;
      case "digitalWallet": return <Smartphone className="h-4 w-4" />;
      case "cryptocurrency": return <Bitcoin className="h-4 w-4" />;
    }
  };

  const getTitle = (method: PaymentMethodType) => {
    switch (method) {
      case "creditCard": return "Credit Cards";
      case "bankTransfer": return "Bank Transfers";
      case "digitalWallet": return "Digital Wallets";
      case "cryptocurrency": return "Cryptocurrency";
    }
  };

  // Process data based on whether to show percentages
  const processData = (data: any[]) => {
    if (!showPercentage) return data;
    
    return data.map(item => ({
      ...item,
      fraudRate: Number(((item.fraudulent / item.total) * 100).toFixed(1))
    }));
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader className="pb-2 flex flex-row items-center justify-between">
        <div>
          <CardTitle>Payment Method Analysis</CardTitle>
          <CardDescription>Fraud rates across different payment channels</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={() => setShowPercentage(!showPercentage)}
          className="flex items-center gap-2"
        >
          <LineChart className="h-4 w-4" />
          {showPercentage ? "Show Counts" : "Show Percentages"}
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={activeMethod} onValueChange={(v) => setActiveMethod(v as PaymentMethodType)}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="creditCard" className="flex items-center space-x-1">
              <CreditCard className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Cards</span>
            </TabsTrigger>
            <TabsTrigger value="bankTransfer" className="flex items-center space-x-1">
              <Landmark className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Bank</span>
            </TabsTrigger>
            <TabsTrigger value="digitalWallet" className="flex items-center space-x-1">
              <Smartphone className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Wallets</span>
            </TabsTrigger>
            <TabsTrigger value="cryptocurrency" className="flex items-center space-x-1">
              <Bitcoin className="h-3.5 w-3.5 mr-1" />
              <span className="hidden sm:inline">Crypto</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value={activeMethod}>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={processData(paymentMethodData[activeMethod])}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  barGap={4}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis dataKey="name" />
                  <YAxis />
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
                  {showPercentage ? (
                    <Bar 
                      dataKey="fraudRate" 
                      name="Fraud Rate %" 
                      fill="#f43f5e" 
                      radius={[4, 4, 0, 0]}
                    />
                  ) : (
                    <>
                      <Bar 
                        dataKey="total" 
                        name="Total Transactions" 
                        fill="#3b82f6" 
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar 
                        dataKey="fraudulent" 
                        name="Fraudulent" 
                        fill="#f43f5e" 
                        radius={[4, 4, 0, 0]}
                      />
                    </>
                  )}
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
