import { Transaction } from '@/types/banking';
import { ArrowDownLeft, ArrowUpRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ transactions }: TransactionListProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  if (transactions.length === 0) {
    return (
      <div className="glass-card rounded-xl p-8 text-center">
        <Clock className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
        <p className="text-muted-foreground">No transactions yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {transactions.map((transaction, index) => (
        <div
          key={transaction.id}
          className="glass-card rounded-xl p-4 flex items-center justify-between hover:bg-secondary/30 transition-colors animate-fade-in"
          style={{ animationDelay: `${index * 50}ms` }}
        >
          <div className="flex items-center gap-4">
            <div
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center",
                transaction.type === 'deposit'
                  ? "bg-success/20 text-success"
                  : "bg-destructive/20 text-destructive"
              )}
            >
              {transaction.type === 'deposit' ? (
                <ArrowDownLeft className="w-5 h-5" />
              ) : (
                <ArrowUpRight className="w-5 h-5" />
              )}
            </div>
            <div>
              <p className="font-medium text-foreground">{transaction.description}</p>
              <p className="text-sm text-muted-foreground">{formatDate(transaction.timestamp)}</p>
            </div>
          </div>
          <div className="text-right">
            <p
              className={cn(
                "font-semibold",
                transaction.type === 'deposit' ? "text-success" : "text-destructive"
              )}
            >
              {transaction.type === 'deposit' ? '+' : '-'}{formatCurrency(transaction.amount)}
            </p>
            <p className="text-xs text-muted-foreground">
              Balance: {formatCurrency(transaction.balanceAfter)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
