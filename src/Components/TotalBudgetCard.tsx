import BudgetCard from './BudgetCard';
import {
  useBudget,
  UNCATEGORZED_ID,
  Expense,
  Budget
} from '../contexts/BudgetContext';

function TotalCard(props: any) {
  const { expenses, budgets } = useBudget();

  const amount = expenses.reduce(
    (total: number, expense: Expense) => total + expense.amount,
    0
  );

  const max = budgets.reduce(
    (total: number, budget: Budget) => total + budget.max,
    0
  );

  if (max === 0) return null;

  return (
    <BudgetCard
      amount={amount}
      name="Total"
      gray
      max={max}
      hideButtons
      {...props}
    />
  );
}

export default TotalCard;
