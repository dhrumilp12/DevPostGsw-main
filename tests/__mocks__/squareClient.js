module.exports = {
    paymentsApi: {
      createPayment: jest.fn().mockResolvedValue({ payment: { id: '123', status: 'success' } }),
    },
  };
  