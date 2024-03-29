const express = require('express');
const router = express.Router();
const inventoryService = require('../services/inventoryService');

// Route to list inventory items
router.get('/', async (req, res) => {
    try {
        const inventoryItems = await inventoryService.listInventoryItems();
        res.json(inventoryItems);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve inventory' }); // Standardized error message
    }

    
});
 
module.exports = router;
