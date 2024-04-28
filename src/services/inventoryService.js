// inventoryService.js handles inventory data interactions, such as retrieving and updating stock levels.
const crypto = require('crypto'); // For generating idempotency keys
const { inventoryApi } = require('../api/squareClient');


// Retrieve inventory counts for specified item IDs.
async function batchRetrieveInventoryCounts(itemIds) {
    // Calls external API to get current inventory levels for a list of item IDs, handles API errors and data format.
    try {
        const response = await inventoryApi.batchRetrieveInventoryCounts({ catalogObjectIds: itemIds });
        return response.result.counts || [];
    } catch (error) {
        console.error("Failed to batch retrieve inventory counts:", error);
        throw error;
    }
}

// Adjust inventory counts based on specified changes.
async function batchChangeInventory(changes, locationId) {
    // Submits inventory adjustments to the API and handles the response, including error management and confirmation of changes.
    try {
        const response = await inventoryApi.batchChangeInventory({
            idempotencyKey: crypto.randomUUID(),
            changes: changes.map(change => {
                const isIncrease = change.adjustment.quantity >= 0;
                return {
                    ...change,
                    adjustment: {
                        ...change.adjustment,
                        fromState: isIncrease ? 'NONE' : 'IN_STOCK',
                        toState: isIncrease ? 'IN_STOCK' : 'SOLD',
                        locationId: locationId,
                        quantity: Math.abs(change.adjustment.quantity).toString(),
                        occurredAt: new Date().toISOString() // Add the occurredAt field
                    }
                };
            })
        });
        return response.result.counts || [];
    } catch (error) {
        console.error("Failed to batch change inventory:", error);
        throw error;
    }
}

// Export inventory management functions.
module.exports = {
    batchRetrieveInventoryCounts,
    batchChangeInventory
};
