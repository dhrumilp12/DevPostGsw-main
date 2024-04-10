// catalogService.js
const crypto = require('crypto'); // For generating idempotency keys
const { catalogApi } = require('../api/squareClient');
const { inventoryApi} = require('../api/squareClient');
const axios = require('axios');


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
  
  
  

  async function updateCatalogItem(itemId, itemData) {
    try {
      // Extract the actual item data from the nested 'object' property if it exists
      const actualItemData = itemData.object ? itemData.object.item_data : itemData;
  
      // Fetch the latest version number
      const { result: { object } } = await catalogApi.retrieveCatalogObject(itemId);
      const latestVersion = object.version;
  
      // Provide a default name if missing
      actualItemData.name = actualItemData.name || 'Unnamed Item';
  
      // Ensure variations is an array
      const variations = Array.isArray(actualItemData.variations) ? actualItemData.variations : [];
  
      // Update the item with the latest version number
      const response = await catalogApi.upsertCatalogObject({
        idempotencyKey: crypto.randomUUID().toString(),
        object: {
          type: 'ITEM',
          id: itemId,
          version: latestVersion,
          itemData: {
            name: actualItemData.name,
            description: actualItemData.description,
            variations: variations.map(variation => ({
              type: 'ITEM_VARIATION',
              id: variation.id,
              itemVariationData: {
                name: variation.name,
                pricingType: variation.pricingType,
                priceMoney: variation.priceMoney,
              },
            })),
          },
        },
      });
  
      return response.result.catalogObject;
    } catch (error) {
      console.error("Failed to update catalog item:", itemId, error);
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
      console.log("result:",response.result.object)
      return response.result.object;
    } catch (error) {
      console.error("Failed to fetch catalog item:", itemId, error);
      throw error;
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

async function uploadCatalogImage(itemId, imageBuffer, imageName) {
  const base64Image = imageBuffer.toString('base64');
  const requestBody = {
    idempotencyKey: crypto.randomUUID().toString(),
    object: {
      type: 'IMAGE',
      id: '#tempImageId',
      image_data: {
        name: imageName,
        url: '',
        data: base64Image,
      }
    }
  };

  try {
    await axiosInstance.post('/upsert', requestBody);
    return linkImageToCatalogItem(itemId, '#tempImageId');
  } catch (error) {
    console.error("Failed to upload catalog image:", error);
    throw error;
  }
}


async function linkImageToCatalogItem(itemId, imageId) {
  const linkRequestBody = {
    idempotencyKey: crypto.randomUUID().toString(),
    object: {
      type: 'ITEM',
      id: itemId,
      image_ids: [imageId]
    }
  };

  try {
    const response = await axiosInstance.post('/upsert', linkRequestBody);
    return response.data;
  } catch (error) {
    console.error("Failed to link catalog image:", error);
    throw error;
  }
}

// Function to update an existing catalog item image
async function updateCatalogImage(itemId, imageBuffer, imageName) {
  // This function can be identical to uploadCatalogImage, or include additional logic for handling updates
  return await uploadCatalogImage(itemId, imageBuffer, imageName);
}


// ... Add other Catalog API interactions as needed 

module.exports = {
  createCatalogItem,
  updateCatalogItem,//error
  deleteCatalogItem,
  searchCatalogItems,
  getCatalogItem,
  listItems,
  uploadCatalogImage,
  updateCatalogImage
};
