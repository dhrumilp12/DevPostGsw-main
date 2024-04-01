// catalogRoutes.js
const express = require('express');
const router = express.Router();
const catalogService = require('../services/catalogService');

// Route to create a catalog item
router.post('/create-catalog', async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body
        const itemData = req.body; 
        const newItem = await catalogService.createCatalogItem(itemData);

        // Convert BigInt values to strings
        const newItemWithConvertedBigInts = JSON.parse(JSON.stringify(newItem, (_, v) => 
            typeof v === 'bigint' ? v.toString() : v));

        console.log("New item created:", newItemWithConvertedBigInts); // Log the new item
        res.status(200).json(newItemWithConvertedBigInts); // Correct usage of res.json
    } catch (error) {
        console.error("Error creating catalog item:", error); // Log the error
        res.status(500).json({ error: 'Failed to create catalog item' });
    }
});

   
// Route to update a catalog item
router.put('/update-catalog/:itemId', async (req, res) => {
    const itemId = req.params.itemId;
    const itemData = req.body;
    try {
        const updatedItem = await catalogService.updateCatalogItem(itemId, itemData);
        console.log(updatedItem);
        res.json(updatedItem);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update catalog item' });
    }
});


// Route to delete a catalog item
router.delete('/delete/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await catalogService.deleteCatalogItem(itemId);
    console.log("Deleted item ID:", deletedItem.id); // Log the deleted item ID
    res.status(200).json({ message: 'Catalog item deleted successfully', deletedItemId: deletedItem.id });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete catalog item' });
  }
});



// Route to search catalog items
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q; 
    const items = await catalogService.searchCatalogItems(query);
    
     // Convert BigInt values to strings
     const itemsWithConvertedBigInts = JSON.parse(JSON.stringify(items, (_, v) => 
     typeof v === 'bigint' ? v.toString() : v));
     console.log("Search Results (before sending response):", itemsWithConvertedBigInts);
    res.status(200).json(itemsWithConvertedBigInts); // Correct usage of res.json
  } catch (error) {
    res.status(500).json({ error: 'Failed to search catalog items' });
  }
});

// Route to get a single catalog item
router.get('/Serach-item/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    console.log("Fetching catalog item with ID:", itemId); // Log the item ID being fetched
    const item = await catalogService.getCatalogItem(itemId);
    console.log("Fetched item:", item); // Log the fetched item

    // Convert BigInt values to strings
    const itemWithConvertedBigInts = JSON.parse(JSON.stringify(item, (_, v) => 
      typeof v === 'bigint' ? v.toString() : v));

    res.json(itemWithConvertedBigInts); // Send the converted item
  } catch (error) {
    console.error("Error fetching catalog item:", error); // Log the error
    res.status(500).json({ error: 'Failed to get catalog item' });
  }
});


module.exports = router;
