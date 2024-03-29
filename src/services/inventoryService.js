const { inventoryApi } = require('../api/squareClient');

async function listInventoryItems() {
    try {
        const response = await inventoryApi.listInventoryCounts();
        return response.result.counts || [];
    } catch (error) {
        console.error("Failed to list inventory items:", error);
        if (error.response && error.response.errors) {
            // Improved error messaging for the frontend
            throw new Error(error.response.errors.map(e => e.detail).join('; '));
          } 
      
          throw error; // Re-throw for handling upstream
        }
      }


module.exports = {
    listInventoryItems
};
