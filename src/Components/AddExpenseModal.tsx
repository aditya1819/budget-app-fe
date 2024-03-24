import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addExpense } from '../Utils';

function AddExpenseModal({
  show,
  handleClose,
  budget,
  userId,
  onBudgetAdded
}: any) {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const budgetIdRef = useRef<HTMLSelectElement>(null);

  async function handleSubmit(e: React.SyntheticEvent) {
    const descriptionRefCurrent = descriptionRef.current;
    const budgetIdRefCurrent = budgetIdRef.current;
    const amountRefCurrent = amountRef.current;

    e.preventDefault();

    if (descriptionRefCurrent && budgetIdRefCurrent && amountRefCurrent) {
      const date = new Date();

      const payload = {
        date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`,
        detail: descriptionRef.current.value,
        amount: parseFloat(amountRef.current.value)
      };

      try {
        const data = await addExpense(userId, budget.id, payload);
        onBudgetAdded();
      } catch (error) {}
    }
    handleClose();
  }

  if (!budget) {
    return null;
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
            <Form.Select defaultValue={budget.id} ref={budgetIdRef}>
              <option id={budget.id}>{budget.title}</option>
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
