// catalogRoutes.js defines the HTTP routes for catalog operations, interfacing with the catalogService for processing.
const express = require('express');
const router = express.Router();
const catalogService = require('../services/catalogService');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');



// Setup directory for file uploads
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer storage for handling files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
      
      const extension = path.extname(file.originalname);
      // 'default' is used if objectId is not specified in the query
      const objectId = req.query.objectId|| req.body.objectId || 'default';
      cb(null, `${objectId}${extension}`);
  }
});

const upload = multer({ storage: storage });




// Route for uploading a new catalog image associated with an item.
router.post('/images', upload.single('image'), async (req, res) => {
   // Handles the file upload for catalog images, storing files locally and providing feedback on the operation.
  const objectId = req.query || req.body;
  console.log('Query:', req.query);  // Logs the query parameters
  console.log('Body:', req.body);  // Logs other body fields
  console.log('File Upload Info:', req.file, 'Object ID:', objectId);  // Logs file information

  if (!req.file) {
      return res.status(400).send('No file uploaded');
  }
    
  try {
    res.status(201).send('File uploaded successfully with objectId in filename');
  } catch (error) {
    res.status(500).send(error.message);
  }
});



// Route for updating an existing catalog image with a new file.
router.put('/images/:imageId', upload.single('image'), async (req, res) => {
  // Updates an existing catalog image file, managing file replacement and deletion of old files, and updating catalog data.
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  console.log(req.file.originalname);
  const objectId = req.body.objectId;
  console.log("objectID:",objectId);

  // Find and delete all existing files with the same objectId regardless of extension
  const existingFiles = fs.readdirSync(uploadsDir).filter(
    file => file.startsWith(objectId) && file !== `${objectId}${path.extname(req.file.originalname)}`
);

existingFiles.forEach(file => {
    try {
        fs.unlinkSync(path.join(uploadsDir, file));
        console.log(`Deleted old file: ${file}`);
    } catch (err) {
        console.error(`Error deleting old file: ${file}`, err);
        return res.status(500).json({ error: 'Failed to delete old files' });
    }
});

  const { imageId } = req.params;
  const idempotencyKey = req.headers['idempotency-key'] || crypto.randomUUID();
  console.log("Received update request for:", { imageId, objectId });

  try {
    const updatedImage = await catalogService.updateCatalogImage(
      imageId, objectId, idempotencyKey, req.file.path
    );
    res.status(200).json(updatedImage);
  } catch (error) {
    console.error('Error updating catalog image:', error);
    res.status(500).json({ error: error.message });
  }
});



// Route for creating a new catalog item.
router.post('/create-catalog', async (req, res) => {
  // Receives data for a new catalog item, calls the service to create it, and handles the JSON response and errors. 
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


// Route for deleting a catalog item by ID.
router.delete('/delete/:itemId', async (req, res) => {
  // Calls the catalog service to delete an item by ID and returns the result or error.
  try {
    const itemId = req.params.itemId;
    const deletedItem = await catalogService.deleteCatalogItem(itemId);
    console.log("Deleted item ID:", deletedItem.id);
    res.status(200).json({ deleted_object_ids: [deletedItem.id] }); // Ensure an array is returned
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete catalog item' });
  }
});


// Route for searching catalog items based on a query string.
router.get('/search', async (req, res) => {
  // Processes a search request, using the catalog service to find items and return them with proper serialization.
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



// Route for retrieving detailed information on a single catalog item. 
router.get('/search-item/:itemId', async (req, res) => {
 // Fetches detailed catalog item information, including image data if available, and handles responses and errors.
  try {
    const itemId = req.params.itemId;
    console.log("Fetching catalog item with ID:", itemId); // Log the item ID being fetched
    const item = await catalogService.getCatalogItem(itemId);

    // Convert BigInt values to strings
    const itemWithConvertedBigInts = JSON.parse(JSON.stringify(item, (_, v) => 
      typeof v === 'bigint' ? v.toString() : v));

    res.json(itemWithConvertedBigInts); // Send the converted item
  } catch (error) {
    console.error("Error fetching catalog item:", error); // Log the error
    res.status(500).json({ error: 'Failed to get catalog item' });
  }
});



// Route for listing all catalog items.
router.get('/list', async (req, res) => {
  // Calls the catalogService to fetch all items available in the catalog. This might include additional metadata or associated images depending on the implementation in the service layer.
  try {
      const items = await catalogService.listItems();  // Retrieves all catalog items including their image links if applicable.
      res.json(items);  // Responds with the list of items in JSON format, ensuring all items are properly serialized and suitable for client consumption.
  } catch (error) {
      console.error("Failed to retrieve inventory", error);  // Logs any errors that occur during the fetch operation.
      res.status(500).json({ error: 'Failed to retrieve inventory' });  // Returns an error response indicating that the inventory could not be retrieved.
  }
});


// Additional routes for listing all items or handling bulk operations might also be included.
module.exports = router;
