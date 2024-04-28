// Defines routes for customer-related operations such as listing, retrieving, creating, and updating customer details.
const express = require('express');
const router = express.Router();
const customerService= require('../services/customerService')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Route to list all customers with optional pagination via cursor.
router.get('/list-customers', async (req, res) => {
  // Retrieves customers from the service and handles serialization of BigInt values.
  try {
    const cursor = req.query.cursor; // If your API supports pagination
    const customers = await customerService.listCustomers(cursor);
    console.log('Customers from service:', customers); // Check data here
    // Convert BigInt values to strings
    const customersWithConvertedBigInts = customers.map(customer => {
      return { ...customer, version: customer.version.toString() };
    });

    res.json(customersWithConvertedBigInts);
   
  } catch (error) {
    console.error('Error listing customers:', error);
        res.status(500).json({ error: 'Failed to list customers' });
  }
});


// Route to retrieve detailed information for a specific customer by ID.
router.get('/customer-details/:customerId', async (req, res) => {
  // Fetches customer details, converts BigInt to strings for compatibility, and handles potential errors or non-existent customers.
  try {
    const customerId = req.params.customerId;
    const customer = await customerService.getCustomerDetails(customerId);
    console.log('Customer from service:', customer);
    // ... in customerRoutes.js (customer-details route)
    if (customer.version) {
      customer.version = customer.version.toString(); 
    }
    res.json(customer);
  } catch (error) {
    // Check for a specific error message and respond with a 404 status code
    if (error.message === 'Customer does not exist.') {
      res.status(404).json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});



// Route to create a new customer with necessary data provided in the request body.
router.post('/create-customer', async (req, res) => {
  // Creates a new customer, handles data serialization, and manages response with the newly created customer data.
  try {
    const customerData = req.body;
    const newCustomer = await customerService.createCustomer(customerData);
    // Convert BigInt values to strings
    const newCustomerWithConvertedBigInts = {
      ...newCustomer,
      version: newCustomer.version.toString()
    };

    console.log('New customer created:', newCustomerWithConvertedBigInts);
    res.status(201).json(newCustomerWithConvertedBigInts);
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ error: 'Failed to create customer' });
  }
});


// Route to update existing customer details based on customer ID.
router.put('/update-customer/:customerId', async (req, res) => {
 // Updates customer information, logs the updated customer, and handles responses and errors.
  try {
    const customerId = req.params.customerId;
    const customerData = req.body;
    const updatedCustomer = await customerService.updateCustomer(customerId, customerData);
    console.log('Updated customer:', updatedCustomer);
    res.json(updatedCustomer); // Make sure the response is being sent back
  } catch (error) {
    console.error('Error updating customer:', error);
    res.status(500).json({ error: error.message }); // Send an error response if something goes wrong
  }
});


// Route for customer login, validates email and password, and handles authentication.
router.post('/login', async (req, res) => {
  // Handles customer login with basic validation and error management, providing session initiation or token generation.
  const { emailAddress, password } = req.body;
  try {
      const customer = await customerService.findCustomerByEmail(emailAddress);
      if (!customer) {
          return res.status(404).json({ error: 'Customer not found' });
      }

      // Assuming the password is stored in plain text for simplification
      // In a real application, use bcrypt to hash and compare passwords securely
      if (customer.note.trim() !== password.trim()) {
          return res.status(401).json({ error: 'Invalid credentials' });
      }

      // Convert BigInt to string
      const customerWithConvertedBigInt = {
          ...customer,
          version: customer.version.toString()
      };
      
      // Log success message on terminal
      console.log(`User ${customer.givenName} with id:${customer.id} and email: ${customer.emailAddress} logged in successfully.`);
      console.log(customerWithConvertedBigInt);
      // Here, you would usually generate a JWT token or session
      res.json({ message: 'Login successful', customer: customerWithConvertedBigInt });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to login' });
  }
});




// Export the router
module.exports = router;