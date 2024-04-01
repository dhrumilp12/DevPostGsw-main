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

// Route to search inventory items
router.post('/search', async (req, res) => {
    try {
        const query = req.body;
        const items = await inventoryService.searchInventoryItems(query);
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: 'Failed to search inventory items' });
    }
});

// Route to update an inventory item
router.put('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        const itemData = req.body;
        const updatedItem = await inventoryService.updateInventoryItem(itemId, itemData);
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update inventory item' });
    }
});

// Route to create a new inventory item
router.post('/creat-inventory', async (req, res) => {
    try {
        const itemData = req.body;
        const newItem = await inventoryService.createInventoryItem(itemData);
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create inventory item' });
    }
});

// Route to delete an inventory item
router.delete('/:itemId', async (req, res) => {
    try {
        const itemId = req.params.itemId;
        await inventoryService.deleteInventoryItem(itemId);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete inventory item' });
    }
});

module.exports = router;
