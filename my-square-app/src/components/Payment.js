import React, { useState } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import {
  processPaymentStart,
  processPaymentSuccess,
  processPaymentFailure,
} from '../Actions/paymentActions'; // Make sure the path is correct

const Payment = ({
  dispatchProcessPaymentStart,
  dispatchProcessPaymentSuccess,
  dispatchProcessPaymentFailure,
}) => {
  const [paymentData, setPaymentData] = useState({
    amount: '',
    customerId: '',
    cardNonce: '', // Assuming you have a method to generate cardNonce
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.amount = paymentData.amount > 0 ? "" : "Amount must be greater than 0";
    tempErrors.customerId = paymentData.customerId ? "" : "Customer ID is required";
    tempErrors.cardNonce = paymentData.cardNonce ? "" : "Card details are required";
    setErrors(tempErrors);
    
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      dispatchProcessPaymentStart();
      try {
        const response = await axios.post('http://localhost:3000/api/payments/process-payment', paymentData);
        dispatchProcessPaymentSuccess(response.data);
        // Additional success handling
      } catch (error) {
        console.error('Payment Error:', error);
        dispatchProcessPaymentFailure(error.response?.data?.message || error.message);
      }
    }
  };

  return (
    <div>
      <h2>Process Payment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            name="amount"
            type="number"
            value={paymentData.amount}
            onChange={handleInputChange}
            required
          />
          {errors.amount && <p>{errors.amount}</p>}
        </div>
        <div>
          <label htmlFor="customerId">Customer ID:</label>
          <input
            id="customerId"
            name="customerId"
            type="text"
            value={paymentData.customerId}
            onChange={handleInputChange}
            required
          />
          {errors.customerId && <p>{errors.customerId}</p>}
        </div>
        {/* Add fields for card details or nonce here */}
        <button type="submit">Submit Payment</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
    dispatchProcessPaymentStart: () => dispatch(processPaymentStart()),
    dispatchProcessPaymentSuccess: (paymentInfo) => dispatch(processPaymentSuccess(paymentInfo)),
    dispatchProcessPaymentFailure: (error) => dispatch(processPaymentFailure(error)),
});

export default connect(null, mapDispatchToProps)(Payment);
