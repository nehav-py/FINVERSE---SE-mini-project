import React, { createContext, useContext, useState, ReactNode } from 'react';

interface BankAccount {
  id: string;
  accountNumber: string;
  accountType: 'Savings' | 'Current' | 'Fixed Deposit';
  balance: number;
  bank: string;
  branch: string;
}

interface Transaction {
  id: string;
  accountId: string;
  type: 'Deposit' | 'Withdrawal' | 'Transfer';
  amount: number;
  description: string;
  date: string;
  status: 'Success' | 'Failed' | 'Pending';
  toAccount?: string;
  fromAccount?: string;
}

interface Card {
  id: string;
  type: 'Credit' | 'Debit' | 'ATM' | 'Prepaid' | 'KCC' | 'Business' | 'Visa' | 'Master' | 'RuPay';
  number: string;
  expiryDate: string;
  cvv: string;
  isActive: boolean;
  rewardsActive: boolean;
  bank: string;
}

interface Challenge {
  id: string;
  title: string;
  description: string;
  goalAmount: number;
  currentAmount: number;
  deadline: string;
  reward: number;
  isActive: boolean;
  isCompleted: boolean;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  isClaimed: boolean;
  expiryDate: string;
  type: 'Cashback' | 'Voucher' | 'Points';
}

interface DataContextType {
  accounts: BankAccount[];
  transactions: Transaction[];
  cards: Card[];
  challenges: Challenge[];
  rewards: Reward[];
  addAccount: (account: Omit<BankAccount, 'id'>) => void;
  addTransaction: (transaction: Omit<Transaction, 'id' | 'date'>) => void;
  updateCard: (cardId: string, updates: Partial<Card>) => void;
  joinChallenge: (challengeId: string) => void;
  claimReward: (rewardId: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: '1',
      accountNumber: '1234567890',
      accountType: 'Savings',
      balance: 125000,
      bank: 'State Bank of India',
      branch: 'Mumbai Central'
    },
    {
      id: '2',
      accountNumber: '9876543210',
      accountType: 'Current',
      balance: 85000,
      bank: 'HDFC Bank',
      branch: 'Bandra West'
    }
  ]);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      accountId: '1',
      type: 'Deposit',
      amount: 25000,
      description: 'Salary Credit',
      date: '2024-01-15',
      status: 'Success'
    },
    {
      id: '2',
      accountId: '1',
      type: 'Withdrawal',
      amount: 5000,
      description: 'ATM Withdrawal',
      date: '2024-01-14',
      status: 'Success'
    },
    {
      id: '3',
      accountId: '2',
      type: 'Transfer',
      amount: 10000,
      description: 'Fund Transfer',
      date: '2024-01-13',
      status: 'Success',
      toAccount: '1234567890'
    }
  ]);

  const [cards, setCards] = useState<Card[]>([
    {
      id: '1',
      type: 'Credit',
      number: '**** **** **** 1234',
      expiryDate: '12/26',
      cvv: '***',
      isActive: true,
      rewardsActive: true,
      bank: 'HDFC Bank'
    },
    {
      id: '2',
      type: 'Debit',
      number: '**** **** **** 5678',
      expiryDate: '08/25',
      cvv: '***',
      isActive: true,
      rewardsActive: false,
      bank: 'State Bank of India'
    }
  ]);

  const [challenges, setChallenges] = useState<Challenge[]>([
    {
      id: '1',
      title: 'Save ₹50,000 in 6 Months',
      description: 'Build your emergency fund by saving ₹50,000 over the next 6 months',
      goalAmount: 50000,
      currentAmount: 25000,
      deadline: '2024-07-15',
      reward: 2500,
      isActive: true,
      isCompleted: false
    },
    {
      id: '2',
      title: 'Monthly Budget Challenge',
      description: 'Stay within your monthly budget for 3 consecutive months',
      goalAmount: 30000,
      currentAmount: 15000,
      deadline: '2024-04-30',
      reward: 1500,
      isActive: false,
      isCompleted: false
    }
  ]);

  const [rewards, setRewards] = useState<Reward[]>([
    {
      id: '1',
      title: '₹500 Cashback',
      description: 'Cashback from monthly spending milestone',
      points: 500,
      isClaimed: false,
      expiryDate: '2024-03-30',
      type: 'Cashback'
    },
    {
      id: '2',
      title: 'Amazon Voucher ₹1000',
      description: 'Shopping voucher for completing savings challenge',
      points: 1000,
      isClaimed: true,
      expiryDate: '2024-06-30',
      type: 'Voucher'
    }
  ]);

  const addAccount = (accountData: Omit<BankAccount, 'id'>) => {
    const newAccount: BankAccount = {
      ...accountData,
      id: Date.now().toString()
    };
    setAccounts(prev => [...prev, newAccount]);
  };

  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0]
    };
    setTransactions(prev => [...prev, newTransaction]);

    // Update account balances
    if (transactionData.type === 'Deposit') {
      setAccounts(prev => prev.map(acc => 
        acc.id === transactionData.accountId 
          ? { ...acc, balance: acc.balance + transactionData.amount }
          : acc
      ));
    } else if (transactionData.type === 'Withdrawal') {
      setAccounts(prev => prev.map(acc => 
        acc.id === transactionData.accountId 
          ? { ...acc, balance: acc.balance - transactionData.amount }
          : acc
      ));
    }
  };

  const updateCard = (cardId: string, updates: Partial<Card>) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, ...updates } : card
    ));
  };

  const joinChallenge = (challengeId: string) => {
    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId ? { ...challenge, isActive: true } : challenge
    ));
  };

  const claimReward = (rewardId: string) => {
    setRewards(prev => prev.map(reward => 
      reward.id === rewardId ? { ...reward, isClaimed: true } : reward
    ));
  };

  return (
    <DataContext.Provider value={{
      accounts,
      transactions,
      cards,
      challenges,
      rewards,
      addAccount,
      addTransaction,
      updateCard,
      joinChallenge,
      claimReward
    }}>
      {children}
    </DataContext.Provider>
  );
};