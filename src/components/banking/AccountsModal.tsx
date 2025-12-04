import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Account } from '@/types/banking';
import { Trash2, CreditCard, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AccountsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accounts: Account[];
  selectedAccountId: string;
  onSelectAccount: (id: string) => void;
  onDeleteAccount: (id: string) => void;
}

export function AccountsModal({
  isOpen,
  onClose,
  accounts,
  selectedAccountId,
  onSelectAccount,
  onDeleteAccount,
}: AccountsModalProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  const handleSelect = (id: string) => {
    onSelectAccount(id);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-card border-border sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-xl">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <CreditCard className="w-5 h-5 text-primary-foreground" />
            </div>
            All Accounts
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-3 pt-4 max-h-96 overflow-y-auto">
          {accounts.map((account) => (
            <div
              key={account.id}
              className={cn(
                "glass-card rounded-xl p-4 cursor-pointer transition-all",
                selectedAccountId === account.id
                  ? "ring-2 ring-primary bg-primary/10"
                  : "hover:bg-secondary/50"
              )}
              onClick={() => handleSelect(account.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {selectedAccountId === account.id && (
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground">{account.holderName}</p>
                    <p className="text-sm text-muted-foreground font-mono">{account.accountNumber}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold text-foreground">{formatCurrency(account.balance)}</p>
                    <p className="text-xs text-muted-foreground capitalize">{account.accountType}</p>
                  </div>
                  {accounts.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteAccount(account.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
