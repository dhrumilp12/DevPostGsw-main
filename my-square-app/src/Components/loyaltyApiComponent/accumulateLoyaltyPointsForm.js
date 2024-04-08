import React, { useState } from 'react';
//replace 'LOCATION_ID' with the actual location ID where the purchase was made.
import { useDispatch, useSelector } from 'react-redux';
import { accumulateLoyaltyPoints } from '../../Actions/loyaltyApiAction/accumulateLoyaltyPointsAction';
import { Form, Button, Alert, Spinner } from 'react-bootstrap';

const AccumulateLoyaltyPointsForm = ({ accountId }) => {
  const [orderId, setOrderId] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loyaltyPointsAccumulation);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(accumulateLoyaltyPoints(accountId, { accumulate_points: { order_id: orderId }, location_id: 'LOCATION_ID' }));
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label>Order ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={loading}>
        {loading ? <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> : 'Accumulate Points'}
      </Button>
      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
    </Form>
  );
};

export default AccumulateLoyaltyPointsForm;
