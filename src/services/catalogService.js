// catalogService.js
const crypto = require('crypto'); // For generating idempotency keys
const { catalogApi } = require('../api/squareClient');
const { inventoryApi} = require('../api/squareClient');
const fs = require('fs');
const FormData = require('form-data');
const { axiosInstance } = require('../api/squareClient');
const path = require('path');
const axios = require('axios');
const { ApiError } = require('square');

async function createCatalogItem(itemData) {
    try {
      const response = await catalogApi.upsertCatalogObject({
        idempotencyKey: crypto.randomUUID().toString(),
        object: {
          type: 'ITEM',
          id: '#your-item-id',
          itemData: {
            name: itemData.name,
            description: itemData.description,
            variations: itemData.variations.map(variation => ({
              type: 'ITEM_VARIATION',
              id: '#' + variation.name.toLowerCase().replace(/\s+/g, '-'),
              itemVariationData: {
                name: variation.name,
                pricingType: variation.pricingType,
                priceMoney: variation.priceMoney,
              },
            })),
          },
        },
      });
  
      if (!response.result.catalogObject) {
        throw new Error('API response does not contain the expected catalog object');
      }
  
      return response.result.catalogObject; // Return the catalog object
    } catch (error) {
      console.error("Failed to create catalog item:", error);
      throw error;
    }
  }
    

  async function deleteCatalogItem(itemId) {
    try {
      await catalogApi.deleteCatalogObject(itemId);
      return { id: itemId }; // Return the ID of the deleted item
    } catch (error) {
      console.error("Failed to delete catalog item:", itemId, error);
      throw error; 
    }
  }
  

async function searchCatalogItems(query) {
    try {
      // Check if query is undefined, empty, or too short 
    if (typeof query === 'undefined' || query.trim() === '' || query.trim().length < 2) {
        throw new Error('Query parameter is required and must be at least two characters long.');
      }
  
      const response = await catalogApi.searchCatalogObjects({
        objectTypes: ['ITEM'], // May want to search other object types
        query: {
          textQuery: {
            keywords: [query], // query is now an array element
          },
        },
      });
      return response.result.objects || []; 
    } catch (error) {
      console.error("Failed to search catalog items:", error);
      throw error; 
    }
  }
  
  

  async function getCatalogItem(itemId) {
    try {
      const response = await catalogApi.retrieveCatalogObject(itemId, true);
      
      // Check if the API call was successful and the object was returned
      if (!response || !response.result || !response.result.object) {
        console.error(`No catalog object returned for ID: ${itemId}`);
        throw new Error(`Catalog object with ID '${itemId}' not found.`);
      }
  
      // Assuming you want to include image information if it exists
      const item = response.result.object;
      const imageId = item.imageIds?.[0];
  
      if (imageId) {
        // Fetch the image data using the image ID
        const imageResponse = await catalogApi.retrieveCatalogObject(imageId, true);
        const imageUrl = imageResponse.result.object.imageData.url;
        // Append the imageUrl to the item object
        item.imageUrl = imageUrl;
      } else {
        // Assuming potential extensions could be .png, .jpg, .jpeg
        const uploadsDir = path.join(__dirname, '../uploads');
        const possibleExtensions = ['.png', '.jpg', '.jpeg'];

            // Find the first existing image file
            const existingFile = possibleExtensions.find(ext => 
                fs.existsSync(path.join(uploadsDir, `${itemId}${ext}`))
            );

            if (existingFile) {
                item.imageUrl = `http://localhost:3000/uploads/${itemId}${existingFile}`;
            } else {
                item.imageUrl = null; // or set a default placeholder image URL
            }
        }
  
      console.log(item);
      return item;
    } catch (error) {
      console.error(`Failed to fetch catalog item: ${itemId}`, error);
      if (error instanceof ApiError && error.statusCode === 404) {
        throw new Error(`Catalog object with ID '${itemId}' not found.`);
      }
      throw new Error('Failed to get catalog item');
    }
  }


  

// catalogService.js
// ... other catalogService functions ...

async function listItems() {
  try {
    // Search for item variations and get their IDs
    console.log("Listing catalog item variations");
    const searchResponse = await catalogApi.searchCatalogObjects({
      objectTypes: ['ITEM_VARIATION']
    });

    console.log("Search response:", searchResponse.result.objects); 

    const variationIds = searchResponse.result.objects.map(variation => variation.id);
    console.log("Variation IDs:", variationIds); 

    // Check for empty inventory before proceeding
    if (variationIds.length === 0) {
      console.warn('No item variations found.');
      return []; 
    }

    // Retrieve inventory counts with logging for debugging
    console.log("Fetching inventory counts for variation IDs:", variationIds);
    const response = await inventoryApi.batchRetrieveInventoryCounts({
      catalogObjectIds: variationIds
    });

    console.log("Inventory counts response:", response.result); 

    // Convert any potential BigInt values to strings
    const countsWithConvertedBigInts = JSON.parse(JSON.stringify(response.result.counts || [], (_, v) =>
      typeof v === 'bigint' ? v.toString() : v));
    
    return countsWithConvertedBigInts;
  } catch (error) {
    console.error("Failed to list inventory items:", error);
    throw error; 
  }
}


async function createCatalogImage(idempotencyKey, objectId, imagePath) {
  console.log(`Uploading image from path: ${imagePath}`);
  if (!fs.existsSync(imagePath)) {
    console.error(`Image file not found at path: ${imagePath}`);
    throw new Error(`Image file not found at path: ${imagePath}`);
  }

  // Determine the content type dynamically
  const mimeType = path.extname(imagePath) === '.png' ? 'image/png' :
                   path.extname(imagePath) === '.jpg' ? 'image/jpeg' : 
                   'application/octet-stream';  // Default fallback

  const formData = new FormData();
  formData.append('image', fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
    contentType: mimeType // Ensure content type matches your file type
  });
  formData.append('request', JSON.stringify({
    idempotency_key: idempotencyKey,
    object_id: objectId,
    image: {
      type: 'IMAGE',
      id: '#temp-image-id',
      image_data: {
        caption: 'A descriptive caption' // Optional
      }
    }
  }), {
    contentType: 'application/json'
  });

  const config = {
    headers: {
      ...formData.getHeaders(),
      'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
      'Accept': 'application/json'
    }
  };

  try {
    const response = await axios.post('https://connect.squareup.com/v2/catalog/images', formData, config);
    console.log('Catalog image created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to create catalog image:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    throw error;
  }
}


// Function to update a catalog image
async function updateCatalogImage(imageId, objectId, idempotencyKey, imagePath) {
  console.log(`Updating image from path: ${imagePath}`);
  console.log("Params received:", { imageId, objectId, idempotencyKey });
  if (!fs.existsSync(imagePath)) {
    console.error(`Image file not found at path: ${imagePath}`);
    throw new Error(`Image file not found at path: ${imagePath}`);
  }

  // Determine the content type dynamically
  const mimeType = path.extname(imagePath) === '.png' ? 'image/png' :
                   path.extname(imagePath) === '.jpg' ? 'image/jpeg' : 
                   'application/octet-stream';  // Default fallback

  const formData = new FormData();
  formData.append('image', fs.createReadStream(imagePath), {
    filename: path.basename(imagePath),
    contentType: mimeType  // Use the dynamically determined content type
  });
  formData.append('request', JSON.stringify({
    object_id: objectId, // Use objectId here for consistency
    idempotency_key: idempotencyKey,
    
    image: {
      type: 'IMAGE',
      id: imageId, // Reuse imageId for updating the correct image
      image_data: {
        caption: 'Updated image caption' // Optional, change as needed
      }
    }
  }), {
    contentType: 'application/json'
  });

  const config = {
    headers: {
      ...formData.getHeaders(),
      'Authorization': `Bearer ${process.env.PRODUCTION_ACCESS_TOKEN}`,
      'Accept': 'application/json'
    }
  };
  console.log("Updating with:", { imageId, objectId, idempotencyKey });
  try {
    const response = await axios.put(`https://connect.squareup.com/v2/catalog/images/${imageId}`, formData, config);
    console.log('Catalog image updated:', response.data);
    return response.data;
  } catch (error) {
    console.error('Failed to update catalog image:', error);
    if (error.response) {
      console.error('Error response data:', error.response.data);
    }
    throw error;
  }
}


module.exports = {
  createCatalogItem,
  deleteCatalogItem,
  searchCatalogItems,
  getCatalogItem,
  listItems,
  createCatalogImage,
  updateCatalogImage
};
