import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { processPayment } from '../../Actions/paymentApisAction/paymentAction';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid'; // Import the UUID generator

const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    sourceId: '',
    cardholderName: '',
    email: '',
    cardNumber: '',
    amountMoney: { amount: 0, currency: 'USD' }
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleAmountChange = (e) => {
    setPaymentData({
      ...paymentData,
      amountMoney: { ...paymentData.amountMoney, amount: parseInt(e.target.value, 10) }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const idempotencyKey = uuidv4(); // Generate a new UUID for each submission
    dispatch(processPayment({ ...paymentData, idempotencyKey }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <h2 className="text-center">Process Payment</h2>
            <Form.Group className="mb-3">
              <Form.Label>Cardholder Name:</Form.Label>
              <Form.Control
                type="text"
                name="cardholderName"
                value={paymentData.cardholderName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={paymentData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Card Number:</Form.Label>
              <Form.Control
                type="text"
                name="cardNumber"
                value={paymentData.cardNumber}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Payment Source:</Form.Label>
              <Form.Select
                name="sourceId"
                value={paymentData.sourceId}
                onChange={handleChange}
                required
              >
                <option value="">Select a Payment Source</option>
                <option value="cnon:card-nonce-ok">Card (Sandbox)</option>
                {/* Add more options as needed */}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Amount (in cents):</Form.Label>
              <Form.Control
                type="number"
                name="amountMoney"
                value={paymentData.amountMoney.amount}
                onChange={handleAmountChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Currency:</Form.Label>
              <Form.Select
                name="currency"
                value={paymentData.amountMoney.currency}
                onChange={(e) => setPaymentData({ ...paymentData, amountMoney: { ...paymentData.amountMoney, currency: e.target.value } })}
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                {/* Add more options as needed */}
              </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">Submit Payment</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentForm;
