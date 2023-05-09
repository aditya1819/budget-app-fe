import { Card, ProgressBar, Stack, Button } from 'react-bootstrap';
import { currencyFormatter } from '../Utils';

type Props = {
  name: string;
  amount: number;
  max: number;
  onAddExpenseClick: any;
  onViewExpenseClick: any;
  gray?: boolean;
  hideButtons?: boolean;
};

function getProgressBarVarient(amount: number, max: number) {
  const ratio = amount / max;
  return ratio < 0.5 ? 'primary' : ratio < 0.75 ? 'warning' : 'danger';
}

function BudgetCard({
  name,
  amount,
  max,
  gray,
  onAddExpenseClick,
  onViewExpenseClick,
  hideButtons
}: Props) {
  const classNames = [];
  if (amount > max) {
    classNames.push('bg-danger', 'bg-opacity-10');
  } else if (gray) {
    classNames.push('bg-light');
  }

  return (
    <Card className={classNames.join(' ')}>
      <Card.Body>
        <Card.Title className="d-flex justify-content-between align-items-baseline fw-normal mb-3">
          <div className="me-2">{name}</div>
          <div>
            {currencyFormatter.format(amount)}
            {max && <span> / {currencyFormatter.format(max)}</span>}
          </div>
        </Card.Title>
        {max && (
          <ProgressBar
            className="rounded-pill"
            variant={getProgressBarVarient(amount, max)}
            min={0}
            max={max}
            now={amount}
          />
        )}

        {!hideButtons && (
          <Stack direction="horizontal" gap={2} className="mt-4">
            <Button
              variant="outline-primary"
              className="ms-auto"
              onClick={onAddExpenseClick}
            >
              Add Expense
            </Button>
            <Button variant="outline-secondary" onClick={onViewExpenseClick}>
              View Expenses
            </Button>
          </Stack>
        )}
      </Card.Body>
    </Card>
  );
}

export default BudgetCard;
