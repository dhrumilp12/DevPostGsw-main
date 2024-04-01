const paymentService = require('../../src/services/paymentService');
const { paymentsApi } = require('../../src/api/squareClient');
 
jest.mock('../../src/api/squareClient');
 
beforeEach(() => {
  // Clear all mocks before each test
  jest.clearAllMocks();
});
 
describe('Payment Service', () => {
  describe('processPayment', () => {
    it('should process a payment successfully', async () => {
      // Setup the mock response
      const expectedResult = {
        payment: {
          id: 'payment_id',
          status: 'COMPLETED',
          amount_money: { amount: 100, currency: 'USD' },
        },
      };
 
      paymentsApi.createPayment.mockResolvedValue({ result: expectedResult });
 
      // Setup payment data to be sent
      const paymentData = {
        sourceId: 'cnon:card-nonce-ok',
        amount: 100,
        currency: 'USD',
        idempotencyKey: 'unique_key',
      };
 
      // Call the service function
      const result = await paymentService.processPayment(
        paymentData.sourceId,
        paymentData.amount,
        paymentData.currency,
        paymentData.idempotencyKey
      );
 
      // Assertions
      expect(result).toEqual(expectedResult.payment);
      expect(paymentsApi.createPayment).toHaveBeenCalledWith(expect.any(Object));
    });
  });
 
  describe('listPayments', () => {
    it('should list payments successfully', async () => {
      // Setup the expected mock response
      const expectedPayments = [{
        id: 'payment1',
        status: 'COMPLETED',
        amount_money: { amount: 100, currency: 'USD' }
      }];
  
      // Mock the listPayments method from the payments API
      paymentsApi.listPayments.mockResolvedValue({ result: { payments: expectedPayments } });
  
      // Define the parameters for the beginTime and endTime
      const beginTime = '2023-12-20T00:00:00.000Z';
      const endTime = '2024-01-01T23:59:59.000Z';
  
      // Call the actual service method with the query parameters
      const result = await paymentService.listPayments({ beginTime, endTime });
  
      // Check that the result matches the expected payments array
      expect(result).toEqual(expectedPayments);
  
      // Verify that the payments API was called with the correct parameters
      expect(paymentsApi.listPayments).toHaveBeenCalledWith(beginTime, endTime, undefined, undefined, undefined, undefined);
    });
  });
  
  
 
  describe('getPaymentDetails', () => {
    it('should get payment details successfully', async () => {
      // Setup the mock response
      const expectedResult = {
        payment: {
          id: 'payment_id',
          status: 'COMPLETED',
          amount_money: { amount: 100, currency: 'USD' },
        },
      };
 
      paymentsApi.getPayment.mockResolvedValue({ result: expectedResult });
 
      // Call the service function
      const result = await paymentService.getPaymentDetails('payment_id');
 
      // Assertions
      expect(result).toEqual(expectedResult.payment);
      expect(paymentsApi.getPayment).toHaveBeenCalledWith('payment_id');
    });
  });
});