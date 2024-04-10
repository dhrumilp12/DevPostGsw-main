// catalogRoutes.js
const express = require('express');
const router = express.Router();
const catalogService = require('../services/catalogService');
const path = require('path');
const multer = require('multer');
const fs = require('fs');
const crypto = require('crypto');

// Ensure the uploads directory exists
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post('/images', upload.single('image'), async (req, res) => {
  try {
      const idempotencyKey = req.body.idempotencyKey;
      const objectId = req.body.objectId;
      const imageFile = req.file;
      const imageData = {
          name: imageFile.originalname,
          data: fs.readFileSync(imageFile.path).toString('base64')
      };
      const createdImage = await catalogService.createCatalogImage(idempotencyKey, objectId, imageData);
      res.json(createdImage);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});



router.put('/images/:imageId', upload.single('image'), async (req, res) => {
  try {
      const imageId = req.params.imageId;
      const idempotencyKey = req.body.idempotencyKey;
      const imageFile = req.file;
      const imageData = {
          name: imageFile.originalname,
          data: fs.readFileSync(imageFile.path).toString('base64')
      };
      const updatedImage = await catalogService.updateCatalogImage(imageId, idempotencyKey, imageData);
      res.json(updatedImage);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});

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


// Route to delete a catalog item
router.delete('/delete/:itemId', async (req, res) => {
  try {
    const itemId = req.params.itemId;
    const deletedItem = await catalogService.deleteCatalogItem(itemId);
    console.log("Deleted item ID:", deletedItem.id);
    res.status(200).json({ deleted_object_ids: [deletedItem.id] }); // Ensure an array is returned
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
router.get('/search-item/:itemId', async (req, res) => {
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

router.get('/list', async (req, res) => {
  try {
      const items = await catalogService.listItems();
      
      res.json(items);
  } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve inventory' });
  }
});


module.exports = router;
