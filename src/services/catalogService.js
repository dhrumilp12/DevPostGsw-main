// catalogService.js
const crypto = require('crypto'); // For generating idempotency keys
const { catalogApi } = require('../api/squareClient');

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
  

// ... Add other Catalog API interactions as needed 

module.exports = {
  createCatalogItem,
  updateCatalogItem,//error
  deleteCatalogItem,
  searchCatalogItems,
  getCatalogItem,
};
