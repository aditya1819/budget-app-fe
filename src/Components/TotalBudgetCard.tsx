import BudgetCard from './BudgetCard';

function TotalCard(props: any) {
  const max = 0,
    amount = 0;
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
