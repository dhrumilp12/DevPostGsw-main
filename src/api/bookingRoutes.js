const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');

// Create a booking
router.post('/create-booking', async (req, res) => {
    try {
        const bookingData = req.body;
        const newBooking = await bookingService.createBooking(bookingData);
        res.json(newBooking);
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

// Cancel a booking
router.post('/cancel-booking/:bookingId', async (req, res) => {
    try {
        const { bookingId } = req.params;
        const cancelledBooking = await bookingService.cancelBooking(bookingId);
        res.json(cancelledBooking);
    } catch (error) {
        res.status(500).json({ error: error.message });
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

// Add other necessary routes and export the router
module.exports = router;
