import React, { useContext } from 'react';

const BudgetsContext = React.createContext({});

export const useBudget = (): any => {
  return useContext(BudgetsContext);
};

type Props = {
  children: any;
};

export interface Expense {
  id: string;
  budgetId: string;
  amount: number;
  description: string;
}

export interface Budget {
  id: string;
  name: string;
  max: number;
}

export const BudgetProvider = ({ children }: Props) => {
  return (
    <BudgetsContext.Provider value={{}}>{children}</BudgetsContext.Provider>
  );
};
