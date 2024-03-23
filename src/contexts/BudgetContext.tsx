import React, { useContext } from 'react';
import { v4 as uuidV4 } from 'uuid';
import useLocalStorage from '../hooks/useLocalStorage';
import { makeAxiosRequest } from '../Utils';
import { config } from '../Configuration';

const BudgetsContext = React.createContext({});

export const useBudget = (): any => {
  return useContext(BudgetsContext);
};

export const UNCATEGORZED_ID = 'Uncategorized';

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

enum HttpMethods {
  GET = 'GET',
  POST = 'POST'
}

export const BudgetProvider = ({ children }: Props) => {
  const [budgets, setBudgets] = useLocalStorage('budgets', []);
  const [expenses, setExpenses] = useLocalStorage('expenses', []);

  const getBudgetsForUser = async (userId: string): Promise<any> => {
    return await makeAxiosRequest(
      HttpMethods.GET,
      config.backendHost,
      config.getBudgetsForUserUrl(userId)
    );
  };

  const getBudgetExpenses = async (userId: string, budgetId: string) => {
    if (!budgetId) {
      return [];
    }
    return await makeAxiosRequest(
      HttpMethods.GET,
      config.backendHost,
      config.getBudgetExpensesUrl(userId, budgetId)
    );
  };

  const addExpense = async (
    userId: string,
    budgetId: string,
    expense: object
  ) => {
    return await makeAxiosRequest(
      HttpMethods.POST,
      config.backendHost,
      config.addExpenseUrl(userId, budgetId),
      {},
      expense
    );
  };

  const addBudget = async ({ userId, name, max }: any) => {
    return await makeAxiosRequest(
      HttpMethods.POST,
      config.backendHost,
      config.addBudgetUrl(userId),
      {},
      { budgetCategory: name, amount: max, expenses: [] }
    );
  };

  function deleteBudget({ id }: any) {
    setExpenses((prevExpenses: Expense[]) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORZED_ID };
      });
    });

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
        deleteExpense,
        getBudgetsForUser
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
