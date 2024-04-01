const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventoryService');

// Route to batch retrieve inventory counts for multiple items
router.post('/batch-retrieve', async (req, res) => {
    try {
        const { itemIds } = req.body;
        const counts = await inventoryService.batchRetrieveInventoryCounts(itemIds);
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory counts' });
    }
});

// Route to batch adjust inventory counts for multiple items
router.post('/batch-adjust', async (req, res) => {
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
