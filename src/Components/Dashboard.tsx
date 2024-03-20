import AddExpenseModal from './AddExpenseModal';
import TotalCard from './TotalBudgetCard';
import ViewExpensesModal from './ViewExpensesModal';
import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './BudgetCard';
import AddBudgetModal from './AddBudgetModal';

import { useEffect, useState } from 'react';
import {
  useBudget,
  Budget,
  Expense,
  UNCATEGORZED_ID
} from '../contexts/BudgetContext';
import { BudgetList } from '../Schema';

const Dashboard = () => {
  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [viewExpenseModalBudgetId, setViewExpenseModalBudgetId] = useState<
    string | undefined
  >();
  const [addExpenseBudgetId, setAddExpenseBudgetId] = useState();
  const [budgets, setBudgets] = useState([] as BudgetList[]);

  const { getBudgetsForUser } = useBudget();

  const userId = '65fad08ad2d4be06ba7439a4';

  function openAddExpenseModal(budgetId: any): any {
    setShowAddExpenseModal(true);
    setAddExpenseBudgetId(budgetId);
  }

  useEffect(() => {
    const fetchBudgets = async () => {
      try {
        const budgets = await getBudgetsForUser(userId);
        console.log(budgets); // Do something with the budgets
        setBudgets(budgets);
      } catch (error) {
        console.error('Failed to fetch budgets:', error);
      }
    };

    fetchBudgets();
  }, [userId, getBudgetsForUser]); // Depend on userId and getBudgetsForUser

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
          {budgets.map((budget: BudgetList) => {
            const amount: number = budget.consumed;
            return (
              <BudgetCard
                key={budget.id}
                name={budget.title}
                amount={amount}
                max={budget.total}
                onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                onViewExpenseClick={() => {
                  console.log(budget.id);
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
      />
      <AddExpenseModal
        show={showAddExpenseModal}
        defaultBudgetId={addExpenseBudgetId}
        handleClose={() => {
          setShowAddExpenseModal(false);
        }}
      />
      <ViewExpensesModal
        userId={userId}
        budgetId={viewExpenseModalBudgetId}
        handleClose={() => {
          setViewExpenseModalBudgetId(undefined);
        }}
      />
    </>
  );
};

export default Dashboard;
