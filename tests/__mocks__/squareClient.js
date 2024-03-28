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
  createBooking: jest.fn((bookingData) => {
    if (bookingData) {
      return Promise.resolve({ booking: { id: 'b123', ...bookingData } });
    } else {
      return Promise.reject(new Error('Booking creation failed'));
    }
  }),
  retrieveBooking: jest.fn((bookingId) => {
    if (bookingId === 'existing_booking_id') {
      return Promise.resolve({ booking: { id: bookingId, status: 'booked' } });
    } else {
      return Promise.reject(new Error('Booking not found'));
    }
  }),
  updateBooking: jest.fn((bookingId, bookingData) => {
    if (bookingId === 'existing_booking_id') {
      return Promise.resolve({ booking: { id: bookingId, ...bookingData } });
    } else {
      return Promise.reject(new Error('Booking not found'));
    }
  }),
  cancelBooking: jest.fn((bookingId) => {
    if (bookingId === 'existing_booking_id') {
      return Promise.resolve({ booking: { id: bookingId, status: 'cancelled' } });
    } else {
      return Promise.reject(new Error('Booking not found'));
    }
  }),
};


const mockCustomersApi = {
  listCustomers: jest.fn().mockResolvedValue({ customers: [{ id: 'c123', name: 'Test Customer' }] }),
  retrieveCustomer: jest.fn((customerId) => {
    if (customerId === 'existing_customer_id') {
      return Promise.resolve({ customer: { id: customerId, name: 'Existing Customer' } });
    } else {
      return Promise.reject({ errors: [{ category: 'INVALID_REQUEST_ERROR', code: 'NOT_FOUND', detail: 'Customer does not exist.' }] });
    }
  }),
  createCustomer: jest.fn((customerData) => {
    if (customerData) {
      return Promise.resolve({ customer: { id: 'c123', ...customerData } });
    } else {
      return Promise.reject(new Error('Customer creation failed'));
    }
  }),
  updateCustomer: jest.fn((customerId, customerData) => {
    if (customerId === 'existing_customer_id') {
      return Promise.resolve({ customer: { id: customerId, ...customerData } });
    } else {
      return Promise.reject({ errors: [{ category: 'INVALID_REQUEST_ERROR', code: 'NOT_FOUND', detail: 'Customer update failed.' }] });
    }
  }),
};

const squareClient = {
  paymentsApi: mockPaymentsApi,
  bookingsApi: mockBookingsApi,
  customersApi: mockCustomersApi,
};

module.exports = squareClient;
