import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: "income" | "outcome";
  category: string;
  createdAt: string;
}

interface TransactionsContextType {
  transactions: Transaction[];
}

interface TransactionsProviderProps {
  children: ReactNode;
}

export const TransactionsContext = createContext({} as TransactionsContextType);

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then((data) => setTransactions(data));
  }, []);
  return <TransactionsContext.Provider value={{ transactions }}>{children}</TransactionsContext.Provider>;
}