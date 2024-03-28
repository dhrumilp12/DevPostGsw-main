const { bookingApi } = require('../api/squareClient');

async function createBooking(appointment) {
    try {
        const response = await bookingApi.createBooking({
            // Populate the booking details
            appointment: appointment
        });

        if (!response || !response.result) {
            throw new Error("API call did not return expected result");
        }

        return response.result.booking;
    } catch (error) {
        console.log("Failed to create booking:", error);
        throw new Error("Failed to create booking");
    }
}

module.exports = { createBooking };
