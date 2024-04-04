// src/components/PaymentForm.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { processPayment } from '../Actions/paymentAction';


const PaymentForm = () => {
  const [paymentData, setPaymentData] = useState({
    sourceId: '',
    amountMoney: { amount: 0, currency: 'USD' },
    idempotencyKey: ''
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentData({ ...paymentData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(processPayment(paymentData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Process Payment</h2>
      <label>
        Source ID:
        <input
          type="text"
          name="sourceId"
          value={paymentData.sourceId}
          onChange={handleChange}
          required
        />
      </label>
      <label>
        Amount (in cents):
        <input
          type="number"
          name="amountMoney"
          value={paymentData.amountMoney.amount}
          onChange={(e) => setPaymentData({ ...paymentData, amountMoney: { ...paymentData.amountMoney, amount: e.target.value } })}
          required
        />
      </label>
      <label>
        Currency:
        <select
          name="currency"
          value={paymentData.amountMoney.currency}
          onChange={(e) => setPaymentData({ ...paymentData, amountMoney: { ...paymentData.amountMoney, currency: e.target.value } })}
          required
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
        </select>
      </label>
      <label>
        Idempotency Key:
        <input
          type="text"
          name="idempotencyKey"
          value={paymentData.idempotencyKey}
          onChange={handleChange}
          required
        />
      </label>
      <button type="submit">Submit Payment</button>
    </form>
  );
};

export default PaymentForm;
