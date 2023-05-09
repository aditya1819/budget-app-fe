import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';

const BudgetsContext = React.createContext({});

export const useBudget = () => {
  return useContext(BudgetsContext);
};

type Props = {
  children: any;
};

interface Expense {
  id: string;
  budgetId: string;
  amount: number;
  description: string;
}

interface Budget {
  id: string;
  name: string;
  max: number;
}

export const BudgetProvider = ({ children }: Props) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  function getBudgetExpenses(budgetId: string) {
    return expenses.filter((exp: Expense) => exp.budgetId === budgetId);
  }

  function addExpense({ description, budgetId, amount }: any) {
    const newExpense: Expense = {
      id: uuidV4(),
      description,
      budgetId,
      amount
    };

    setExpenses((prevExpenses: Expense[]) => {
      return [...prevExpenses, newExpense];
    });
  }

  function addBudget({ name, max }: any) {
    const newBudget: Budget = {
      id: uuidV4(),
      name,
      max
    };

    setBudgets((prevBudgets: Budget[]) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, newBudget];
    });
  }

  function deleteBudget({ id }: any) {
    // TODO: handles expenses when budget is delete

    setBudgets((prevBudgets: Budget[]) => {
      return prevBudgets.filter((budgets) => budgets.id !== id);
    });
  }

  function deleteExpense({ id }: any) {
    setExpenses((prevExpenses: Expense[]) => {
      return prevExpenses.filter((expenses) => expenses.id !== id);
    });
  }

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
