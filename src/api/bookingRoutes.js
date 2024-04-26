// bookingRoutes.js sets up the routes for handling booking-related requests in the backend.
const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');


// Route to handle the creation of a new booking. It uses the createBooking service to process the request.
router.post('/create-booking', async (req, res) => {
    // Validate the request body, attempt to create the booking using the booking service, and handle the response or errors.
    try {
        const bookingData = req.body;
        const newBooking = await bookingService.createBooking(bookingData);
        const jsonString = JSON.stringify(newBooking, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        res.json(jsonString);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to update an existing booking. It retrieves booking data from the request and uses the updateBooking service.
router.put('/update-booking/:bookingId', async (req, res) => {
    // Fetch booking data, call the updateBooking service with the ID and data, and handle the response or errors.
    const { bookingId } = req.params;
    const bookingData = req.body.booking;  // Ensure this matches the structure expected by the API
    console.log("Sending to Square API:", bookingData);

    try {
        const updatedBooking = await bookingService.updateBooking(bookingId, bookingData);
        res.json(updatedBooking);
    } catch (error) {
        console.error("Error updating booking:", error);
        res.status(500).json({ error: error.message });
    }
});




// Route to cancel a booking. It checks for required parameters and uses the cancelBooking service.
router.post('/cancel-booking/:bookingId', async (req, res) => {
    // Validate necessary parameters, attempt to cancel the booking using the service, and handle the response or errors.
    console.log("Received body at route:", req.body);  // Confirming body structure

    const { bookingVersion } = req.body;
    const { bookingId } = req.params;

    console.log("Handling cancel for bookingId:", bookingId, "with version:", bookingVersion);

    if (bookingVersion === undefined || typeof bookingVersion !== 'number' || !Number.isInteger(bookingVersion)) {
        console.error("Invalid or missing booking version for booking ID:", bookingId);
        return res.status(400).json({ error: 'Booking version is required and must be an integer.' });
    }

    try {
        const result = await bookingService.cancelBooking(bookingId, { bookingVersion });
        res.json(result);
    } catch (error) {
        console.error("Failed to cancel booking:", error);
        res.status(500).send({ error: error.message });
    }
});



  

// Route to retrieve details of a specific booking.
router.get('/retrieve-booking/:bookingId', async (req, res) => {
   // Call the retrieveBooking service with the booking ID and handle the response or errors.
    try {
        const { bookingId } = req.params;
        const bookingDetails = await bookingService.retrieveBooking(bookingId);
        res.json(bookingDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to list all bookings.
router.get('/list-bookings', async (req, res) => {
    // Use the listBookings service to get all bookings, handle serialization for BigInt, and manage errors.
    try {
        const bookings = await bookingService.listBookings();
        const jsonString = JSON.stringify(bookings, (key, value) =>
            typeof value === 'bigint' ? value.toString() : value
        );
        res.json(JSON.parse(jsonString));
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to search for booking availability based on criteria.
router.post('/search-availability', async (req, res) => {
    // Validate the search criteria, use the searchAvailability service to perform the search, and handle the response or errors.
    try {
        const searchCriteria = req.body;
        const availability = await bookingService.searchAvailability(searchCriteria);
        res.json(availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



// Route to retrieve multiple bookings based on IDs.
router.post('/bulk-retrieve-bookings', async (req, res) => {
   // Validate the input IDs, use the bulkRetrieveBookings service to get bookings, and handle the response or errors.
    try {
      const { bookingIds } = req.body;
      
      if (!Array.isArray(bookingIds) || bookingIds.some(id => typeof id !== 'string')) {
        return res.status(400).json({ error: 'Invalid input for bookingIds, expected an array of strings.' });
      }
      const bookings = await bookingService.bulkRetrieveBookings(bookingIds);
      console.log('Bookings to send to frontend:', bookings);
      res.json(bookings); // Make sure to return the array of bookings directly
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
});

  
// Export the router for use in the main application.
module.exports = router;
