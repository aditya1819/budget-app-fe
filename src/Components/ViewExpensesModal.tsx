import { Button, Modal, Stack } from 'react-bootstrap';
import {
  Budget,
  Expense,
  UNCATEGORZED_ID,
  useBudget
} from '../contexts/BudgetContext';
import { currencyFormatter } from '../Utils';

function ViewExpensesModal({ handleClose, budgetId }: any) {
  const { getBudgetExpenses, budgets, deleteBudget, deleteExpense } =
    useBudget();

  const expenses: Expense[] = getBudgetExpenses(budgetId);

  const budget =
    UNCATEGORZED_ID === budgetId
      ? { name: UNCATEGORZED_ID, id: UNCATEGORZED_ID }
      : budgets.find((budget: Budget) => budget.id === budgetId);

  return (
    <Modal show={budgetId != null} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap={2}>
            <div>Expenses - {budget?.name}</div>
            {budgetId !== UNCATEGORZED_ID && (
              <Button
                variant="outline-danger"
                onClick={() => {
                  deleteBudget(budget);
                  handleClose();
                }}
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Stack direction="vertical" gap={3}>
          {expenses.map((expense) => (
            <Stack direction="horizontal" gap={2} key={expense.id}>
              <div className="me-auto fs-4">{expense.description}</div>
              <div className="fs-5">
                {currencyFormatter.format(expense.amount)}
              </div>
              <Button
                onClick={() => deleteExpense(expense)}
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
