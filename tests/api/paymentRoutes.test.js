// paymentRoutes.test.js
jest.mock('../../src/services/paymentService'); // Mock the paymentService

const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../../src/api/paymentRoutes');
const paymentService = require('../../src/services/paymentService');



const app = express();
app.use(express.json());
app.use('/api/paymentRoutes', paymentRoutes);

describe('Payment Routes', () => {
  const validNonce = 'fake-card-nonce-ok';
  const validAmount = { amount: 1000, currency: 'USD' };
  

  beforeAll(() => {
  paymentService.processPayment.mockResolvedValue({ id: 'p123', status: 'COMPLETED' });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should process a payment successfully', async () => {
    const response = await request(app)
      .post('/api/paymentRoutes/process-payment')
      .send({ nonce: validNonce, amount: validAmount.amount });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', 'p123');
  });

  it('should return 400 for invalid request body', async () => {
    const invalidBody = { nonce: validNonce }; // Missing amount
    const response = await request(app)
      .post('/api/paymentRoutes/process-payment')
      .send(invalidBody);
  
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
  
  it('should handle service errors', async () => {
    const nonce = 'test_nonce';
    const amount = 1000;
    // Mock the service to throw an error
    paymentService.processPayment.mockRejectedValue(new Error('Service error'));
    const response = await request(app)
      .post('/api/paymentRoutes/process-payment')
      .send({ nonce, amount });
  
    expect(response.statusCode).toBe(500);
    expect(response.body).toHaveProperty('error', 'Service error');
  });
  
  // ... Add more tests as needed for other routes and scenarios
});

