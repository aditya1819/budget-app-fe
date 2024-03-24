import React, { useRef } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { addBudget } from '../Utils';

function AddBudgetModal({ show, handleClose, userId, onBudgetAdded }: any) {
  const nameRef = useRef<HTMLInputElement>(null);
  const maxRef = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: React.SyntheticEvent) {
    const nameRefCurrent = nameRef.current;
    const maxRefCurrent = maxRef.current;

    e.preventDefault();

    if (nameRefCurrent && maxRefCurrent) {
      try {
        const data = await addBudget({
          userId,
          name: nameRef.current.value,
          max: maxRef.current.value
        });
        onBudgetAdded();
      } catch (error) {
        console.error(JSON.stringify(error));
      }
    }
    handleClose();
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>New Budget</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" ref={nameRef} required />
          </Form.Group>

          <Form.Group className="mb-3" controlId="max">
            <Form.Label>Maximum Spending</Form.Label>
            <Form.Control
              type="text"
              ref={maxRef}
              required
              min={0}
              step={0.01}
            />
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

export default AddBudgetModal;
