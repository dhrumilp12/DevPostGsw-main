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
    async function adjustInventoryCount(itemId, adjustment) {
        const response = await inventoryApi.batchChangeInventory({
          changes: [
            {
              type: 'ADJUSTMENT',
              adjustment,
            },
          ],
        });
        return response.result.counts;
      }
      
    async function getInventoryCount(itemId) {
        try {
            const response = await inventoryApi.retrieveInventoryCount(itemId);
            return response.count;
        } catch (error) {
            console.error("Failed to retrieve inventory count for item:", error);
            throw error;
        }
    }
    async function batchRetrieveInventoryCounts(itemIds) {
        try {
            const response = await inventoryApi.batchRetrieveInventoryCounts({ catalogObjectIds: itemIds });
            return response.counts;
        } catch (error) {
            console.error("Failed to batch retrieve inventory counts:", error);
            throw error;
        }
    }
    async function batchAdjustInventoryCounts(changes) {
        try {
            const response = await inventoryApi.batchChangeInventory({ changes });
            return response.counts;
        } catch (error) {
            console.error("Failed to batch adjust inventory counts:", error);
            throw error;
        }
    }
    async function transferInventory(itemId, fromLocationId, toLocationId, quantity) {
        try {
            const response = await inventoryApi.transferInventory({
                fromLocationId,
                toLocationId,
                quantity,
                catalogObjectId: itemId
            });
            return response.result;
        } catch (error) {
            console.error("Failed to transfer inventory:", error);
            throw error;
        }
    }
    async function searchInventoryItems(query) {
        try {
            const response = await inventoryApi.searchCatalogItems(query);
            return response.items || [];
        } catch (error) {
            console.error("Failed to search inventory items:", error);
            throw error;
        }
    }
    async function updateInventoryItem(itemId, itemData) {
        try {
            const response = await inventoryApi.updateCatalogItem(itemId, itemData);
            return response.item;
        } catch (error) {
            console.error("Failed to update inventory item:", error);
            throw error;
        }
    }
    async function deleteInventoryItem(itemId) {
        try {
            await inventoryApi.deleteCatalogObject(itemId);
        } catch (error) {
            console.error("Failed to delete inventory item:", error);
            throw error;
        }
    }
module.exports = {
  listInventoryItems,
  adjustInventoryCount,
  getInventoryCount,
  batchRetrieveInventoryCounts,
  batchAdjustInventoryCounts,
  transferInventory,
  searchInventoryItems,
  updateInventoryItem,
  deleteInventoryItem
};
