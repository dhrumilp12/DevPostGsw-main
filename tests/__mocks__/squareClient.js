module.exports = {
  paymentsApi: {
    createPayment: jest.fn().mockImplementation(({ sourceId, amountMoney }) => {
      if (sourceId && amountMoney.amount > 0) {
        return Promise.resolve({
          payment: { id: 'p123', status: 'COMPLETED', amountMoney },
        });
      } else {
        return Promise.reject(new Error('Payment creation failed'));
      }
    }),
  },

  customersApi: {
    createCustomer: jest.fn().mockImplementation(({ customerData }) => {
      return Promise.resolve({ customer: { id: 'c123', ...customerData } });
    }),
    retrieveCustomer: jest.fn().mockImplementation(customerId => {
      return Promise.resolve({ customer: { id: customerId, name: 'Test Customer' } });
    }),
    updateCustomer: jest.fn().mockImplementation((customerId, customerData) => {
      return Promise.resolve({ customer: { id: customerId, ...customerData } });
    }),
    listCustomers: jest.fn().mockImplementation(() => {
      return Promise.resolve({ customers: [{ id: 'c123', name: 'Test Customer' }] });
    }),
    
  },
  

  bookingsApi: {
    createBooking: jest.fn().mockImplementation((bookingData) => {
      return Promise.resolve({ booking: { id: 'b123', ...bookingData } });
    }),
    retrieveBooking: jest.fn().mockImplementation((bookingId) => {
      return Promise.resolve({ booking: { id: bookingId, status: 'booked' } });
    }),
    updateBooking: jest.fn().mockImplementation((bookingId, bookingData) => {
      return Promise.resolve({ booking: { id: bookingId, ...bookingData } });
    }),
    cancelBooking: jest.fn().mockImplementation((bookingId) => {
      return Promise.resolve({ booking: { id: bookingId, status: 'cancelled' } });
    }),
    // ...additional mocked methods as needed
  },
};
