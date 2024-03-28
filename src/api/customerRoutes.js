const express = require('express');
const router = express.Router();
const customerService= require('../../src/services/customerService')

// Route to list all customers
router.get('/list-customers', async (req, res) => {
  try {
    const cursor = req.query.cursor; // If your API supports pagination
    const customers = await customerService.listCustomers(cursor);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get details of a specific customer
router.get('/customer-details/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customer = await customerService.getCustomerDetails(customerId);
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to create a new customer
router.post('/create-customer', async (req, res) => {
  try {
    const customerData = req.body;
    const newCustomer = await customerService.createCustomer(customerData);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to update an existing customer
router.put('/update-customer/:customerId', async (req, res) => {
  try {
    const customerId = req.params.customerId;
    const customerData = req.body;
    const updatedCustomer = await customerService.updateCustomer(customerId, customerData);
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Export the router
module.exports = router;