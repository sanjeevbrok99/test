
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { generateModelEvaluationData } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface ModelEvaluationProps {
  className?: string;
  timeframe?: '7d' | '30d' | '90d';
  onTimeframeChange?: (timeframe: '7d' | '30d' | '90d') => void;
}

const ModelEvaluation: React.FC<ModelEvaluationProps> = ({
  className,
  timeframe = '7d',
  onTimeframeChange,
}) => {
  const evaluationData = generateModelEvaluationData();
  const { confusionMatrix, metrics } = evaluationData;
  
  const handleTimeframeChange = (value: string) => {
    if (value === '7d' || value === '30d' || value === '90d') {
      onTimeframeChange?.(value);
    }
  };

  const formatPercent = (value: number) => {
    return (value * 100).toFixed(1) + '%';
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle>Model Evaluation</CardTitle>
          <Tabs
            defaultValue="7d"
            value={timeframe}
            onValueChange={handleTimeframeChange}
            className="mt-0"
          >
            <TabsList className="h-8">
              <TabsTrigger value="7d" className="text-xs px-2.5">Last 7 Days</TabsTrigger>
              <TabsTrigger value="30d" className="text-xs px-2.5">Last 30 Days</TabsTrigger>
              <TabsTrigger value="90d" className="text-xs px-2.5">Last 90 Days</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-center">Confusion Matrix</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-status-safe/20 dark:bg-status-safe/10 p-4 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">True Negative</div>
                <div className="font-bold text-xl">{confusionMatrix.trueNegative}</div>
              </div>
              <div className="bg-status-high/20 dark:bg-status-high/10 p-4 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">False Positive</div>
                <div className="font-bold text-xl">{confusionMatrix.falsePositive}</div>
              </div>
              <div className="bg-status-high/20 dark:bg-status-high/10 p-4 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">False Negative</div>
                <div className="font-bold text-xl">{confusionMatrix.falseNegative}</div>
              </div>
              <div className="bg-status-safe/20 dark:bg-status-safe/10 p-4 rounded-lg text-center">
                <div className="text-xs text-muted-foreground">True Positive</div>
                <div className="font-bold text-xl">{confusionMatrix.truePositive}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 text-center text-xs pt-1">
              <div className="text-muted-foreground">Predicted Negative</div>
              <div className="text-muted-foreground">Predicted Positive</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <h3 className="text-sm font-medium">Performance Metrics</h3>
            <div className="space-y-3">
              <MetricCard
                label="Precision"
                value={formatPercent(metrics.precision)}
                description="How many predicted frauds were actual frauds"
                progressValue={metrics.precision * 100}
              />
              <MetricCard
                label="Recall"
                value={formatPercent(metrics.recall)}
                description="What percentage of frauds were caught"
                progressValue={metrics.recall * 100}
              />
              <MetricCard
                label="Accuracy"
                value={formatPercent(metrics.accuracy)}
                description="Overall prediction accuracy"
                progressValue={metrics.accuracy * 100}
              />
              <MetricCard
                label="F1 Score"
                value={formatPercent(metrics.f1Score)}
                description="Harmonic mean of precision and recall"
                progressValue={metrics.f1Score * 100}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface MetricCardProps {
  label: string;
  value: string;
  description: string;
  progressValue: number;
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  description,
  progressValue,
}) => {
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <div className="text-sm font-medium">{label}</div>
          <div className="text-xs text-muted-foreground">{description}</div>
        </div>
        <div className="font-semibold">{value}</div>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full"
          style={{ width: `${progressValue}%` }}
        />
      </div>
    </div>
  );
};

export default ModelEvaluation;
