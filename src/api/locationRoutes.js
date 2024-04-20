// File: locationRoutes.js
const express = require('express');
const router = express.Router();
const { listLocations } = require('../services/locationService');

router.get('/locations', async (req, res) => {
    try {
        const locations = await listLocations();
        console.log(locations);
        res.json(locations);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch locations', error: error.message });
    }
});

module.exports = router;
