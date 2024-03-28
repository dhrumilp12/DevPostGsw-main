const { bookingApi } = require('../api/squareClient');

async function createBooking(bookingData) {
    try {
        const response = await bookingApi.createBooking(bookingData);

        if (!response || !response.result) {
            throw new Error("API call to create booking did not return expected result");
        }

        return response.result.booking;
    } catch (error) {
        console.log("Failed to create booking:", error);
        throw new Error("Failed to create booking");
    }
}

async function updateBooking(bookingId, bookingData) {
    try {
        const response = await bookingApi.updateBooking(bookingId, bookingData);

        if (!response || !response.result) {
            throw new Error("API call to update booking did not return expected result");
        }

        return response.result.booking;
    } catch (error) {
        console.log("Failed to update booking:", error);
        throw new Error("Failed to update booking");
    }
}

async function cancelBooking(bookingId) {
    try {
        const response = await bookingApi.cancelBooking(bookingId);

        if (!response || !response.result) {
            throw new Error("API call to cancel booking did not return expected result");
        }

        return response.result.booking;
    } catch (error) {
        console.log("Failed to cancel booking:", error);
        throw new Error("Failed to cancel booking");
    }
}

async function retrieveBooking(bookingId) {
    try {
        const response = await bookingApi.retrieveBooking(bookingId);

        if (!response || !response.result) {
            throw new Error("API call to retrieve booking did not return expected result");
        }

        return response.result.booking;
    } catch (error) {
        console.log("Failed to retrieve booking:", error);
        throw new Error("Failed to retrieve booking");
    }
}

// Add other necessary functions and export them
module.exports = { createBooking, updateBooking, cancelBooking, retrieveBooking };
