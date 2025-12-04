import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserPlus, AlertCircle } from 'lucide-react';

interface CreateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    holderName: string;
    email: string;
    accountType: 'savings' | 'checking';
    initialDeposit: number;
  }) => void;
}

export function CreateAccountModal({ isOpen, onClose, onSubmit }: CreateAccountModalProps) {
  const [holderName, setHolderName] = useState('');
  const [email, setEmail] = useState('');
  const [accountType, setAccountType] = useState<'savings' | 'checking'>('savings');
  const [initialDeposit, setInitialDeposit] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!holderName.trim()) {
      setError('Please enter account holder name');
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }

    const deposit = parseFloat(initialDeposit) || 0;
    if (deposit < 0) {
      setError('Initial deposit cannot be negative');
      return;
    }

    onSubmit({
      holderName: holderName.trim(),
      email: email.trim(),
      accountType,
      initialDeposit: deposit,
    });

    handleClose();
  };

  const handleClose = () => {
    setHolderName('');
    setEmail('');
    setAccountType('savings');
    setInitialDeposit('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="bg-card border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 font-display text-xl">
            <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center">
              <UserPlus className="w-5 h-5 text-primary-foreground" />
            </div>
            Create New Account
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="holderName">Account Holder Name</Label>
            <Input
              id="holderName"
              placeholder="John Doe"
              value={holderName}
              onChange={(e) => setHolderName(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-secondary border-border"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="accountType">Account Type</Label>
            <Select value={accountType} onValueChange={(v: 'savings' | 'checking') => setAccountType(v)}>
              <SelectTrigger className="bg-secondary border-border">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-card border-border">
                <SelectItem value="savings">Savings Account</SelectItem>
                <SelectItem value="checking">Checking Account</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialDeposit">Initial Deposit (optional)</Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input
                id="initialDeposit"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={initialDeposit}
                onChange={(e) => setInitialDeposit(e.target.value)}
                className="pl-8 bg-secondary border-border"
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-destructive text-sm">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" className="gradient-primary">
              Create Account
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
