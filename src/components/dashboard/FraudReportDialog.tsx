
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Transaction, fraudReportReasons } from '@/data/mockData';

interface FraudReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transaction: Transaction | null;
  reportReason: string;
  reportDetails: string;
  onReasonChange: (value: string) => void;
  onDetailsChange: (value: string) => void;
  onSubmit: () => void;
}

const FraudReportDialog: React.FC<FraudReportDialogProps> = ({
  open,
  onOpenChange,
  transaction,
  reportReason,
  reportDetails,
  onReasonChange,
  onDetailsChange,
  onSubmit
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Report Fraud</DialogTitle>
          <DialogDescription>
            Submit a fraud report for transaction {transaction?.id}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="reason">Reason for Report</Label>
            <Select
              value={reportReason}
              onValueChange={onReasonChange}
            >
              <SelectTrigger id="reason">
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                {fraudReportReasons.map((reason) => (
                  <SelectItem key={reason} value={reason}>
                    {reason}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="details">Additional Details</Label>
            <Textarea
              id="details"
              placeholder="Provide any additional information..."
              value={reportDetails}
              onChange={(e) => onDetailsChange(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button type="submit" onClick={onSubmit}>
            Submit Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FraudReportDialog;
