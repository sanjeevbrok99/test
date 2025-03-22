
import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import { TransactionStatus } from '@/data/mockData';

interface StatusBadgeProps {
  status: TransactionStatus;
  showIcon?: boolean;
  showText?: boolean;
  className?: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  showIcon = true,
  showText = true,
  className
}) => {
  const statusConfig = {
    safe: {
      icon: CheckCircle,
      text: 'Safe',
      className: 'bg-status-safe text-status-safe-foreground'
    },
    medium: {
      icon: AlertTriangle,
      text: 'Medium Risk',
      className: 'bg-status-medium text-status-medium-foreground'
    },
    high: {
      icon: AlertCircle,
      text: 'High Risk',
      className: 'bg-status-high text-status-high-foreground'
    }
  };

  const config = statusConfig[status];

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-sm font-medium transition-colors',
        config.className,
        className
      )}
    >
      {showIcon && <config.icon className="mr-1.5 h-3.5 w-3.5" />}
      {showText && config.text}
    </div>
  );
};

export default StatusBadge;
