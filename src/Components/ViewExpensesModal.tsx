import { Button, Modal, Stack } from 'react-bootstrap';
import {
  currencyFormatter,
  deleteBudget,
  deleteExpense,
  getBudgetExpenses,
  getDate
} from '../Utils';
import { useEffect, useState } from 'react';
import { BudgetList, ExpenseList } from '../Schema';

function ViewExpensesModal({ handleClose, userId, budgetId }: any) {
  // TODO

  const [expenses, setExpenses] = useState([] as ExpenseList[]);
  const [budget, setBudget] = useState(null as unknown as BudgetList);
  const [fetchBudgetTrigger, setFetchBudgetTrigger] = useState(false);

  const handleBudgetChange = () => {
    setFetchBudgetTrigger((prev) => !prev); // Toggle the state to trigger refetch
  };

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const data = await getBudgetExpenses(userId, budgetId);
        setExpenses(data.expenses ?? []);
        setBudget(data);
      } catch (error) {
        console.error('Failed to fetch expenses:', error);
      }
    };

    fetchBudgets();
  }, [userId, budgetId, fetchBudgetTrigger]);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {budget?.title}</div>
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
              <div className="me-auto fs-6">{getDate(expense.date)}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={async () => {
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
