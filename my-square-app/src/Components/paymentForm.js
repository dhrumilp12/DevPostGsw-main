// src/components/PaymentForm.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { processPayment } from '../Actions/paymentAction';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ThreeDots } from 'react-loader-spinner';

const PaymentForm = () => {
  const [amount, setAmount] = useState('');
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.payment);

  const handleSubmit = (e) => {
    e.preventDefault();
    const paymentData = { amount };
    dispatch(processPayment(paymentData));
  };
  if (error) toast.error(`Error: ${error}`);

  return (
    <div>
      <ToastContainer />
      <h2>Process Payment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Pay</button>
      </form>
      {loading && (
        <div>
          <ThreeDots color="#00BFFF" height={20} width={20} />
        </div>
      )}
      {error && <div>Error: {error}</div>}
    </div>
  );
};

export default PaymentForm;
