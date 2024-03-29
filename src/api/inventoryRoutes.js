const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventoryService');

// Route to list inventory items
router.get('/list', async (req, res) => {
    try {
        const inventoryItems = await inventoryService.listInventoryItems();
        res.json(inventoryItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory' });
    }
});

// Route to adjust inventory count
router.post('/adjust', async (req, res) => {
    try {
        const { itemId, adjustment } = req.body;
        const updatedCount = await inventoryService.adjustInventoryCount(itemId, adjustment);
        res.json(updatedCount);
    } catch (error) {
        res.status(500).json({ error: 'Failed to adjust inventory count' });
    }
});

// Route to retrieve inventory count for a specific item
router.get('/:itemId', async (req, res) => {
    try {
        const count = await inventoryService.getInventoryCount(req.params.itemId);
        res.json(count);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory count' });
    }
});

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
        const { changes } = req.body;
        const counts = await inventoryService.batchAdjustInventoryCounts(changes);
        res.json(counts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to adjust inventory counts' });
    }
});

// Route to transfer inventory between locations
router.post('/transfer', async (req, res) => {
    try {
        const { itemId, fromLocationId, toLocationId, quantity } = req.body;
        const result = await inventoryService.transferInventory(itemId, fromLocationId, toLocationId, quantity);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Failed to transfer inventory' });
    }
});

module.exports = router;
