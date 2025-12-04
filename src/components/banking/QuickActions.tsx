import { Plus, Minus, UserPlus, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuickActionsProps {
  onDeposit: () => void;
  onWithdraw: () => void;
  onCreateAccount: () => void;
  onViewAccounts: () => void;
}

export function QuickActions({ onDeposit, onWithdraw, onCreateAccount, onViewAccounts }: QuickActionsProps) {
  const actions = [
    { icon: Plus, label: 'Deposit', onClick: onDeposit, variant: 'primary' as const },
    { icon: Minus, label: 'Withdraw', onClick: onWithdraw, variant: 'secondary' as const },
    { icon: UserPlus, label: 'New Account', onClick: onCreateAccount, variant: 'secondary' as const },
    { icon: Users, label: 'All Accounts', onClick: onViewAccounts, variant: 'secondary' as const },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {actions.map((action) => (
        <Button
          key={action.label}
          onClick={action.onClick}
          variant={action.variant === 'primary' ? 'default' : 'secondary'}
          className={`h-auto py-4 flex-col gap-2 ${
            action.variant === 'primary' 
              ? 'gradient-primary shadow-glow hover:shadow-[0_0_50px_hsl(173_80%_40%_/_0.3)]' 
              : 'glass-card hover:bg-secondary/50'
          } transition-all duration-300`}
        >
          <action.icon className="w-5 h-5" />
          <span className="text-sm font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}
