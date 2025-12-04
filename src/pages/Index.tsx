import { useState } from 'react';
import { useBanking } from '@/hooks/useBanking';
import { Header } from '@/components/banking/Header';
import { BalanceCard } from '@/components/banking/BalanceCard';
import { QuickActions } from '@/components/banking/QuickActions';
import { TransactionList } from '@/components/banking/TransactionList';
import { TransactionModal } from '@/components/banking/TransactionModal';
import { CreateAccountModal } from '@/components/banking/CreateAccountModal';
import { AccountsModal } from '@/components/banking/AccountsModal';
import { TransactionType } from '@/types/banking';
import { toast } from 'sonner';

const Index = () => {
  const {
    accounts,
    selectedAccount,
    selectedAccountId,
    setSelectedAccountId,
    accountTransactions,
    createAccount,
    performTransaction,
    deleteAccount,
  } = useBanking();

  const [transactionModal, setTransactionModal] = useState<{ isOpen: boolean; type: TransactionType }>({
    isOpen: false,
    type: 'deposit',
  });
  const [isCreateAccountOpen, setIsCreateAccountOpen] = useState(false);
  const [isAccountsOpen, setIsAccountsOpen] = useState(false);

  const handleTransaction = (amount: number, description: string) => {
    const success = performTransaction(transactionModal.type, amount, description);
    if (success) {
      toast.success(
        transactionModal.type === 'deposit' 
          ? `Successfully deposited $${amount.toFixed(2)}` 
          : `Successfully withdrew $${amount.toFixed(2)}`
      );
    } else {
      toast.error('Transaction failed. Insufficient balance.');
    }
    return success;
  };

  const handleCreateAccount = (data: {
    holderName: string;
    email: string;
    accountType: 'savings' | 'checking';
    initialDeposit: number;
  }) => {
    const newAccount = createAccount(data);
    setSelectedAccountId(newAccount.id);
    toast.success(`Account created successfully! Account number: ${newAccount.accountNumber}`);
  };

  const handleDeleteAccount = (id: string) => {
    deleteAccount(id);
    toast.success('Account deleted successfully');
  };

  if (!selectedAccount) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">No accounts found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Background decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-lg mx-auto px-4 py-6">
        <Header />
        
        <div className="space-y-6">
          <BalanceCard account={selectedAccount} />
          
          <QuickActions
            onDeposit={() => setTransactionModal({ isOpen: true, type: 'deposit' })}
            onWithdraw={() => setTransactionModal({ isOpen: true, type: 'withdrawal' })}
            onCreateAccount={() => setIsCreateAccountOpen(true)}
            onViewAccounts={() => setIsAccountsOpen(true)}
          />

          <div>
            <h3 className="font-display font-semibold text-lg text-foreground mb-4">
              Recent Transactions
            </h3>
            <TransactionList transactions={accountTransactions} />
          </div>
        </div>
      </div>

      <TransactionModal
        isOpen={transactionModal.isOpen}
        onClose={() => setTransactionModal(prev => ({ ...prev, isOpen: false }))}
        type={transactionModal.type}
        currentBalance={selectedAccount.balance}
        onSubmit={handleTransaction}
      />

      <CreateAccountModal
        isOpen={isCreateAccountOpen}
        onClose={() => setIsCreateAccountOpen(false)}
        onSubmit={handleCreateAccount}
      />

      <AccountsModal
        isOpen={isAccountsOpen}
        onClose={() => setIsAccountsOpen(false)}
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        onSelectAccount={setSelectedAccountId}
        onDeleteAccount={handleDeleteAccount}
      />
    </div>
  );
};

export default Index;
