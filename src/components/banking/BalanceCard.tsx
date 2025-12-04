import { Account } from '@/types/banking';
import { CreditCard, TrendingUp } from 'lucide-react';

interface BalanceCardProps {
  account: Account;
}

export function BalanceCard({ account }: BalanceCardProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden rounded-2xl gradient-primary p-6 shadow-glow animate-slide-up">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-foreground/20 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-foreground/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <CreditCard className="w-6 h-6 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground/80 uppercase tracking-wider">
              {account.accountType} Account
            </span>
          </div>
          <TrendingUp className="w-5 h-5 text-primary-foreground/80" />
        </div>

        <div className="mb-6">
          <p className="text-sm text-primary-foreground/70 mb-1">Available Balance</p>
          <h2 className="text-4xl font-display font-bold text-primary-foreground">
            {formatCurrency(account.balance)}
          </h2>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">Account Number</p>
            <p className="text-sm font-mono text-primary-foreground">{account.accountNumber}</p>
          </div>
          <div className="text-right">
            <p className="text-xs text-primary-foreground/60 uppercase tracking-wider mb-1">Account Holder</p>
            <p className="text-sm text-primary-foreground">{account.holderName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
