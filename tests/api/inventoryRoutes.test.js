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

const request = require('supertest');
const express = require('express');
const inventoryRoutes = require('../../src/api/inventoryRoutes');
const { inventoryApi } = require('../../src/api/squareClient');



const app = express();
app.use(express.json());
app.use('/inventoryRoutes', inventoryRoutes);

describe('Inventory Routes', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should list inventory items', async () => {
      const mockInventoryData = [{ id: 'item1', quantity: 5 }, { id: 'item2', quantity: 10 }];
      inventoryApi.listInventoryCounts.mockResolvedValue({ result: { counts: mockInventoryData } });

      const response = await request(app).get('/inventoryRoutes');

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(mockInventoryData);
  });

    it('should adjust inventory count', async () => {
        const itemId = 'item1';
        const adjustment = { quantity: -5, fromState: 'IN_STOCK', toState: 'SOLD', locationId: 'location1' };
        inventoryApi.batchChangeInventory.mockResolvedValue({ result: { counts: [{ id: itemId, quantity: 5 }] } });

        const response = await request(app).post('/inventoryRoutes/adjust').send({ itemId, adjustment });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ id: itemId, quantity: 5 }]);
        expect(inventoryApi.batchChangeInventory).toHaveBeenCalledWith({
            changes: [
                {
                    type: 'ADJUSTMENT',
                    adjustment,
                },
            ],
        });
    });

    it('should retrieve inventory count for a specific item', async () => {
        const itemId = 'item1';
        inventoryApi.retrieveInventoryCount.mockResolvedValue({ count: { quantity: 10 } });

        const response = await request(app).get(`/inventoryRoutes/${itemId}`);

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ quantity: 10 });
        expect(inventoryApi.retrieveInventoryCount).toHaveBeenCalledWith(itemId);
    });

    it('should batch retrieve inventory counts for multiple items', async () => {
        const itemIds = ['item1', 'item2'];
        inventoryApi.batchRetrieveInventoryCounts.mockResolvedValue({ counts: [{ quantity: 10 }, { quantity: 5 }] });

        const response = await request(app).post('/inventoryRoutes/batch-retrieve').send({ itemIds });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ quantity: 10 }, { quantity: 5 }]);
        expect(inventoryApi.batchRetrieveInventoryCounts).toHaveBeenCalledWith({ catalogObjectIds: itemIds });
    });

    it('should batch adjust inventory counts for multiple items', async () => {
        const changes = [
            { type: 'ADJUSTMENT', adjustment: { quantity: -5, catalogObjectId: 'item1' } },
            { type: 'ADJUSTMENT', adjustment: { quantity: 3, catalogObjectId: 'item2' } },
        ];
        inventoryApi.batchChangeInventory.mockResolvedValue({ counts: [{ quantity: 5 }, { quantity: 8 }] });

        const response = await request(app).post('/inventoryRoutes/batch-adjust').send({ changes });

        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual([{ quantity: 5 }, { quantity: 8 }]);
        expect(inventoryApi.batchChangeInventory).toHaveBeenCalledWith({ changes });
    });

    it('should transfer inventory between locations', async () => {
      const itemId = 'item1';
      const fromLocationId = 'location1';
      const toLocationId = 'location2';
      const quantity = 5;
      inventoryApi.transferInventory.mockResolvedValue({ result: { success: true } });

      const response = await request(app).post('/inventoryRoutes/transfer').send({ itemId, fromLocationId, toLocationId, quantity });

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({ success: true });
      expect(inventoryApi.transferInventory).toHaveBeenCalledWith({
          fromLocationId,
          toLocationId,
          quantity,
          catalogObjectId: itemId,
      });
  });
});