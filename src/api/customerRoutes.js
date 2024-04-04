const express = require('express');
const router = express.Router();
const customerService= require('../../src/services/customerService');
const bcrypt = require('bcrypt');


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


// Route to update an existing customer
router.put('/update-customer/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customerData = req.body;
    const updatedCustomer = await customerService.updateCustomer(customerId, customerData);
    console.log('Updated customer:', updatedCustomer);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await customerService.authenticateCustomer(email, password);
    if (customer) {
      res.json({ message: "Login successful", customer });
    } else {
      res.status(401).json({ error: "Login failed" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Export the router
module.exports = router;