// customerRoutes.test.js
jest.mock('../../src/services/customerService'); // Mock the customerService

const request = require('supertest');
const express = require('express');
const customerRoutes = require('../../src/api/customerRoutes');
const customerService = require('../../src/services/customerService');



const app = express();
app.use(express.json());
app.use('/customers', customerRoutes); // Prepend the routes with '/customers'

describe('Customer Routes', () => {
  // Define test data
  const customerData = { name: 'John Doe', email: 'john.doe@example.com' };
  const customerId = 'c123';

  // Mock service implementation
  beforeEach(() => {
  customerService.createCustomer.mockResolvedValue({ id: customerId, ...customerData });
  customerService.getCustomerDetails.mockResolvedValue({ id: customerId, ...customerData });
  customerService.updateCustomer.mockResolvedValue({ id: customerId, ...customerData });
  customerService.listCustomers.mockResolvedValue([{ id: customerId, ...customerData }]);
  });

  

  it('should create a customer', async () => {
    const response = await request(app)
      .post('/customers/create-customer')
      .send(customerData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', customerId);
  });

  it('should get customer details', async () => {
    const response = await request(app)
      .get(`/customers/customer-details/${customerId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', customerId);
  });

  it('should update a customer', async () => {
    const updatedCustomerData = { email: 'newemail@example.com' };
    const response = await request(app)
      .put(`/customers/customer-details/${customerId}`)
      .send(updatedCustomerData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', customerId);
  });

  it('should list all customers', async () => {
    const response = await request(app)
      .get('/customers/list-customers');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBeTruthy();
    expect(response.body[0]).toHaveProperty('id', customerId);
  });
});
