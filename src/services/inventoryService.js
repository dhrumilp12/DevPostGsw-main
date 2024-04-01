const { inventoryApi } = require('../api/squareClient');

async function listInventoryItems() {
    try {
        const response = await inventoryApi.listInventoryCounts();
        return response.result.counts || [];
    } catch (error) {
        console.error("Failed to list inventory items:", error);
        throw error;
    }
}

async function adjustInventoryCount(itemId, adjustment) {
    try {
        const response = await inventoryApi.batchChangeInventory({
            changes: [
                {
                    type: 'ADJUSTMENT',
                    adjustment: {
                        catalogObjectId: itemId,
                        quantity: adjustment
                    }
                }
            ]
        });
        return response.result.counts || [];
    } catch (error) {
        console.error("Failed to adjust inventory count:", error);
        throw error;
    }
}

async function getInventoryCount(itemId) {
    try {
        const response = await inventoryApi.retrieveInventoryCount({ catalogObjectId: itemId });
        return response.result.count || {};
    } catch (error) {
        console.error("Failed to retrieve inventory count for item:", error);
        throw error;
    }
}

async function batchRetrieveInventoryCounts(itemIds) {
    try {
        const response = await inventoryApi.batchRetrieveInventoryCounts({ catalogObjectIds: itemIds });
        return response.result.counts || [];
    } catch (error) {
        console.error("Failed to batch retrieve inventory counts:", error);
        throw error;
    }
}

async function batchAdjustInventoryCounts(changes) {
    try {
        const response = await inventoryApi.batchChangeInventory({ changes });
        return response.result.counts || [];
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
        return response.result || {};
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

async function createInventoryItem(itemData) {
    try {
        const response = await inventoryApi.createCatalogObject({
            type: 'ITEM',
            itemData: itemData
        });
        return response.object;
    } catch (error) {
        console.error("Failed to create inventory item:", error);
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
    createInventoryItem,
    deleteInventoryItem
};
