const express = require('express');
const router = express.Router();
const customerService= require('../services/customerService')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// Route to list all customers
router.get('/list-customers', async (req, res) => {
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

// Route to get details of a specific customer
router.get('/customer-details/:customerId', async (req, res) => {
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

// Route to create a new customer
/*{
  "givenName": "Jane",
  "familyName": "Doe",
  "emailAddress": "jane.doe@example.com" 
  "phoneNumber":  
}*/
router.post('/create-customer', async (req, res) => {
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


router.put('/update-customer/:customerId', async (req, res) => {
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

router.post('/login', async (req, res) => {
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
      console.log(`User ${customer.emailAddress} logged in successfully.`);

      // Here, you would usually generate a JWT token or session
      res.json({ message: 'Login successful', customer: customerWithConvertedBigInt });
  } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Failed to login' });
  }
});




// Export the router
module.exports = router;