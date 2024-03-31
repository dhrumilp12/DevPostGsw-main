const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService.js');

router.post('/process-payment', async (req, res) => {
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
    

router.get('/payment-details/:paymentId', async (req, res) => {
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

router.get('/list-payments', async (req, res) => {
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