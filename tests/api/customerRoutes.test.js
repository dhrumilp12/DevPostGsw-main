// customerRoutes.test.js
jest.mock('../../src/api/squareClient'); // Mock the squareClient
const { customersApi } = require('../../src/api/squareClient');
const request = require('supertest');
const express = require('express');
const customerRoutes = require('../../src/api/customerRoutes');

const app = express();
app.use(express.json());
app.use('/customerRoutes', customerRoutes); // Prepend the routes with '/customerRoutes'

describe('Customer Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    customersApi.listCustomers.mockResolvedValue({ customers: [{ id: 'c123', name: 'Test Customer' }] });
    customersApi.retrieveCustomer.mockResolvedValue({ customer: { id: 'c123', name: 'Test Customer' } });
    customersApi.createCustomer.mockResolvedValue({ customer: { id: 'c123', name: 'New Customer' } });
    customersApi.updateCustomer.mockResolvedValue({ customer: { id: 'c123', name: 'Updated Customer' } });
  });

  it('should list all customers', async () => {
    const response = await request(app).get('/customerRoutes/list-customers');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ id: 'c123', name: 'Test Customer' }]);
  });

  it('should get customer details', async () => {
    const response = await request(app).get('/customerRoutes/customer-details/c123');
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 'c123', name: 'Test Customer' });
  });

  it('should create a customer', async () => {
    const customerData = { name: 'New Customer', email: 'new@example.com' };
    const response = await request(app).post('/customerRoutes/create-customer').send(customerData);
    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ id: 'c123', name: 'New Customer' });
  });

  it('should update a customer', async () => {
    const customerData = { name: 'Updated Customer', email: 'updated@example.com' };
    const response = await request(app).put('/customerRoutes/update-customer/c123').send(customerData);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ id: 'c123', name: 'Updated Customer' });
  });

  // New Test Case
  it('responds with 404 when the customer does not exist', async () => {
    // Setup the customersApi mock to simulate a nonexistent customer
    customersApi.retrieveCustomer.mockRejectedValue({
      response: {
        status: 404,
        data: {
          errors: [{ category: 'INVALID_REQUEST_ERROR', code: 'NOT_FOUND', detail: 'Customer does not exist.' }]
        }
      }
    });
    
    // Make the GET request for a nonexistent customer
    const response = await request(app).get('/customerRoutes/customer-details/nonexistent_id');
    
    // Assert that a 404 status code is returned
    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Customer does not exist.');
  });
});
