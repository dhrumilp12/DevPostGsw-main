const express = require('express');
const router = express.Router();
const paymentService = require('../services/paymentService.js');

router.post('/process-payment', async (req, res) => {
    try {
        const { nonce, amount } = req.body;
        const paymentResult = await paymentService.processPayment(nonce, amount);
        res.json(paymentResult);
    } catch (error) {
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

module.exports = router;