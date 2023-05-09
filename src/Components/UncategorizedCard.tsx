import React from 'react';
import BudgetCard from './BudgetCard';
import { useBudget, UNCATEGORZED_ID, Expense } from '../contexts/BudgetContext';

function UncategorizedCard(props: any) {
  const { getBudgetExpenses } = useBudget();

  const amount = getBudgetExpenses(UNCATEGORZED_ID).reduce(
    (total: number, expense: Expense) => total + expense.amount,
    0
  );

  console.log(amount);

  if (amount === 0) return null;

  return <BudgetCard amount={amount} name="Uncategorized" gray {...props} />;
}

export default UncategorizedCard;
