
import { useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import { Button } from "@/components/ui/button";
import { generateTimeSeriesData } from "@/lib/mockData";

// Custom tooltip for charts
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

type ChartType = "line" | "area" | "bar";
type TimeRange = "24h" | "7d" | "30d" | "90d";

export function FraudTrendsChart() {
  const [chartType, setChartType] = useState<ChartType>("area");
  const [timeRange, setTimeRange] = useState<TimeRange>("7d");
  
  const timeSeriesData = generateTimeSeriesData();
  
  // Adjust the data based on selected time range
  const getFilteredData = () => {
    switch (timeRange) {
      case "24h":
        return timeSeriesData.slice(-1);
      case "7d":
        return timeSeriesData.slice(-7);
      case "30d":
        return timeSeriesData.slice(-30);
      case "90d":
        return timeSeriesData;
      default:
        return timeSeriesData.slice(-7);
    }
  };
  
  const data = getFilteredData();
  
  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 30, left: 20, bottom: 5 }
    };
    
    const commonAxisProps = {
      dataKey: "date",
      tickFormatter: (value: string) => {
        const date = new Date(value);
        return `${date.getDate()}/${date.getMonth() + 1}`;
      }
    };
    
    const commonCartesianProps = {
      strokeDasharray: "3 3",
      opacity: 0.15
    };
    
    switch (chartType) {
      case "line":
        return (
          <LineChart {...commonProps}>
            <CartesianGrid {...commonCartesianProps} />
            <XAxis {...commonAxisProps} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Line 
              type="monotone" 
              dataKey="predicted" 
              name="Predicted" 
              stroke="#8b5cf6" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
              animationDuration={1000}
            />
            <Line 
              type="monotone" 
              dataKey="reported" 
              name="Reported" 
              stroke="#f43f5e" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
              animationDuration={1000}
              animationBegin={300}
            />
            <Line 
              type="monotone" 
              dataKey="resolved" 
              name="Resolved" 
              stroke="#10b981" 
              strokeWidth={2}
              activeDot={{ r: 6 }}
              animationDuration={1000}
              animationBegin={600}
            />
          </LineChart>
        );
      case "area":
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid {...commonCartesianProps} />
            <XAxis {...commonAxisProps} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Area 
              type="monotone" 
              dataKey="predicted" 
              name="Predicted" 
              stroke="#8b5cf6" 
              fill="#8b5cf6" 
              fillOpacity={0.2}
              animationDuration={1000}
            />
            <Area 
              type="monotone" 
              dataKey="reported" 
              name="Reported" 
              stroke="#f43f5e" 
              fill="#f43f5e"
              fillOpacity={0.2}
              animationDuration={1000}
              animationBegin={300}
            />
            <Area 
              type="monotone" 
              dataKey="resolved" 
              name="Resolved" 
              stroke="#10b981" 
              fill="#10b981"
              fillOpacity={0.2}
              animationDuration={1000}
              animationBegin={600}
            />
          </AreaChart>
        );
      case "bar":
        return (
          <BarChart {...commonProps}>
            <CartesianGrid {...commonCartesianProps} />
            <XAxis {...commonAxisProps} />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar dataKey="predicted" name="Predicted" fill="#8b5cf6" animationDuration={1000} />
            <Bar dataKey="reported" name="Reported" fill="#f43f5e" animationDuration={1000} />
            <Bar dataKey="resolved" name="Resolved" fill="#10b981" animationDuration={1000} />
          </BarChart>
        );
      default:
        return null;
    }
  };
  
  return (
    <div className="space-y-3">
      <div className="flex justify-between">
        <div className="flex gap-1 bg-muted/40 p-0.5 rounded-md">
          {["24h", "7d", "30d", "90d"].map((range) => (
            <Button
              key={range}
              size="sm"
              variant={timeRange === range ? "default" : "ghost"}
              className="h-7 px-2 text-xs"
              onClick={() => setTimeRange(range as TimeRange)}
            >
              {range}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-1 bg-muted/40 p-0.5 rounded-md">
          <Button
            size="sm"
            variant={chartType === "line" ? "default" : "ghost"}
            className="h-7 px-2 text-xs"
            onClick={() => setChartType("line")}
          >
            Line
          </Button>
          <Button
            size="sm"
            variant={chartType === "area" ? "default" : "ghost"}
            className="h-7 px-2 text-xs"
            onClick={() => setChartType("area")}
          >
            Area
          </Button>
          <Button
            size="sm"
            variant={chartType === "bar" ? "default" : "ghost"}
            className="h-7 px-2 text-xs"
            onClick={() => setChartType("bar")}
          >
            Bar
          </Button>
        </div>
      </div>
      
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
}
