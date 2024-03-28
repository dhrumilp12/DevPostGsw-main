const express = require('express');
const router = express.Router();
const customerService = require('../services/customerService');

// Create a new customer
router.post('/create-customer', async (req, res) => {
    try {
        const customerData = req.body;
        const customerResult = await customerService.createCustomer(customerData);
        res.json(customerResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve details of a customer
router.get('/customer-details/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        const customerDetails = await customerService.getCustomerDetails(customerId);
        res.json(customerDetails);
    } catch (error) {
        console.error("Failed to retrieve customer details:", error);
        res.status(500).json({ error: error.message });
    }
});

// Update a customer
router.put('/customer-details/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        const customerData = req.body;
        const updatedCustomer = await customerService.updateCustomer(customerId, customerData);
        res.json(updatedCustomer);
    } catch (error) {
        console.error("Failed to update customer details:", error);
        res.status(500).json({ error: error.message });
    }
});

// List all customers
router.get('/list-customers', async (req, res) => {
    try {
        const customersList = await customerService.listCustomers();
        res.json(customersList);
    } catch (error) {
        console.error("Failed to list customers:", error);
        res.status(500).json({ error: error.message });
    }
});


// Add more customer-related routes as needed

module.exports = router;
