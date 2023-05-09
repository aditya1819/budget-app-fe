import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Budget, useBudget, UNCATEGORZED_ID } from '../contexts/BudgetContext';

function AddExpenseModal({ show, handleClose, defaultBudgetId }: any) {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetIdRef = useRef<HTMLSelectElement>(null);

  const { addExpense, budgets } = useBudget();

  function handleSubmit(e: React.SyntheticEvent) {
    const descriptionRefCurrent = descriptionRef.current;
    const budgetIdRefCurrent = budgetIdRef.current;
    const amountRefCurrent = amountRef.current;

    e.preventDefault();

    if (descriptionRefCurrent && budgetIdRefCurrent && amountRefCurrent) {
      addExpense({
        description: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value),
        budgetId: budgetIdRef.current.value
      });
    }
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Expense</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control type="text" ref={descriptionRef} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              ref={amountRef}
              required
              min={0}
              step={0.01}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="amount">
            <Form.Label>Budget Section</Form.Label>
            <Form.Select defaultValue={defaultBudgetId} ref={budgetIdRef}>
              <option id={UNCATEGORZED_ID}>Uncategorized</option>
              {budgets.map((budget: Budget) => (
                <option key={budget.id} value={budget.id}>
                  {budget.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end">
            <Button variant="primary" type="submit">
              Add
            </Button>
          </div>
        </Modal.Body>
      </Form>
    </Modal>
  );
}

export default AddExpenseModal;
