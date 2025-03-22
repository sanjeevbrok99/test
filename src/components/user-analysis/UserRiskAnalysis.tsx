
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CircleAlert, ShieldAlert } from 'lucide-react';

interface UserRiskAnalysisProps {
  riskFactors: any[];
  getSeverityBadge: (severity: string) => React.ReactNode;
}

const UserRiskAnalysis = ({ riskFactors, getSeverityBadge }: UserRiskAnalysisProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Risk Factors</h3>
        <div className="space-y-3">
          {riskFactors.map((factor, idx) => (
            <div key={idx} className="bg-muted/30 p-3 rounded-lg border-l-4 border-l-primary">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CircleAlert className={`h-4 w-4 ${
                    factor.severity === 'high' ? 'text-rose-500' : 
                    factor.severity === 'medium' ? 'text-yellow-500' : 'text-blue-500'
                  }`} />
                  <p className="font-medium">{factor.factor}</p>
                </div>
                {getSeverityBadge(factor.severity)}
              </div>
              <p className="text-sm text-muted-foreground mt-1">{factor.details}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-muted/30 p-4 rounded-lg">
        <h3 className="text-sm font-medium mb-3">Recommendations</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-primary mt-0.5" />
            <span>Implement additional verification for large transactions</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-primary mt-0.5" />
            <span>Enable location-based authentication for this user</span>
          </li>
          <li className="flex items-start gap-2">
            <ShieldAlert className="h-4 w-4 text-primary mt-0.5" />
            <span>Review recent device changes and notify user of suspicious activity</span>
          </li>
        </ul>
      </div>
      
      <div className="flex space-x-2">
        <Button className="flex-1" variant="destructive">
          Flag Account
        </Button>
        <Button className="flex-1">
          Contact User
        </Button>
      </div>
    </div>
  );
};

export default UserRiskAnalysis;
