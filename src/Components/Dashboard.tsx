import AddExpenseModal from './AddExpenseModal';
import TotalCard from './TotalBudgetCard';
import ViewExpensesModal from './ViewExpensesModal';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './BudgetCard';
import AddBudgetModal from './AddBudgetModal';

import { useEffect, useState } from 'react';

import { BudgetList } from '../Schema';
import { getBudgetsForUser } from '../Utils';

const Dashboard = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState<
    string | undefined
  >();
  const [addExpenseBudget, setAddExpenseBudget] = useState(
    null as unknown as BudgetList
  );
  const [budgets, setBudgets] = useState([] as BudgetList[]);

  const [budgetRefetchTrigger, setBudgetRefetchTrigger] = useState(false);

  const handleBudgetAdded = () => {
    setBudgetRefetchTrigger((prev) => !prev); // Toggle the state to trigger refetch
  };

  const userId = '65ff225cdc9eebfd36be1ebb';

  function openAddExpenseModal(budget: BudgetList): any {
    setShowAddExpenseModal(true);
    setAddExpenseBudget(budget);
  }

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgets = await getBudgetsForUser(userId);
        setBudgets(budgets);
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
      }
    };

    fetchBudgets();
  }, [userId, getBudgetsForUser, budgetRefetchTrigger]); // Depend on userId and getBudgetsForUser

  return (
    <>
      <Container>
        <Stack direction="horizontal" className="mb-4" gap={2}>
          <h1 className="me-auto">Budgets</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
            Add budget
          </Button>
          {/* <Button variant="outline-primary" onClick={openAddExpenseModal}>
            Add Expense
          </Button> */}
        </Stack>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '1rem',
            alignItems: 'flex-start'
          }}
        >
          {budgets.map((budget: BudgetList) => {
            const amount: number = budget.consumed;
            return (
              <BudgetCard
                key={budget.id}
                name={budget.title}
                amount={amount}
                max={budget.total}
                onAddExpenseClick={() => openAddExpenseModal(budget)}
                onViewExpenseClick={() => {
                  setViewExpenseModalBudgetId(budget.id);
                }}
              ></BudgetCard>
            );
          })}

          <TotalCard />
        </div>
      </Container>
      <AddBudgetModal
        show={showAddBudgetModal}
        handleClose={() => {
          setShowAddBudgetModal(false);
        }}
        userId={userId}
        onBudgetAdded={handleBudgetAdded}
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        budget={addExpenseBudget}
        userId={userId}
        onBudgetAdded={handleBudgetAdded}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        userId={userId}
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => {
          setViewExpenseModalBudgetId(undefined);
          handleBudgetAdded();
        }}
      />
    </>
  );
};

export default Dashboard;
