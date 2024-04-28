// locationService.js manages interactions with location data, usually from an external API.
const { locationApi } = require('../api/squareClient');

// Retrieve a list of all business locations from an external service.
async function listLocations() {
    // Fetches location data, handling API communication, data serialization, and error management.
    try {
        const response = await locationApi.listLocations();
        console.log(response.result.locations);
        return response.result.locations;
    } catch (error) {
        console.error('Failed to list locations:', error);
        throw error;
    }
}

// Export functions to interact with business locations.
module.exports = { listLocations };