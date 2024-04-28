// PaymentForm integrates the Square Payment Form for processing payments.
// It accepts payment information, tokenizes it, and submits it to the payment API.
// Manages loading and error states, and navigates to the payment details page upon successful payment.

import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { processPayment } from '../../Actions/paymentApisAction/paymentAction';
import { Container, Row, Col, Alert, Spinner, Card } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation  } from 'react-router-dom';
import { PaymentForm as SquarePaymentForm, CreditCard } from 'react-square-web-payments-sdk';


const PaymentForm = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [amountMoney, setAmountMoney] = useState({ amount: 100, currency: 'USD' }); // Default amount

  useEffect(() => {
    // Check if state has price data
    if (location.state && location.state.amountMoney) {
      setAmountMoney(location.state.amountMoney);
    }
  }, [location]);

  const handlePayment = async (tokenResult) => {
    if (tokenResult.status === 'OK') {
      setIsLoading(true);
      const idempotencyKey = uuidv4();
      const paymentData = {
        sourceId: tokenResult.token,
        idempotencyKey,
        amountMoney: amountMoney // Sample amount, change as needed
      };

      dispatch(processPayment(paymentData))
        .then((response) => {
          console.log('Payment successful:', response);
          navigate(`/payment-detail/${response.id}`); // Navigate to payment details page
        })
        .catch((error) => {
          console.error('Payment processing failed:', error);
          setError('Payment processing failed. Please try again.');
          setIsLoading(false);
        });
    } else {
      console.error('Failed to tokenize card:', tokenResult.errors);
      setError('Failed to tokenize the payment information.');
    }
  };

  return (
    <Container className='my-5'>
      <Row className="justify-content-md-center">
        <Col md={6}>
        <Card className="shadow-sm">
            <Card.Body>
              <h2 className="text-center">Process Payment</h2>
              <div className="text-center mb-4">
                <h4>Amount to Pay</h4>
                <p className="fs-4 text-success fw-bold">
                  {amountMoney.currency} {(amountMoney.amount / 100).toFixed(2)}
                </p>
              </div>
          <SquarePaymentForm
            applicationId="sq0idp-z_5hxdVLZMkrItgpG4s0hg"
            locationId="LN5DGWQC555CT"
            cardTokenizeResponseReceived={handlePayment}
          >
            <CreditCard />
          </SquarePaymentForm>
          {isLoading &&  (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        )}
          {error && <Alert variant="danger">{error}</Alert>}
          </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentForm;

