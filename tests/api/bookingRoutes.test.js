// bookingRoutes.test.js
jest.mock('../../src/services/bookingService');
const request = require('supertest');
const express = require('express');
const bookingRoutes = require('../../src/api/bookingRoutes');
const bookingService = require('../../src/services/bookingService');



const app = express();
app.use(express.json());
app.use('/api/bookingRoutes', bookingRoutes);

describe('Booking Routes', () => {
  const bookingData = { /* ... */ };
  const bookingId = 'b123';

  beforeAll(() => {

  bookingService.createBooking.mockResolvedValue({ id: bookingId, ...bookingData });
  bookingService.retrieveBooking.mockResolvedValue({ id: bookingId, ...bookingData });
  bookingService.updateBooking.mockResolvedValue({ id: bookingId, ...bookingData });
  bookingService.cancelBooking.mockResolvedValue({ id: bookingId, status: 'cancelled' });
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });


  it('should create a booking', async () => {
    const response = await request(app)
      .post('/api/bookingRoutes/create-booking')
      .send(bookingData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', bookingId);
  });

  it('should retrieve a booking', async () => {
    const response = await request(app)
      .get(`/api/bookingRoutes/retrieve-booking/${bookingId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', bookingId);
  });

  it('should update a booking', async () => {
    const updatedBookingData = { /* ... */ };
    const response = await request(app)
      .put(`/api/bookingRoutes/update-booking/${bookingId}`)
      .send(updatedBookingData);

    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('id', bookingId);
  });

  it('should cancel a booking', async () => {
    const response = await request(app)
      .post(`/api/bookingRoutes/cancel-booking/${bookingId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('cancelled');
  });

  // ...additional route tests
});
