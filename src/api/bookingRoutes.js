const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');

// Create a booking
router.post('/create-booking', async (req, res) => {
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
// Update a booking
router.put('/update-booking/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const bookingData = req.body;
        const updatedBooking = await bookingService.updateBooking(bookingId, bookingData);
        res.json(updatedBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/cancel-booking/:bookingId', async (req, res) => {
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





  

// Retrieve a booking
router.get('/retrieve-booking/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const bookingDetails = await bookingService.retrieveBooking(bookingId);
        res.json(bookingDetails);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/list-bookings', async (req, res) => {
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


router.post('/search-availability', async (req, res) => {
    try {
        const searchCriteria = req.body;
        const availability = await bookingService.searchAvailability(searchCriteria);
        res.json(availability);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post('/bulk-retrieve-bookings', async (req, res) => {
    try {
        const { bookingIds } = req.body;
        const bookings = await bookingService.bulkRetrieveBookings(bookingIds);
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add other necessary routes and export the router
module.exports = router;
