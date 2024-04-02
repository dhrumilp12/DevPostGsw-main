const express = require('express');
const router = express.Router();
const loyaltyService = require('../services/loyaltyService');

// Create a loyalty account
router.post('/accounts', async (req, res) => {
    try {
        const accountData = req.body;
        const newAccount = await loyaltyService.createLoyaltyAccount(accountData);
        res.json(newAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Search loyalty accounts
router.post('/accounts/search', async (req, res) => {
    try {
        const searchCriteria = req.body;
        const accounts = await loyaltyService.searchLoyaltyAccounts(searchCriteria);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Retrieve a loyalty account
router.get('/accounts/:accountId', async (req, res) => {
    try {
        const { accountId } = req.params;
        const account = await loyaltyService.retrieveLoyaltyAccount(accountId);
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Accumulate loyalty points
router.post('/accounts/:accountId/accumulate', async (req, res) => {
    try {
        const { accountId } = req.params;
        const accumulateData = req.body;
        const updatedAccount = await loyaltyService.accumulateLoyaltyPoints(accountId, accumulateData);
        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Adjust loyalty points
router.post('/accounts/:accountId/adjust', async (req, res) => {
    try {
        const { accountId } = req.params;
        const adjustData = req.body;
        const updatedAccount = await loyaltyService.adjustLoyaltyPoints(accountId, adjustData);
        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add other routes based on the Loyalty API endpoints

module.exports = router;
