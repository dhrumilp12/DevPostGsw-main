// src/components/PaymentStatus.js
import React from 'react';
import { useSelector } from 'react-redux';

const PaymentStatus = () => {
  const { loading, error, success } = useSelector(state => state.payment);

  if (loading) return <p>Processing payment...</p>;
  if (error) return <p>Error: {error}</p>;
  if (success) return <p>Payment successful!</p>;

  return null; // No status to display
};

export default PaymentStatus;
