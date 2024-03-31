const request = require('supertest');
const express = require('express');
const paymentService = require('../../src/services/paymentService');
const paymentRoutes = require('../../src/api/paymentRoutes');

// Set up the express app with the payment routes
const app = express();
app.use(express.json()); // Body parser middleware
app.use('/api/payments', paymentRoutes); // Set up your routes under the '/api/payments' endpoint

// Mock the paymentService module
jest.mock('../../src/services/paymentService', () => ({
  processPayment: jest.fn(),
  listPayments: jest.fn(),
  getPaymentDetails: jest.fn(),
}));

describe('Payment Routes', () => {
  describe('POST /api/payments/process-payment', () => {
    it('should process a payment successfully', async () => {
      const paymentData = {
        sourceId: 'cnon:card-nonce-ok',
        amountMoney: { amount: 100, currency: 'USD' },
        idempotencyKey: 'unique_key'
      };
      const expectedResult = {
        payment: {
          id: 'payment_id',
          status: 'COMPLETED',
          amount_money: { amount: 100, currency: 'USD' }
        }
      };
      
      paymentService.processPayment.mockResolvedValue(expectedResult.payment);

      const response = await request(app).post('/api/payments/process-payment').send(paymentData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResult.payment);
      expect(paymentService.processPayment).toHaveBeenCalledWith(
        paymentData.sourceId,
        paymentData.amountMoney.amount,
        paymentData.amountMoney.currency,
        paymentData.idempotencyKey
      );
    });
  });

  describe('GET /api/payments/list-payments', () => {
    it('should list payments successfully', async () => {
      const queryParams = {
        beginTime: '2023-12-20T00:00:00Z',
        endTime: '2024-01-01T23:59:59Z'
      };
      const mockPayments = [
        { id: 'payment1', status: 'COMPLETED', amount_money: { amount: 100, currency: 'USD' }},
        { id: 'payment2', status: 'COMPLETED', amount_money: { amount: 200, currency: 'USD' }}
      ];

      // Mock implementation reflecting the same structure
      paymentService.listPayments.mockResolvedValue(mockPayments);

      
      
      const response = await request(app).get('/api/payments/list-payments').query(queryParams);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockPayments);
      expect(paymentService.listPayments).toHaveBeenCalledWith(expect.objectContaining(queryParams));
    });
  });

  describe('GET /api/payments/payment-details/:paymentId', () => {
    it('should get payment details successfully', async () => {
      const paymentId = 'payment_id';
      const expectedResult = {
        payment: {
          id: paymentId,
          status: 'COMPLETED',
          amount_money: { amount: 100, currency: 'USD' }
        }
      };

      paymentService.getPaymentDetails.mockResolvedValue(expectedResult.payment);

      const response = await request(app).get(`/api/payments/payment-details/${paymentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResult.payment);
      expect(paymentService.getPaymentDetails).toHaveBeenCalledWith(paymentId);
    });
  });

  // ... any other test cases you have
});
