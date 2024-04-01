const crypto = require('crypto'); // For generating idempotency keys
const { inventoryApi } = require('../api/squareClient');

async function batchRetrieveInventoryCounts(itemIds) {
    try {
        const response = await inventoryApi.batchRetrieveInventoryCounts({ catalogObjectIds: itemIds });
        return response.result.counts || [];
    } catch (error) {
        console.error("Failed to batch retrieve inventory counts:", error);
        throw error;
    }
}

async function batchChangeInventory(changes, locationId) {
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


module.exports = {
    batchRetrieveInventoryCounts,
    batchChangeInventory
};
