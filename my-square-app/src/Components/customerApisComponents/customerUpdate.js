// src/components/UpdateCustomer.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateCustomer } from '../../Actions/customerApisAction/customerUpdateAction';

const UpdateCustomer = ({ customerId }) => {
  const [customerData, setCustomerData] = useState({
    email_address: '',
    note: '',
    version: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateCustomer(customerId, customerData));
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email Address:
        <input
          type="email"
          name="email_address"
          value={customerData.email_address}
          onChange={handleChange}
        />
      </label>
      <label>
        Note:
        <input
          type="text"
          name="note"
          value={customerData.note}
          onChange={handleChange}
        />
      </label>
      <label>
        Version:
        <input
          type="number"
          name="version"
          value={customerData.version}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Update Customer</button>
    </form>
  );
};

export default UpdateCustomer;
