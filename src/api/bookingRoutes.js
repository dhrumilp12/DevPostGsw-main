const express = require('express');
const router = express.Router();
const bookingService = require('../services/bookingService');

router.post('/create-booking', async (req, res) => {
    try {
        const { appointment } = req.body;
        const bookingResult = await bookingService.createBooking(appointment);
        res.json(bookingResult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add more routes as needed

module.exports = router;
