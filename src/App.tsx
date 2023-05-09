import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { MouseEventHandler, SetStateAction, useState } from 'react';
import {
  useBudget,
  Budget,
  Expense,
  UNCATEGORZED_ID
} from './contexts/BudgetContext';
import AddExpenseModal from './components/AddExpenseModal';
import UncategorizedCard from './components/UncategorizedCard';
import TotalCard from './components/TotalBudgetCard';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();

  const { budgets, getBudgetExpenses } = useBudget();

  function openAddExpenseModal(budgetId: any): any {
    setShowAddExpenseModal(true);
    setAddExpenseBudgetId(budgetId);
  }

  return (
    <>
      <Container>
        <Stack direction="horizontal" className="mb-4" gap={2}>
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add budget
          </Button>
          <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button>
        </Stack>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start'
          }}
        >
          {budgets.map((budget: Budget) => {
            const amount: number = getBudgetExpenses(budget.id).reduce(
              (total: number, expense: Expense) => total + expense.amount,
              0
            );

            return (
              <BudgetCard
                key={budget.id}
                name={budget.name}
                amount={amount}
                max={budget.max}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
              ></BudgetCard>
            );
          })}
          <UncategorizedCard
            onAddExpenseClick={() => openAddExpenseModal(UNCATEGORZED_ID)}
          />
          <TotalCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseBudgetId}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
    </>
  );
}

export default App;
