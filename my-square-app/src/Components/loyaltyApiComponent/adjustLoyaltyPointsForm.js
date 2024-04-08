import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adjustLoyaltyPoints } from '../../Actions/loyaltyApiAction/adjustLoyaltyPointsAction';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const AdjustLoyaltyPointsForm = ({ accountId }) => {
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');
  const { loading, error } = useSelector((state) => state.adjustLoyaltyPoints);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const adjustData = {
      adjust_points: {
        points,
        reason,
      },
      // Provide an idempotency_key here or generate it in your action
      idempotency_key: `idemp-${new Date().getTime()}`,
    };
    dispatch(adjustLoyaltyPoints(accountId, adjustData));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>Reason</Form.Label>
        <Form.Control
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
      </Form.Group>
      {error && <Alert variant="danger">{error}</Alert>}
      <Button type="submit" disabled={loading}>
        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Adjust Points'}
      </Button>
    </Form>
  );
};

export default AdjustLoyaltyPointsForm;
