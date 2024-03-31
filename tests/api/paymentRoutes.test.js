const request = require('supertest');
const express = require('express');
const app = express();
const paymentService = require('../../src/services/paymentService');

jest.mock('../../src/services/paymentService');

describe('Payment Routes', () => {
  describe('POST /process-payment', () => {
    it('should process a payment successfully', async () => {
      const paymentData = { sourceId: 'cnon:card-nonce-ok', amount: 100, currency: 'USD', idempotencyKey: 'unique_key' };
      const expectedResult = { id: 'payment_id', status: 'COMPLETED', amount_money: { amount: 100, currency: 'USD' } };
      
      paymentService.processPayment.mockResolvedValue(expectedResult);

      const response = await request(app).post('/process-payment').send(paymentData);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResult);
      expect(paymentService.processPayment).toHaveBeenCalledWith(paymentData.sourceId, paymentData.amount, paymentData.currency, paymentData.idempotencyKey);
    });
  });

  describe('GET /list-payments', () => {
    it('should list payments successfully', async () => {
      const queryParams = { beginTime: '2023-12-20T00:00:00Z', endTime: '2024-01-01T23:59:59Z' };
      const expectedResult = [{ id: 'payment_id', status: 'COMPLETED', amount_money: { amount: 100, currency: 'USD' } }];

      paymentService.listPayments.mockResolvedValue(expectedResult);

      const response = await request(app).get('/list-payments').query(queryParams);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResult);
      expect(paymentService.listPayments).toHaveBeenCalledWith(queryParams);
    });
  });

  describe('GET /payment-details/:paymentId', () => {
    it('should get payment details successfully', async () => {
      const paymentId = 'payment_id';
      const expectedResult = { id: paymentId, status: 'COMPLETED', amount_money: { amount: 100, currency: 'USD' } };

      paymentService.getPaymentDetails.mockResolvedValue(expectedResult);

      const response = await request(app).get(`/payment-details/${paymentId}`);

      expect(response.status).toBe(200);
      expect(response.body).toEqual(expectedResult);
      expect(paymentService.getPaymentDetails).toHaveBeenCalledWith(paymentId);
    });
  });
});
