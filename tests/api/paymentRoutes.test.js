const request = require('supertest');
const express = require('express');
const paymentRoutes = require('../../src/api/paymentRoutes.js');
const paymentService = require('../../src/services/paymentService.js');

jest.mock('../../src/services/paymentService');

const app = express();
app.use(express.json());
app.use(paymentRoutes);

describe('/process-payment', () => {
  it('responds to successful payment', async () => {
    paymentService.processPayment.mockResolvedValue({ id: '123', status: 'success' });

    const response = await request(app)
      .post('/process-payment')
      .send({ nonce: 'test_nonce', amount: 1000 });

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', '123');
  });
});
