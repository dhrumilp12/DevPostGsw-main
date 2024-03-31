jest.mock('../../src/api/squareClient');
const { customersApi } = require('../../src/api/squareClient');
const request = require('supertest');
const express = require('express');
const customerRoutes = require('../../src/api/customerRoutes');

const app = express();
app.use(express.json());
app.use('/customerRoutes', customerRoutes);

describe('Customer Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    customersApi.listCustomers.mockResolvedValue({
      result: { customers: [{ id: 'c123', name: 'Test Customer', version: 0n }] }
    });
    customersApi.retrieveCustomer.mockResolvedValue({
      result: { customer: { id: 'c123', name: 'Test Customer', version: 0n } }
    });
    customersApi.createCustomer.mockResolvedValue({
      result: { customer: { id: 'c123', name: 'New Customer', version: 0n } }
    });
    customersApi.updateCustomer.mockResolvedValue({
      result: { customer: { id: 'c123', name: 'Updated Customer', version: 0n } }
    });
  });

  it('should list all customers', async () => {
    const response = await request(app).get('/customerRoutes/list-customers');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 'c123', name: 'Test Customer', version: '0' }]);
  });

  it('should get customer details', async () => {
    const response = await request(app).get('/customerRoutes/customer-details/c123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 'c123', name: 'Test Customer', version: '0' });
  });

  it('should create a customer', async () => {
    const customerData = { name: 'New Customer', email: 'new@example.com' };
    const response = await request(app).post('/customerRoutes/create-customer').send(customerData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 'c123', name: 'New Customer', version: '0' });
  });

  it('should update a customer', async () => {
    const customerData = { name: 'Updated Customer', email: 'updated@example.com' };
    const response = await request(app).put('/customerRoutes/update-customer/c123').send(customerData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 'c123', name: 'Updated Customer', version: '0' });
  });
});
