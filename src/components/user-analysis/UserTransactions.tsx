
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

interface UserTransactionsProps {
  recentTransactions: any[];
  getRiskColor: (score: number) => string;
  formatDate: (dateString: string) => string;
}

const UserTransactions = ({ recentTransactions, getRiskColor, formatDate }: UserTransactionsProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Risk Score</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentTransactions.map(tx => (
            <TableRow key={tx.id}>
              <TableCell>{tx.id}</TableCell>
              <TableCell>{formatDate(tx.date)}</TableCell>
              <TableCell>${tx.amount.toFixed(2)}</TableCell>
              <TableCell className="capitalize">{tx.type}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="w-16 bg-muted rounded-full h-1.5">
                    <div
                      className={`h-1.5 rounded-full ${
                        tx.riskScore > 0.6
                          ? 'bg-rose-500'
                          : tx.riskScore > 0.3
                          ? 'bg-yellow-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${tx.riskScore * 100}%` }}
                    />
                  </div>
                  <span className={getRiskColor(tx.riskScore)}>
                    {(tx.riskScore * 100).toFixed(0)}%
                  </span>
                </div>
              </TableCell>
              <TableCell className="capitalize">{tx.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-center mt-4">
        <Button variant="outline">View All Transactions</Button>
      </div>
    </>
  );
};

export default UserTransactions;
