
import React, { useState } from 'react';
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  Flag,
  DollarSign,
  Clock,
  Monitor,
  CreditCard,
  ShieldAlert,
  Percent,
  AlertTriangle,
} from 'lucide-react';
import StatusBadge from '@/components/common/StatusBadge';
import { type Transaction } from '@/data/mockData';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface TransactionTableProps {
  transactions: Transaction[];
  loading: boolean;
  pageCount: number;
  pageIndex: number;
  onPageChange: (page: number) => void;
  onReportFraud?: (transaction: Transaction) => void;
}

const TransactionTable: React.FC<TransactionTableProps> = ({
  transactions,
  loading,
  pageCount,
  pageIndex,
  onPageChange,
  onReportFraud,
}) => {
  const [sorting, setSorting] = useState<SortingState>([]);

  // Define table columns with improved headers
  const columns: ColumnDef<Transaction>[] = [
    {
      accessorKey: 'id',
      header: () => (
        <div className="flex items-center gap-1 font-medium">
          Transaction ID
        </div>
      ),
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('id')}</div>
      ),
    },
    {
      accessorKey: 'amount',
      header: ({ column }) => (
        <div className="flex items-center justify-end gap-1 cursor-pointer" onClick={() => column.toggleSorting()}>
          <DollarSign className="h-3.5 w-3.5" />
          <span>Amount</span>
          <ArrowUpDown className="h-3 w-3" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-right">
          ${(row.getValue('amount') as number).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      accessorKey: 'timestamp',
      header: ({ column }) => (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => column.toggleSorting()}>
          <Clock className="h-3.5 w-3.5" />
          <span>Time</span>
          <ArrowUpDown className="h-3 w-3" />
        </div>
      ),
      cell: ({ row }) => (
        <div className="whitespace-nowrap">
          {format(new Date(row.getValue('timestamp') as string), 'MMM d, yyyy h:mm a')}
        </div>
      ),
    },
    {
      accessorKey: 'channel',
      header: () => (
        <div className="flex items-center gap-1 font-medium">
          <Monitor className="h-3.5 w-3.5" />
          <span>Channel</span>
        </div>
      ),
    },
    {
      accessorKey: 'paymentMode',
      header: () => (
        <div className="flex items-center gap-1 font-medium">
          <CreditCard className="h-3.5 w-3.5" />
          <span>Payment Mode</span>
        </div>
      ),
    },
    {
      accessorKey: 'fraudStatus',
      header: ({ column }) => (
        <div className="flex items-center gap-1 cursor-pointer" onClick={() => column.toggleSorting()}>
          <ShieldAlert className="h-3.5 w-3.5" />
          <span>Status</span>
          <ArrowUpDown className="h-3 w-3" />
        </div>
      ),
      cell: ({ row }) => (
        <StatusBadge status={row.getValue('fraudStatus') as 'safe' | 'medium' | 'high'} />
      ),
    },
    {
      accessorKey: 'fraudScore',
      header: ({ column }) => (
        <div className="flex items-center justify-end gap-1 cursor-pointer" onClick={() => column.toggleSorting()}>
          <Percent className="h-3.5 w-3.5" />
          <span>Score</span>
          <ArrowUpDown className="h-3 w-3" />
        </div>
      ),
      cell: ({ row }) => {
        const score = row.getValue('fraudScore') as number;
        let color = 'bg-green-500';
        if (score > 70) color = 'bg-red-500';
        else if (score > 30) color = 'bg-yellow-500';
        
        return (
          <div className="flex items-center justify-end">
            <div className="w-10 h-2 bg-gray-200 rounded-full mr-2">
              <div
                className={`h-full rounded-full ${color}`}
                style={{ width: `${score}%` }}
              />
            </div>
            <span className="tabular-nums">{score.toFixed(0)}</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'reportedFraud',
      header: () => (
        <div className="flex items-center gap-1 justify-center font-medium">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span>Reported</span>
        </div>
      ),
      cell: ({ row }) => (
        <div className="text-center">
          {row.getValue('reportedFraud') as boolean ? (
            <span className="text-status-high font-medium text-sm">Yes</span>
          ) : (
            <span className="text-muted-foreground text-sm">No</span>
          )}
        </div>
      ),
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const transaction = row.original;
        
        // Don't show report button if already reported
        if (transaction.reportedFraud) {
          return null;
        }
        
        return (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onReportFraud?.(transaction)}
                  className="h-7 w-7"
                >
                  <Flag className="h-3.5 w-3.5 text-muted-foreground hover:text-status-high" />
                  <span className="sr-only">Report Fraud</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs">Report as Fraud</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        );
      },
    },
  ];

  const table = useReactTable({
    data: transactions,
    columns,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
    pageCount,
  });

  // Create skeleton rows for loading state
  const SkeletonRow = () => (
    <TableRow>
      {columns.map((_, index) => (
        <TableCell key={index}>
          <Skeleton className="h-4 w-full" />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div className="space-y-4 rounded-md border animate-fade-in">
      <div className="overflow-auto">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHeader key={header.id} className="px-4 py-3.5 bg-muted/40">
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHeader>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              // Show skeleton rows when loading
              Array.from({ length: 10 }).map((_, index) => (
                <SkeletonRow key={index} />
              ))
            ) : table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={cn(
                    "transition-colors hover:bg-muted/30",
                    row.original.fraudStatus === 'high' && "bg-status-high/5 hover:bg-status-high/10",
                    row.original.fraudStatus === 'medium' && "bg-status-medium/5 hover:bg-status-medium/10",
                  )}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      <div className="flex items-center justify-between px-4 py-2">
        <div className="text-sm text-muted-foreground">
          Showing{' '}
          <strong>{pageIndex * 10 + 1}</strong> to{' '}
          <strong>{Math.min((pageIndex + 1) * 10, (pageCount || 1) * 10)}</strong> of{' '}
          <strong>{(pageCount || 1) * 10}</strong> transactions
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(0)}
            disabled={pageIndex === 0 || loading}
          >
            <ChevronsLeft className="h-4 w-4" />
            <span className="sr-only">First page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pageIndex - 1)}
            disabled={pageIndex === 0 || loading}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </Button>
          <div className="text-sm font-medium">
            Page{' '}
            <span>
              {pageIndex + 1} of {Math.max(1, pageCount)}
            </span>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pageIndex + 1)}
            disabled={pageIndex === pageCount - 1 || loading}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onPageChange(pageCount - 1)}
            disabled={pageIndex === pageCount - 1 || loading}
          >
            <ChevronsRight className="h-4 w-4" />
            <span className="sr-only">Last page</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
