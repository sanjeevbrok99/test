
import { formatChartDate } from "@/lib/utils";

// Get color based on fraud risk level
export function getFraudRiskColor(value: number): string {
  if (value < 0.3) return '#10b981'; // green
  if (value < 0.7) return '#f59e0b'; // yellow/amber
  return '#ef4444'; // red
}

// Format tooltip value based on data type
export function formatTooltipValue(value: any, name: string): [string | number, string] {
  // Format currency values
  if (name.toLowerCase().includes('amount') || name.toLowerCase().includes('value')) {
    return [`$${value}`, name];
  }
  
  // Format percentage values
  if (name.toLowerCase().includes('rate') || name.toLowerCase().includes('percent')) {
    return [`${value}%`, name];
  }
  
  // Default formatting
  return [value, name];
}

// Get chart height based on screen size
export function getResponsiveChartHeight(defaultHeight: number = 300): number {
  if (typeof window === 'undefined') return defaultHeight;
  
  const width = window.innerWidth;
  if (width < 640) return Math.max(200, defaultHeight - 100); // Small screens
  if (width < 1024) return Math.max(250, defaultHeight - 50); // Medium screens
  return defaultHeight; // Large screens
}

// Generate gradient colors for charts
export function generateGradientColors(baseColor: string, steps: number = 5): string[] {
  const colors: string[] = [];
  const opacity = 1;
  
  for (let i = 0; i < steps; i++) {
    const stepOpacity = opacity - (i * (opacity / steps));
    colors.push(`${baseColor}${Math.round(stepOpacity * 255).toString(16).padStart(2, '0')}`);
  }
  
  return colors;
}

// Create animation config for chart elements
export function createAnimationConfig(index: number, baseDelay: number = 300): {
  animationDuration: number;
  animationBegin: number;
} {
  return {
    animationDuration: 1000,
    animationBegin: index * baseDelay,
  };
}

// Get common axis configuration
export function getCommonAxisConfig() {
  return {
    axisLine: { stroke: '#64748b20' },
    tickLine: { stroke: '#64748b20' },
  };
}
