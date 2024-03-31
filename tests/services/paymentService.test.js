const paymentService = require('../../src/services/paymentService');
const { paymentsApi } = require('../../api/squareClient');

jest.mock('../../src/api/squareClient');

describe('Payment Service', () => {
  describe('processPayment', () => {
    it('should process a payment successfully', async () => {
      const paymentData = { sourceId: 'cnon:card-nonce-ok', amount: 100, currency: 'USD', idempotencyKey: 'unique_key' };
      const expectedResult = { id: 'payment_id', status: 'COMPLETED', amount_money: { amount: 100, currency: 'USD' } };

      paymentsApi.createPayment.mockResolvedValue({ result: { payment: expectedResult } });

      const result = await paymentService.processPayment(paymentData.sourceId, paymentData.amount, paymentData.currency, paymentData.idempotencyKey);

      expect(result).toEqual(expectedResult);
      expect(paymentsApi.createPayment).toHaveBeenCalledWith(expect.objectContaining({
        sourceId: paymentData.sourceId,
        amountMoney: { amount: paymentData.amount, currency: paymentData.currency },
        idempotencyKey: paymentData.idempotencyKey
      }));
    });
  });

  describe('listPayments', () => {
    it('should list payments successfully', async () => {
      const queryParams = { beginTime: '2023-12-20T00:00:00Z', endTime: '2024-01-01T23:59:59Z' };
      const expectedResult = [{ id: 'payment_id', status: 'COMPLETED', amount_money: { amount: 100, currency: 'USD' } }];

      paymentsApi.listPayments.mockResolvedValue({ result: { payments: expectedResult } });

      const result = await paymentService.listPayments(queryParams);

      expect(result).toEqual(expectedResult);
      expect(paymentsApi.listPayments).toHaveBeenCalledWith(expect.objectContaining(queryParams));
    });
  });

  describe('getPaymentDetails', () => {
    it('should get payment details successfully', async () => {
      const paymentId = 'payment_id';
      const expectedResult = { id: paymentId, status: 'COMPLETED', amount_money: { amount: 100, currency: 'USD' } };

      paymentsApi.getPayment.mockResolvedValue({ result: { payment: expectedResult } });

      const result = await paymentService.getPaymentDetails(paymentId);

      expect(result).toEqual(expectedResult);
      expect(paymentsApi.getPayment).toHaveBeenCalledWith(paymentId);
    });
  });
});
