// src/components/CustomerDetails.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Container, Card } from 'react-bootstrap'; // Adding Bootstrap components for styling

const CustomerDetails = () => {
  const { customerId } = useParams();
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/api/customers/${customerId}`, {
          headers: {
            'Square-Version': '2024-03-20',
            'Authorization': `Bearer ${process.env.REACT_APP_SQUARE_ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        });
        setCustomer(response.data.customer); // Assuming the customer object is directly within the data
      } catch (error) {
        setError('Failed to retrieve customer details');
      } finally {
        setLoading(false); // Set loading to false regardless of outcome
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!customer) return <div>No customer details available.</div>;

  return (
    <Container>
      <Card>
        <Card.Body>
          <Card.Title>Customer Details</Card.Title>
          <Card.Text>Name: {customer.given_name} {customer.family_name}</Card.Text>
          <Card.Text>Email: {customer.email_address}</Card.Text>
          <Card.Text>Phone: {customer.phone_number}</Card.Text>
          {/* Display more customer details as needed */}
          {/* Example: Address */}
          {customer.address && (
            <>
              <Card.Text>Address: {customer.address.address_line_1} {customer.address.address_line_2}</Card.Text>
              <Card.Text>City: {customer.address.locality}</Card.Text>
              <Card.Text>State/Province: {customer.address.administrative_district_level_1}</Card.Text>
              <Card.Text>Postal Code: {customer.address.postal_code}</Card.Text>
              <Card.Text>Country: {customer.address.country}</Card.Text>
            </>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default CustomerDetails;
