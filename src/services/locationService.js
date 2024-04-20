const { locationApi } = require('../api/squareClient');

async function listLocations() {
    try {
        const response = await locationApi.listLocations();
        console.log(response.result.locations);
        return response.result.locations;
    } catch (error) {
        console.error('Failed to list locations:', error);
        throw error;
    }
}

module.exports = { listLocations };