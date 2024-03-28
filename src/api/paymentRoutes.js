const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService.js');

router.post('/process-payment', async (req, res) => {
    const { nonce, amount } = req.body;

    // Validate the request body
    if (!nonce || !amount || typeof amount !== 'number' || amount <= 0) {
        return res.status(400).json({ error: 'Invalid request body' });
    }

    try {
        const result = await paymentService.processPayment(nonce, amount);
        res.status(200).json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/payment-details/:paymentId', async (req, res) => {
    try {
        const { paymentId } = req.params;
        const paymentDetails = await paymentService.getPaymentDetails(paymentId);
        res.json(paymentDetails);
    } catch (error) {
        console.error("Failed to retrieve payment details:", error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/refund-payment', async (req, res) => {
    try {
        const { paymentId, amountMoney } = req.body;
        const refundResult = await paymentService.refundPayment(paymentId, amountMoney);
        res.json(refundResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// List payments for a customer
router.get('/list-payments/:customerId', async (req, res) => {
    try {
        const { customerId } = req.params;
        const paymentsList = await paymentService.listPayments(customerId);
        res.json(paymentsList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;