jest.mock('../../src/api/squareClient', () => ({
    inventoryApi: {
      listInventoryCounts: jest.fn().mockResolvedValue({
        result: {
          counts: [{ id: 'item1', quantity: 10 }, { id: 'item2', quantity: 5 }],
        },
      }),
      batchChangeInventory: jest.fn().mockResolvedValue({
        result: {
          counts: [{ id: 'item1', quantity: 5 }],
        },
      }),
      retrieveInventoryCount: jest.fn().mockResolvedValue({
        count: { quantity: 10 },
      }),
      batchRetrieveInventoryCounts: jest.fn().mockResolvedValue({
        counts: [{ quantity: 10 }, { quantity: 5 }],
      }),
      transferInventory: jest.fn().mockResolvedValue({
        result: { success: true },
      }),
    },
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
  
    it('should handle errors from the Square API', async () => {
      inventoryApi.listInventoryCounts.mockRejectedValueOnce(new Error('API Error'));
      await expect(inventoryService.listInventoryItems()).rejects.toThrow('API Error');
    });
  
    describe('Inventory Service - Adjust Inventory Count', () => {
      it('should adjust inventory count for an item', async () => {
        const itemId = 'item1';
        const quantityChange = 5;
        const mockAdjustment = {
          fromState: 'IN_STOCK',
          toState: 'SOLD',
          quantity: `-${quantityChange}`,
          locationId: 'location1',
        };
  
        inventoryApi.batchChangeInventory.mockResolvedValue({
          result: { counts: [{ id: itemId, quantity: 5 }] },
        });
  
        const result = await inventoryService.adjustInventoryCount(itemId, mockAdjustment);
  
        expect(result).toEqual([{ id: itemId, quantity: 5 }]);
        expect(inventoryApi.batchChangeInventory).toHaveBeenCalledWith({
          changes: [
            {
              type: 'ADJUSTMENT',
              adjustment: mockAdjustment,
            },
          ],
        });
      });
    });
  
    describe('Inventory Service - Get Inventory Count', () => {
      it('should retrieve inventory count for a specific item', async () => {
        const itemId = 'item1';
        inventoryApi.retrieveInventoryCount.mockResolvedValue({ count: { quantity: 10 } });
  
        const count = await inventoryService.getInventoryCount(itemId);
  
        expect(count).toEqual({ quantity: 10 });
        expect(inventoryApi.retrieveInventoryCount).toHaveBeenCalledWith(itemId);
      });
    });
  
    describe('Inventory Service - Batch Retrieve Inventory Counts', () => {
      it('should batch retrieve inventory counts for multiple items', async () => {
        const itemIds = ['item1', 'item2'];
        inventoryApi.batchRetrieveInventoryCounts.mockResolvedValue({
          counts: [{ quantity: 10 }, { quantity: 5 }],
        });
  
        const counts = await inventoryService.batchRetrieveInventoryCounts(itemIds);
  
        expect(counts).toEqual([{ quantity: 10 }, { quantity: 5 }]);
        expect(inventoryApi.batchRetrieveInventoryCounts).toHaveBeenCalledWith({ catalogObjectIds: itemIds });
      });
    });
  
    describe('Inventory Service - Batch Adjust Inventory Counts', () => {
      it('should batch adjust inventory counts for multiple items', async () => {
        const changes = [
          { type: 'ADJUSTMENT', adjustment: { quantity: -5, catalogObjectId: 'item1' } },
          { type: 'ADJUSTMENT', adjustment: { quantity: 3, catalogObjectId: 'item2' } },
        ];
        inventoryApi.batchChangeInventory.mockResolvedValue({
          counts: [{ quantity: 5 }, { quantity: 8 }],
        });
  
        const counts = await inventoryService.batchAdjustInventoryCounts(changes);
  
        expect(counts).toEqual([{ quantity: 5 }, { quantity: 8 }]);
        expect(inventoryApi.batchChangeInventory).toHaveBeenCalledWith({ changes });
      });
    });
  
    describe('Inventory Service - Transfer Inventory', () => {
      it('should transfer inventory between locations', async () => {
        const itemId = 'item1';
        const fromLocationId = 'location1';
        const toLocationId = 'location2';
        const quantity = 5;
        inventoryApi.transferInventory.mockResolvedValue({ result: { success: true } });
  
        const result = await inventoryService.transferInventory(itemId, fromLocationId, toLocationId, quantity);
  
        expect(result).toEqual({ success: true });
        expect(inventoryApi.transferInventory).toHaveBeenCalledWith({
          fromLocationId,
          toLocationId,
          quantity,
          catalogObjectId: itemId,
        });
      });
    });
  });
  