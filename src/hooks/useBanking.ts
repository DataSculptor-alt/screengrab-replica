import { useState, useCallback } from 'react';
import { Account, Transaction, TransactionType } from '@/types/banking';

const generateAccountNumber = () => {
  return 'ACC' + Math.random().toString(36).substr(2, 9).toUpperCase();
};

const generateId = () => Math.random().toString(36).substr(2, 9);

const initialAccounts: Account[] = [
  {
    id: '1',
    accountNumber: 'ACC7X8K2M9NP',
    holderName: 'Bakhromov Sardor',
    email: 'sardor@example.com',
    balance: 15420.50,
    accountType: 'savings',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    accountNumber: 'ACC3L5Q8R1TW',
    holderName: 'John Smith',
    email: 'john@example.com',
    balance: 8750.25,
    accountType: 'checking',
    createdAt: new Date('2024-02-20'),
  },
];

const initialTransactions: Transaction[] = [
  {
    id: '1',
    accountId: '1',
    type: 'deposit',
    amount: 5000,
    description: 'Salary deposit',
    timestamp: new Date('2024-11-28'),
    balanceAfter: 15420.50,
  },
  {
    id: '2',
    accountId: '1',
    type: 'withdrawal',
    amount: 200,
    description: 'ATM withdrawal',
    timestamp: new Date('2024-11-25'),
    balanceAfter: 10420.50,
  },
  {
    id: '3',
    accountId: '1',
    type: 'deposit',
    amount: 1500,
    description: 'Freelance payment',
    timestamp: new Date('2024-11-20'),
    balanceAfter: 10620.50,
  },
];

export function useBanking() {
  const [accounts, setAccounts] = useState<Account[]>(initialAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [selectedAccountId, setSelectedAccountId] = useState<string>(initialAccounts[0].id);

  const selectedAccount = accounts.find(a => a.id === selectedAccountId) || accounts[0];

  const accountTransactions = transactions
    .filter(t => t.accountId === selectedAccountId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  const createAccount = useCallback((data: {
    holderName: string;
    email: string;
    accountType: 'savings' | 'checking';
    initialDeposit: number;
  }) => {
    const newAccount: Account = {
      id: generateId(),
      accountNumber: generateAccountNumber(),
      holderName: data.holderName,
      email: data.email,
      balance: data.initialDeposit,
      accountType: data.accountType,
      createdAt: new Date(),
    };

    setAccounts(prev => [...prev, newAccount]);

    if (data.initialDeposit > 0) {
      const newTransaction: Transaction = {
        id: generateId(),
        accountId: newAccount.id,
        type: 'deposit',
        amount: data.initialDeposit,
        description: 'Initial deposit',
        timestamp: new Date(),
        balanceAfter: data.initialDeposit,
      };
      setTransactions(prev => [...prev, newTransaction]);
    }

    return newAccount;
  }, []);

  const performTransaction = useCallback((
    type: TransactionType,
    amount: number,
    description: string
  ) => {
    if (!selectedAccount) return false;

    if (type === 'withdrawal' && amount > selectedAccount.balance) {
      return false;
    }

    const newBalance = type === 'deposit' 
      ? selectedAccount.balance + amount 
      : selectedAccount.balance - amount;

    setAccounts(prev => prev.map(acc => 
      acc.id === selectedAccountId 
        ? { ...acc, balance: newBalance }
        : acc
    ));

    const newTransaction: Transaction = {
      id: generateId(),
      accountId: selectedAccountId,
      type,
      amount,
      description,
      timestamp: new Date(),
      balanceAfter: newBalance,
    };

    setTransactions(prev => [...prev, newTransaction]);
    return true;
  }, [selectedAccount, selectedAccountId]);

  const deleteAccount = useCallback((accountId: string) => {
    setAccounts(prev => prev.filter(a => a.id !== accountId));
    setTransactions(prev => prev.filter(t => t.accountId !== accountId));
    if (selectedAccountId === accountId && accounts.length > 1) {
      setSelectedAccountId(accounts.find(a => a.id !== accountId)?.id || '');
    }
  }, [accounts, selectedAccountId]);

  return {
    accounts,
    selectedAccount,
    selectedAccountId,
    setSelectedAccountId,
    accountTransactions,
    createAccount,
    performTransaction,
    deleteAccount,
  };
}
