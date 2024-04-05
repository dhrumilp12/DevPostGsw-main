const express = require('express');
const router = express.Router();
const { processWebhook } = require('../services/webhookService');
 
router.post('/square', (req, res) => {
    try {
        processWebhook(req); // Pass the entire request to the service
 
        res.status(200).send('Webhook received');
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(401).send('Webhook signature validation failed');
    }
});
 
module.exports = router;