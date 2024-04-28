// Handles inventory management routes for batch retrieving and adjusting inventory counts.
const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventoryService');

// Route for retrieving inventory counts for multiple items using POST to accommodate potentially large data payloads.
router.post('/batch-retrieve', async (req, res) => {
   // Calls the inventory service to retrieve counts and handles responses and errors.
    try {
        const { itemIds } = req.body;
        const counts = await inventoryService.batchRetrieveInventoryCounts(itemIds);
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory counts' });
    }
});

// Route for adjusting inventory counts for multiple items, includes handling of complex logic like state transitions.
router.post('/batch-adjust', async (req, res) => {
    // Adjusts inventory based on changes provided in the request body, logs the adjusted inventory, and manages response and errors.
    try {
        const { changes, locationId } = req.body; // Extract locationId from the request body
        const counts = await inventoryService.batchChangeInventory(changes, locationId);
        console.log("adjusted inventory:",counts)
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to adjust inventory counts' });
    }
});

module.exports = router;
