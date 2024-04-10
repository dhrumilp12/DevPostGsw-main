import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateCustomer } from '../../Actions/customerApisAction/customerUpdateAction';
import axios from 'axios';
import { Container, TextField, Button, Typography, Box } from '@mui/material';

const UpdateCustomer = () => {
  const { customerId } = useParams();
  const [customerData, setCustomerData] = useState({
    emailAddress: '',
    note: '',
    version: '',
    givenName: '',
    familyName: '',
  });
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(`/api/customers/customer-details/${customerId}`);
        const { emailAddress, note, version, givenName, familyName } = response.data;
        setCustomerData({
          emailAddress,
          note,
          version,
          givenName,
          familyName,
        });
      } catch (error) {
        console.error('Failed to fetch customer details:', error);
      }
    };

    fetchCustomerDetails();
  }, [customerId]);

  const handleChange = (e) => {
    setCustomerData({ ...customerData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating customer with ID:", customerId);
    dispatch(updateCustomer(customerId, customerData));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Update Customer
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Email Address"
            type="email"
            name="emailAddress"
            value={customerData.emailAddress}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Note"
            type="text"
            name="note"
            value={customerData.note}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Given Name"
            type="text"
            name="givenName"
            value={customerData.givenName}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Family Name"
            type="text"
            name="familyName"
            value={customerData.familyName}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            label="Version"
            type="number"
            name="version"
            value={customerData.version}
            onChange={handleChange}
            variant="outlined"
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Update Customer
        </Button>
      </form>
    </Container>
  );
};

export default UpdateCustomer;
