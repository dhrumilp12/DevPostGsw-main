const mockPaymentsApi = {
  createPayment: jest.fn().mockImplementation(({ sourceId, amountMoney }) => {
    if (sourceId && amountMoney.amount > 0) {
      return Promise.resolve({
        payment: { id: 'p123', status: 'COMPLETED', amountMoney },
      });
    } else {
      return Promise.reject(new Error('Payment creation failed'));
    }
  }),
};

const mockBookingsApi = {
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
};

const mockCustomersApi = {
  listCustomers: jest.fn().mockResolvedValue({ customers: [{ id: 'c123', name: 'Test Customer' }] }),
  retrieveCustomer: jest.fn().mockResolvedValue({ customer: { id: 'c123', name: 'Test Customer' } }),
  createCustomer: jest.fn().mockResolvedValue({ customer: { id: 'c123', name: 'New Customer' } }),
  updateCustomer: jest.fn().mockResolvedValue({ customer: { id: 'c123', name: 'Updated Customer' } }),
};

const squareClient = {
  paymentsApi: mockPaymentsApi,
  bookingsApi: mockBookingsApi,
  customersApi: mockCustomersApi,
};

module.exports = squareClient;
