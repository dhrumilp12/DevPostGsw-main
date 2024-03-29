jest.mock('../../src/api/squareClient', () => ({
    inventoryApi: {
        listInventoryCounts: jest.fn().mockResolvedValue({
          result: {
               counts: [{ id: 'item1', quantity: 10 }, { id: 'item2', quantity: 0 }]
          }
        })
    }
}));
const { inventoryApi } = require('../../src/api/squareClient');
const inventoryService = require('../../src/services/inventoryService');

describe('Inventory Service', () => {
    it('should list inventory items', async () => {
        const mockItems = [{ id: 'item1', quantity: 10 }];
        inventoryApi.listInventoryCounts.mockResolvedValue({ result: { counts: mockItems } });

        const items = await inventoryService.listInventoryItems();
        expect(items).toEqual(mockItems);
        expect(inventoryApi.listInventoryCounts).toHaveBeenCalled();
    });
    it('should return an empty array when inventory is empty', async () => {
        inventoryApi.listInventoryCounts.mockResolvedValueOnce({ result: {} }); 
        const items = await inventoryService.listInventoryItems();
        expect(items).toEqual([]);
    });
    
    // Test for Square API error
    it('should handle errors from the Square API', async () => { 
        inventoryApi.listInventoryCounts.mockRejectedValueOnce(new Error('API Error'));
        await expect(inventoryService.listInventoryItems()).rejects.toThrow('API Error');
    });
});
