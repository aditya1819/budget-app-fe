import { Button, Container, Stack } from 'react-bootstrap';
import BudgetCard from './Components/BudgetCard';

function App() {
  return (
    <Container>
      <Stack direction="horizontal" className="mb-4" gap={2}>
        <h1 className="me-auto">Budgets</h1>
        <Button variant="primary">Add budget</Button>
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
        <BudgetCard name="budget" amount={20} max={10} gray></BudgetCard>
      </div>
    </Container>
  );
}

export default App;
