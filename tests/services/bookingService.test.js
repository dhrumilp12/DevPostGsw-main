jest.mock('../../src/api/squareClient'); // Ensure the relative path is correct

const { createBooking, updateBooking, cancelBooking, retrieveBooking } = require('../../src/services/bookingService');
const { bookingApi } = require('../../src/api/squareClient');

describe('Booking Service', () => {
  const mockBooking = { id: 'b123', service: 'Example Service', status: 'pending' }; // Replace with your actual booking data structure

  beforeEach(() => {
    jest.clearAllMocks();

    // Set up the mock implementations
    bookingApi.createBooking.mockResolvedValue({ result: { booking: mockBooking } });
    bookingApi.updateBooking.mockResolvedValue({ result: { booking: mockBooking } });
    bookingApi.cancelBooking.mockResolvedValue({ result: { booking: { ...mockBooking, status: 'cancelled' } } });
    bookingApi.retrieveBooking.mockResolvedValue({ result: { booking: mockBooking } });
  });

  it('creates a booking successfully', async () => {
    const bookingData = { service: 'Example Service', startTime: '2022-01-01T10:00:00Z' }; // Adapt this to match your booking structure
    const result = await createBooking(bookingData);

    expect(result).toHaveProperty('id', mockBooking.id);
    expect(bookingApi.createBooking).toHaveBeenCalledWith(bookingData);
  });

  it('updates a booking successfully', async () => {
    const bookingData = { ...mockBooking, status: 'confirmed' };
    const result = await updateBooking(mockBooking.id, bookingData);

    expect(result).toHaveProperty('id', mockBooking.id);
    expect(bookingApi.updateBooking).toHaveBeenCalledWith(mockBooking.id, bookingData);
  });

  it('cancels a booking successfully', async () => {
    const result = await cancelBooking(mockBooking.id);

    expect(result.status).toBe('cancelled');
    expect(bookingApi.cancelBooking).toHaveBeenCalledWith(mockBooking.id);
  });

  it('retrieves a booking successfully', async () => {
    const result = await retrieveBooking(mockBooking.id);

    expect(result).toHaveProperty('id', mockBooking.id);
    expect(bookingApi.retrieveBooking).toHaveBeenCalledWith(mockBooking.id);
  });

  // ...add more tests as necessary
});
