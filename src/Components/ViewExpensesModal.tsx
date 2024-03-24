import { Button, Modal, Stack } from 'react-bootstrap';
import { Budget, useBudget } from '../contexts/BudgetContext';
import { currencyFormatter } from '../Utils';
import { useEffect, useState } from 'react';
import { ExpenseList } from '../Schema';

function ViewExpensesModal({ handleClose, userId, budgetId }: any) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudget();

  const [expenses, setExpenses] = useState([] as ExpenseList[]);
  const [fetchBudgetTrigger, setFetchBudgetTrigger] = useState(false);

  const handleBudgetChange = () => {
    setFetchBudgetTrigger((prev) => !prev); // Toggle the state to trigger refetch
  };

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgetExpenses(userId, budgetId);
        setExpenses(data.expenses ?? []);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      }
    };

    fetchBudgets();
  }, [userId, budgetId, fetchBudgetTrigger]);

  const budget = budgets.find((budget: Budget) => budget.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {budget?.name}</div>
            <Button
              variant="outline-danger"
              onClick={async () => {
                await deleteBudget(userId, budgetId);
                handleClose();
              }}
            >
              Delete
            </Button>
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.title}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={async () => {
                  console.log('dsjaklf');
                  await deleteExpense(userId, budgetId, expense.id);
                  handleBudgetChange();
                }}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  );
}

export default ViewExpensesModal;
