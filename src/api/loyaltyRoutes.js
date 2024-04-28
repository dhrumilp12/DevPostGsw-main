// Defines routes for managing loyalty programs, including account creation, points accumulation, and adjustment.
const express = require('express');
const router = express.Router();
const loyaltyService = require('../services/loyaltyService');

// Route to create a loyalty account.
router.post('/accounts', async (req, res) => {
    // Creates a new loyalty account using the provided account data, handles responses, and manages errors.
    try {
        const accountData = req.body;
        const newAccount = await loyaltyService.createLoyaltyAccount(accountData);
        res.json(newAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to search for loyalty accounts based on criteria.
router.post('/accounts/search', async (req, res) => {
    // Searches for loyalty accounts using criteria provided in the request body, returns the results, and handles errors.
    try {
        const searchCriteria = req.body;
        const accounts = await loyaltyService.searchLoyaltyAccounts(searchCriteria);
        res.json(accounts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to retrieve a specific loyalty account.
router.get('/accounts/:accountId', async (req, res) => {
    // Retrieves a detailed loyalty account by ID and handles JSON responses and errors.
    try {
        const { accountId } = req.params;
        const account = await loyaltyService.retrieveLoyaltyAccount(accountId);
        res.json(account);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to accumulate points on a loyalty account.
router.post('/accounts/:accountId/accumulate', async (req, res) => {
    // Accumulates points for a specific loyalty account, handles the updated account data, and manages responses and errors.
    try {
        const { accountId } = req.params;
        const accumulateData = req.body;
        const updatedAccount = await loyaltyService.accumulateLoyaltyPoints(accountId, accumulateData);
        res.json(updatedAccount);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to adjust loyalty points directly.
router.post('/accounts/:accountId/adjust', async (req, res) => {
     // Adjusts loyalty points for an account and handles the resulting data and potential errors.
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
