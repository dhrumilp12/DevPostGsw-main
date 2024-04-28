// Route configuration for fetching location data from the Square API.
const express = require('express');
const router = express.Router();
const { listLocations } = require('../services/locationService');

// Route to list all locations setup in Square account.
router.get('/locations', async (req, res) => {
    // Retrieves location details using the location service and handles JSON responses and errors.
    try {
        const locations = await listLocations();
        console.log(locations);
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch locations', error: error.message });
    }
});

module.exports = router;
