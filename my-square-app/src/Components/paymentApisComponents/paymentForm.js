import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { processPayment } from '../../Actions/paymentApisAction/paymentAction';
import { Container, Row, Col, Alert, Spinner } from 'react-bootstrap';
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
    <Container>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <h2 className="text-center">Process Payment</h2>
          <SquarePaymentForm
            applicationId="sq0idp-78KXxKm_tHlqBRbX5gvc1A"
            locationId="L7X4FSM2Z2H0B"
            cardTokenizeResponseReceived={handlePayment}
          >
            <CreditCard />
          </SquarePaymentForm>
          {isLoading && <Spinner animation="border" />}
          {error && <Alert variant="danger">{error}</Alert>}
        </Col>
      </Row>
    </Container>
  );
};

export default PaymentForm;

