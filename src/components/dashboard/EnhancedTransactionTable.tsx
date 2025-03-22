
import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  DropdownMenu, 
  DropdownMenuCheckboxItem, 
  DropdownMenuContent, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  CheckCircle2, 
  AlertTriangle, 
  AlertCircle, 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  Search,
  SlidersHorizontal
} from "lucide-react";
import { transactions, Transaction } from "@/lib/mockData";
import { cn } from "@/lib/utils";

export function EnhancedTransactionTable() {
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState<{ start: string; end: string }>({
    start: "",
    end: "",
  });
  const pageSize = 10;

  // Filter transactions based on search and date filters
  const filteredTransactions = transactions.filter((transaction) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        transaction.transaction_id.toLowerCase().includes(query) ||
        transaction.payer_email.toLowerCase().includes(query) ||
        transaction.payee_id.toLowerCase().includes(query)
      );
    }
    
    // Date filter
    if (dateFilter.start && dateFilter.end) {
      const transactionDate = new Date(transaction.transaction_date);
      const startDate = new Date(dateFilter.start);
      const endDate = new Date(dateFilter.end);
      endDate.setHours(23, 59, 59, 999); // End of the day
      
      return transactionDate >= startDate && transactionDate <= endDate;
    }
    
    return true;
  });

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / pageSize);
  const paginatedTransactions = filteredTransactions.slice(
    (page - 1) * pageSize,
    page * pageSize
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getStatusBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
            <CheckCircle2 className="mr-1 h-3 w-3" /> Completed
          </Badge>
        );
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
            <Clock className="mr-1 h-3 w-3" /> Pending
          </Badge>
        );
      case "failed":
        return (
          <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
            <AlertCircle className="mr-1 h-3 w-3" /> Failed
          </Badge>
        );
    }
  };

  const getFraudBadge = (transaction: Transaction) => {
    if (transaction.is_fraud_reported) {
      return (
        <Badge variant="outline" className="bg-rose-500/10 text-rose-500 border-rose-500/20">
          <AlertCircle className="mr-1 h-3 w-3" /> Reported
        </Badge>
      );
    }

    if (transaction.is_fraud_predicted) {
      return (
        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">
          <AlertTriangle className="mr-1 h-3 w-3" /> Predicted
        </Badge>
      );
    }

    return (
      <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
        <CheckCircle2 className="mr-1 h-3 w-3" /> Safe
      </Badge>
    );
  };

  const getFraudScore = (score?: number) => {
    if (!score) return null;

    let colorClass = "text-green-500";
    if (score > 0.7) {
      colorClass = "text-rose-500";
    } else if (score > 0.4) {
      colorClass = "text-yellow-500";
    }

    return (
      <div className="flex items-center">
        <div className="w-full bg-muted rounded-full h-1.5 mr-2">
          <div
            className={`h-1.5 rounded-full ${
              score > 0.7
                ? "bg-rose-500"
                : score > 0.4
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
            style={{ width: `${score * 100}%` }}
          />
        </div>
        <span className={colorClass}>{(score * 100).toFixed(0)}%</span>
      </div>
    );
  };

  return (
    <Card className="glass-card overflow-hidden">
      <CardHeader>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <CardTitle>Transactions</CardTitle>
            <CardDescription>
              Monitor and analyze recent transaction activity
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search transactions..."
                className="pl-8 w-[200px] sm:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Filter by Date</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="p-2 space-y-2">
                  <div className="space-y-1">
                    <p className="text-xs font-medium">Start Date</p>
                    <Input
                      type="date"
                      value={dateFilter.start}
                      onChange={(e) =>
                        setDateFilter({ ...dateFilter, start: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs font-medium">End Date</p>
                    <Input
                      type="date"
                      value={dateFilter.end}
                      onChange={(e) =>
                        setDateFilter({ ...dateFilter, end: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-end space-x-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        setDateFilter({ start: "", end: "" })
                      }
                    >
                      Reset
                    </Button>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto animate-in slide-up">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Transaction ID</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead className="hidden md:table-cell">Channel</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Fraud Status</TableHead>
              <TableHead className="hidden lg:table-cell">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedTransactions.length > 0 ? (
              paginatedTransactions.map((transaction) => (
                <TableRow 
                  key={transaction.transaction_id}
                  className={
                    cn(
                      "transition-colors hover:bg-muted/40",
                      transaction.is_fraud_reported ? "bg-rose-500/5" : 
                      transaction.is_fraud_predicted ? "bg-yellow-500/5" : ""
                    )
                  }
                >
                  <TableCell className="font-medium">{transaction.transaction_id}</TableCell>
                  <TableCell>{formatDate(transaction.transaction_date)}</TableCell>
                  <TableCell>${transaction.transaction_amount.toLocaleString()}</TableCell>
                  <TableCell className="hidden md:table-cell capitalize">{transaction.transaction_channel}</TableCell>
                  <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                  <TableCell>{getFraudBadge(transaction)}</TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {getFraudScore(transaction.fraud_score)}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="text-center h-24">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
      {filteredTransactions.length > pageSize && (
        <CardFooter className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium">
              {(page - 1) * pageSize + 1}-
              {Math.min(page * pageSize, filteredTransactions.length)}
            </span>{" "}
            of{" "}
            <span className="font-medium">{filteredTransactions.length}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(Math.max(1, page - 1))}
              disabled={page === 1}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setPage(Math.min(totalPages, page + 1))}
              disabled={page === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
