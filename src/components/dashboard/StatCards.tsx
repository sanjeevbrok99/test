
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  Shield, 
  DollarSign, 
  BarChart 
} from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  description,
  icon,
  trend,
  trendValue,
  className,
}) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover-lift", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">{title}</p>
            <h3 className="text-2xl font-bold tracking-tight">{value}</h3>
            {description && <p className="text-xs text-muted-foreground">{description}</p>}
          </div>
          <div className="rounded-full p-2 bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
        
        {trend && trendValue && (
          <div className="mt-4 flex items-center text-xs">
            {trend === 'up' ? (
              <TrendingUp className="h-3 w-3 mr-1 text-status-high" />
            ) : trend === 'down' ? (
              <TrendingDown className="h-3 w-3 mr-1 text-status-safe" />
            ) : (
              <span className="h-3 w-3 mr-1">―</span>
            )}
            <span className={cn(
              trend === 'up' ? 'text-status-high' : 
              trend === 'down' ? 'text-status-safe' : 
              'text-muted-foreground'
            )}>
              {trendValue}
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

interface StatCardsProps {
  data: {
    totalTransactions: number;
    fraudulentTransactions: number;
    suspiciousTransactions: number;
    reportedFrauds: number;
    fraudAmount: number;
    averageFraudScore: number;
  };
  className?: string;
}

const StatCards: React.FC<StatCardsProps> = ({ data, className }) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", className)}>
      <StatCard
        title="Total Transactions"
        value={data.totalTransactions.toLocaleString()}
        icon={<BarChart className="h-4 w-4" />}
        trend="up"
        trendValue="+12.5% from last week"
      />
      <StatCard
        title="Fraudulent Transactions"
        value={data.fraudulentTransactions.toLocaleString()}
        icon={<AlertTriangle className="h-4 w-4" />}
        trend="down"
        trendValue="-2.3% from last week"
        className="border-status-high/20"
      />
      <StatCard
        title="Suspicious Transactions"
        value={data.suspiciousTransactions.toLocaleString()}
        icon={<Shield className="h-4 w-4" />}
        trend="neutral"
        trendValue="No change from last week"
      />
      <StatCard
        title="Reported Frauds"
        value={data.reportedFrauds.toLocaleString()}
        icon={<AlertTriangle className="h-4 w-4" />}
        trend="up"
        trendValue="+5.7% from last week"
      />
      <StatCard
        title="Fraud Amount"
        value={`$${data.fraudAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
        icon={<DollarSign className="h-4 w-4" />}
        trend="up"
        trendValue="+8.2% from last week"
        className="border-status-high/20"
      />
      <StatCard
        title="Average Fraud Score"
        value={data.averageFraudScore.toFixed(2)}
        description="Scale: 0-100, higher is riskier"
        icon={<BarChart className="h-4 w-4" />}
        trend="down"
        trendValue="-1.8% from last week"
      />
    </div>
  );
};

export default StatCards;
