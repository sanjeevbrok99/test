
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency numbers
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(value);
}

// Format percentage values
export function formatPercent(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

// Format date for charts
export function formatChartDate(date: string | Date): string {
  const d = new Date(date);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}

// Generate smooth line data using cubic spline interpolation
export function smoothLineData(data: any[], key: string, factor = 0.2): any[] {
  if (data.length <= 2) return data;
  
  const result = [...data];
  const n = data.length;
  
  for (let i = 0; i < n - 1; i++) {
    const current = data[i][key];
    const next = data[i + 1][key];
    const diff = next - current;
    
    // Create control points for smooth curve
    result[i].controlPoint = current + diff * factor;
    result[i + 1].controlPoint2 = next - diff * factor;
  }
  
  return result;
}

// Get status color class based on value
export function getStatusColorClass(value: number, thresholds = { low: 0.3, medium: 0.7 }): string {
  if (value < thresholds.low) return 'text-green-500';
  if (value < thresholds.medium) return 'text-yellow-500';
  return 'text-rose-500';
}

// Generate random ID for elements
export function generateId(prefix = 'id'): string {
  return `${prefix}_${Math.random().toString(36).substring(2, 9)}`;
}
