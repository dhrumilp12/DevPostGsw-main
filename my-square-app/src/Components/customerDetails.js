// src/components/CustomerDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/api/customers/customer-details/${customerId}`);
        setCustomer(response.data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>Loading...</div>;

  return (
    <div>
      <h2>Customer Details</h2>
      <p>Name: {customer.givenName} {customer.familyName}</p>
      <p>Email: {customer.emailAddress}</p>
      <p>Phone: {customer.phoneNumber}</p>
      {/* Display more customer details as needed */}
    </div>
  );
};

export default CustomerDetails;

