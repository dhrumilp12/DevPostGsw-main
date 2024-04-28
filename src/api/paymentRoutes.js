// Routes for handling payment transactions including processing payments and retrieving payment details.
const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService.js');

// Route to process a payment.
router.post('/process-payment', async (req, res) => {
     // Validates payment details, processes the payment using the payment service, and handles the response and errors.
    const { sourceId, amountMoney, idempotencyKey } = req.body;

    // Validate the request body
    if (!sourceId || !amountMoney || typeof amountMoney.amount !== 'number' || amountMoney.amount <= 0) {
        return res.status(400).json({ error: 'Invalid request body' });
    }
    try {
        const paymentResult = await paymentService.processPayment(sourceId, amountMoney.amount, amountMoney.currency, idempotencyKey);
        console.log('Square API response Payment Rsult:', paymentResult);
        res.status(200).json(paymentResult);
    } catch (error) {
        console.error("Error processing payment:", error);
        res.status(500).json({ error: error.message });
    }
});
    

// Route to retrieve details of a specific payment by ID.
router.get('/payment-details/:paymentId', async (req, res) => {
    // Retrieves payment details, handles the response including BigInt serialization, and manages errors.
    try {
        console.log("requested id:",req.params);
        const { paymentId } = req.params;
        const paymentDetails = await paymentService.getPaymentDetails(paymentId);
        console.log("Payment Details:",paymentDetails);
        res.json(paymentDetails);
    } catch (error) {
        console.error("Failed to retrieve payment details:", error);
        res.status(500).json({ error: error.message });
    }
});

// Route to list all payments with optional filtering and pagination.
router.get('/list-payments', async (req, res) => {
    // Lists payments based on query parameters, handles serialization of BigInts, and manages responses and errors.
    try {
      const paymentsList = await paymentService.listPayments(req.query);
      console.log('Payment List:', paymentsList);
      console.log('payment list count:',paymentsList.length),
      res.json(paymentsList);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


module.exports = router;