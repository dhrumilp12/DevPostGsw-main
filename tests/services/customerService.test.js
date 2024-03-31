const { processPayment, listPayments, getPaymentDetails } = require('../../src/services/paymentService');
const squareClient = require('../../src/api/squareClient');

jest.mock('../../src/api/squareClient', () => ({
  paymentsApi: {
    createPayment: jest.fn(),
    listPayments: jest.fn(),
    getPayment: jest.fn(),
  },
}));

describe('Payment Service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('processPayment', () => {
    it('should call createPayment with the correct parameters and return data', async () => {
      const paymentData = { sourceId: 'source_id', amount: 100, currency: 'USD', idempotencyKey: 'key' };
      const response = { payment: { id: 'payment_id', status: 'COMPLETED' } };
      squareClient.paymentsApi.createPayment.mockResolvedValue(response);

      const result = await processPayment(paymentData.sourceId, paymentData.amount, paymentData.currency, paymentData.idempotencyKey);

      expect(squareClient.paymentsApi.createPayment).toHaveBeenCalledWith({
        sourceId: paymentData.sourceId,
        amountMoney: {
          amount: paymentData.amount,
          currency: paymentData.currency,
        },
        idempotencyKey: paymentData.idempotencyKey,
      });
      expect(result).toEqual(response.payment);
    });
  });

  describe('listPayments', () => {
    it('should call listPayments with the correct parameters and return data', async () => {
      const params = { beginTime: 'begin_time', endTime: 'end_time' };
      const response = { payments: [{ id: 'payment_id', status: 'COMPLETED' }] };
      squareClient.paymentsApi.listPayments.mockResolvedValue(response);

      const result = await listPayments(params);

      expect(squareClient.paymentsApi.listPayments).toHaveBeenCalledWith({
        beginTime: params.beginTime,
        endTime: params.endTime,
        sort: 'DESC',
        // Include other parameters you expect to pass
      });
      expect(result).toEqual(response.payments);
    });
  });

  describe('getPaymentDetails', () => {
    it('should call getPayment with the correct parameter and return data', async () => {
      const paymentId = 'payment_id';
      const response = { payment: { id: paymentId, status: 'COMPLETED' } };
      squareClient.paymentsApi.getPayment.mockResolvedValue(response);

      const result = await getPaymentDetails(paymentId);

      expect(squareClient.paymentsApi.getPayment).toHaveBeenCalledWith(paymentId);
      expect(result).toEqual(response.payment);
    });
  });

  // ... any other tests for functions in paymentService
});
