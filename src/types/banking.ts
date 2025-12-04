export interface Account {
  id: string;
  accountNumber: string;
  holderName: string;
  email: string;
  balance: number;
  accountType: 'savings' | 'checking';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  accountId: string;
  type: 'deposit' | 'withdrawal' | 'transfer';
  amount: number;
  description: string;
  timestamp: Date;
  balanceAfter: number;
}

export type TransactionType = 'deposit' | 'withdrawal';
