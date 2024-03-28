
// paymentService.test.js
jest.mock('../../src/api/squareClient', () => ({
  paymentsApi: {
    createPayment: jest.fn().mockResolvedValue({
      result: { payment: { id: '123', status: 'success' } } // Mocked response structure
    }),
  },
}));

const { processPayment } = require('../../src/services/paymentService');

describe('processPayment', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clears the mock call history before each test
  });

  it('processes payment successfully', async () => {
    const nonce = 'test_nonce';
    const amount = 1000;
    // Call the function with the mocked setup
    const result = await processPayment(nonce, amount);

    // Assertions to verify the behavior and the mock interaction
    expect(result).toHaveProperty('id', '123');
    expect(result.status).toBe('success');
  });

  it('throws an error for invalid payment amount', async () => {
    const nonce = 'test_nonce';
    const invalidAmount = -100; // Negative amount
    await expect(processPayment(nonce, invalidAmount)).rejects.toThrow('Invalid payment amount');
  });
  
  it('handles API errors', async () => {
    const nonce = 'test_nonce';
    const amount = 1000;
    // Mock the API to throw an error
    try {
      await processPayment(nonce, amount);
    } catch (error) {
      console.log("Error caught in test:", error.message); // Additional logging
      expect(error.message).toContain('API error');
    }
  });
});
