jest.mock('../../src/api/squareClient', () => ({
  inventoryApi: {
      listInventoryCounts: jest.fn()
  }
}));
const request = require('supertest');
const express = require('express');
const inventoryRoutes = require('../../src/api/inventoryRoutes');
const { inventoryApi } = require('../../src/api/squareClient'); 
const { beforeEach } = require('node:test');


const app = express();
app.use(express.json());
app.use('/inventoryRoutes', inventoryRoutes);

beforeEach(() => {
  jest.resetModules();
  });

describe('Inventory Routes', () => {
  
  it('should list inventory items', async () => {
    const mockInventoryData =  [{ id: 'item1', quantity: 5 }, { id: 'item2', quantity: 10 }];

    // Correct usage: Apply to the mock function
    inventoryApi.listInventoryCounts.mockResolvedValue({ result: { counts: mockInventoryData } }); 

    const response = await request(app).get('/inventoryRoutes');

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual(mockInventoryData);  
  });

  it('should handle errors and return a 500 status', async () => {
    // Correct usage: Apply to the mock function
    inventoryApi.listInventoryCounts.mockRejectedValue(new Error('API Error'));

    const response = await request(app).get('/inventoryRoutes');

    expect(response.statusCode).toBe(500);
    expect(response.body.error).toEqual('Failed to retrieve inventory');
  });
});
