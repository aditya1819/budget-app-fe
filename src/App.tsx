import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './components/BudgetCard';
import AddBudgetModal from './components/AddBudgetModal';
import { useState } from 'react';
import { useBudget, Budget, Expense } from './contexts/BudgetContext';

function App() {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);

  const { budgets, getBudgetExpenses } = useBudget();

  return (
    <>
      <Container>
        <Stack direction="horizontal" className="mb-4" gap={2}>
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add budget
          </Button>
          <Button variant="outline-primary">Add Expense</Button>
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
              ></BudgetCard>
            );
          })}
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
      />
    </>
  );
}

export default App;
