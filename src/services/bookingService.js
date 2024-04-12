const { bookingApi } = require('../api/squareClient');

async function createBooking(bookingData) {
    console.log("Received Booking Data:", bookingData);

    if (!bookingData.booking || !Array.isArray(bookingData.booking.appointmentSegments)) {
        console.error("Invalid booking data structure:", bookingData);
        throw new Error("Invalid booking data structure");
    }

    const formattedAppointmentSegments = bookingData.booking.appointmentSegments.map(segment => ({
        ...segment,
        serviceVariationVersion: BigInt(segment.serviceVariationVersion),
        durationMinutes: parseInt(segment.durationMinutes, 10)
    }));

    const formattedBookingData = {
        ...bookingData.booking,
        startAt: new Date(bookingData.booking.startAt).toISOString(),
        appointmentSegments: formattedAppointmentSegments
    };

    console.log("Formatted Booking Data for API:", formattedBookingData);

    try {
        const response = await bookingApi.createBooking({ booking: formattedBookingData });
        if (!response || !response.result) {
            throw new Error("API call to create booking did not return expected result");
        }
        return response.result.booking;
    } catch (error) {
        console.error("Failed to create booking:", error);
        throw error; // Rethrowing the original error for accurate stack tracing
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

async function cancelBooking(bookingId, details) {
    console.log("Received details in cancelBooking:", details);  // Ensure you're logging what you receive exactly.

    const currentBooking = await bookingApi.retrieveBooking(bookingId);
    if (currentBooking.status === 'CANCELLED_BY_SELLER') {
        console.log("Booking already canceled:", bookingId);
        return { alreadyCancelled: true, message: "Booking is already canceled." };
    }

    // Log the specific received version to check it
    console.log("Received bookingVersion for cancellation:", details.bookingVersion);

    if (!details.bookingVersion || typeof details.bookingVersion !== 'number' || !Number.isInteger(details.bookingVersion)) {
        console.error("Invalid or missing booking version for booking ID:", bookingId, "Received:", details.bookingVersion);
        throw new Error("Booking version is required and must be an integer.");
    }

    const requestBody = {
        idempotencyKey: `cancel-${bookingId}-${Date.now()}`,
        bookingVersion: details.bookingVersion
    };

    try {
        const response = await bookingApi.cancelBooking(bookingId, requestBody);
        console.log("Cancellation successful:", response);
        return response;
    } catch (error) {
        console.error("Failed to cancel booking:", error);
        throw error;
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

console.log("Environment:", process.env.SQUARE_ENVIRONMENT);
console.log("Booking API Access Token:", process.env.PRODUCTION_ACCESS_TOKEN);

async function listBookings() {
    try {
        const response = await bookingApi.listBookings();
        const bookings = response.result.bookings || [];
        console.log("Bookings:", bookings); // Log the bookings to see their structure

        const serializedBookings = bookings.map(booking => ({
            ...booking,
            version: booking.version.toString(), // Convert version to string
            // Add other fields here if they are of type BigInt
        }));
        return serializedBookings;
    } catch (error) {
        console.error("Failed to list bookings:", error);
        throw new Error("Failed to list bookings");
    }
}


async function searchAvailability(searchCriteria) {
    try {
        const response = await bookingApi.searchAvailability(searchCriteria);
        return response.result.availabilities || [];
    } catch (error) {
        console.error("Failed to search availability:", error);
        throw new Error("Failed to search availability");
    }
}

async function bulkRetrieveBookings(bookingIds) {
    console.log("Received bookingIds:", bookingIds);  // Logging the input to debug

    if (!Array.isArray(bookingIds)) {
        console.error("Invalid input for bookingIds, expected an array of strings. Received:", bookingIds);
        throw new Error("Invalid input: Expected an array of booking IDs.");
    }
    
    try {
        const response = await bookingApi.bulkRetrieveBookings({ bookingIds });
        console.log("Bulk retrieve response:", response.result.bookings);
        return response.result.bookings || [];
    } catch (error) {
        console.error("Failed to bulk retrieve bookings:", error);
        throw new Error("Failed to bulk retrieve bookings");
    }
}

// Add other necessary functions and export them
module.exports = { createBooking, updateBooking, cancelBooking, retrieveBooking, bulkRetrieveBookings, searchAvailability,  listBookings};
