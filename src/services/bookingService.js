// bookingService.js provides various functions to interact with the Square API for booking operations.
const { bookingApi } = require('../api/squareClient');

// Helper function to serialize objects that may contain BigInt
const serializeBigInts = (obj) => {
    const replacer = (key, value) => 
      typeof value === 'bigint' ? value.toString() : value;
    return JSON.parse(JSON.stringify(obj, replacer));
  };

  // Function to handle the creation of bookings. Validates booking data, formats it correctly, and sends it to the Square API. Handles errors and logs relevant information.
async function createBooking(bookingData) {
    console.log("Received Booking Data:", bookingData);
    // Validate booking data and reformat if necessary, especially handling BigInt serialization.
    // Try creating a booking using the Square API and handle potential errors or specific scenarios like cancellation by the seller.
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
        if (response.result.booking.status === "CANCELLED_BY_SELLER") {
            console.warn("Booking was cancelled by the seller:", response.result.booking);
            // Implement any specific logic or notifications related to cancelled bookings
        }
        return response.result.booking;
    } catch (error) {
        console.error("Failed to create booking:", error);
        throw error; // Rethrowing the original error for accurate stack tracing
    }
}



// Function to update an existing booking with new data. It ensures that booking data is serialized to handle BigInt and handles API errors.
async function updateBooking(bookingId, bookingData) {
    // Update booking and serialize response to handle BigInt, ensuring correct data format.
    console.log("Updating booking with ID:", bookingId, "Data:", bookingData);
    try {
        const response = await bookingApi.updateBooking(bookingId, { booking: bookingData });
        return serializeBigInts(response.result.booking);
    } catch (error) {
        console.error("Failed to update booking:", error);
        throw error;
    }
}

// Function to cancel a booking based on the provided bookingId and additional details such as version.
async function cancelBooking(bookingId, details) {
    console.log("Received details in cancelBooking:", details);  // Ensure you're logging what you receive exactly.
    // Retrieve the current booking status, check for errors or invalid conditions, and attempt to cancel the booking using the Square API.
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



// Function to retrieve the details of a single booking using its ID.
async function retrieveBooking(bookingId) {
     // Retrieve booking details from Square API and handle errors appropriately.
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


// Function to list all bookings. This function might serialize bookings to handle BigInt properly before returning to the caller.
async function listBookings() {
     // List all bookings, serialize the response to handle BigInt, and handle potential errors.
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


// Function to search for booking availability based on certain criteria.
async function searchAvailability(searchCriteria) {
     // Validate search criteria, construct the necessary filters, and perform the search using the Square API.
    if (!searchCriteria || !searchCriteria.startAt || !searchCriteria.endAt || !searchCriteria.locationId) {
        console.error("Search criteria must include 'startAt', 'endAt', and 'locationId' properties.");
        throw new Error("Search criteria must include 'startAt', 'endAt', and 'locationId' properties.");
    }

    // Constructing the filter property using camelCase
    const filter = {
        startAtRange: {  // Changed from start_at_range to startAtRange
            startAt: new Date(searchCriteria.startAt).toISOString(),  // Changed from start_at to startAt
            endAt: new Date(searchCriteria.endAt).toISOString()  // Changed from end_at to endAt
        },
        locationId: searchCriteria.locationId,
        segmentFilters: []  // Changed from segment_filters to segmentFilters
    };

    // Optional: Add segment filters if provided
    if (searchCriteria.serviceVariationId && searchCriteria.teamMemberId) {
        filter.segmentFilters.push({  // Changed from segment_filters to segmentFilters
            serviceVariationId: searchCriteria.serviceVariationId,  // Changed from service_variation_id to serviceVariationId
            teamMemberIdFilter: {  // Changed from team_member_id_filter to teamMemberIdFilter
                any: [searchCriteria.teamMemberId]
            }
        });
    }

    // Format the request body as per the API's expectation
    const requestBody = {
        query: { filter }
    };

    try {
        const response = await bookingApi.searchAvailability(requestBody);

        // Check if response is valid and contains availabilities
        if (!response || !response.result || !response.result.availabilities) {
            throw new Error("Received invalid response from the availability search endpoint.");
        }

        // Serialize the response to handle BigInt serialization
        const serializedAvailabilities = serializeBigInts(response.result.availabilities);
        console.log("Serialized search availability response:", serializedAvailabilities);

        return serializedAvailabilities;
    } catch (error) {
        console.error("Failed to search availability:", error);
        throw new Error("Failed to search availability");
    }
}
  

// Function to retrieve multiple bookings at once based on a list of booking IDs.
async function bulkRetrieveBookings(bookingIds) {
    // Validate input, perform the bulk retrieval using the Square API, serialize the response, and handle errors.
    console.log("Received bookingIds:", bookingIds);  // Logging the input to debug

    if (!Array.isArray(bookingIds)) {
        console.error("Invalid input for bookingIds, expected an array of strings. Received:", bookingIds);
        throw new Error("Invalid input: Expected an array of booking IDs.");
    }
    
    try {
        const response = await bookingApi.bulkRetrieveBookings({ bookingIds });
        
         // Serialize the response to convert BigInt to strings
        const serializedResponse = serializeBigInts(response.result.bookings);

        console.log("Serialized bulk retrieve response:", serializedResponse);
        return serializedResponse || [];
    } catch (error) {
        console.error("Failed to bulk retrieve bookings:", error);
        throw new Error("Failed to bulk retrieve bookings");
    }
}

// Export all the functions for use in other parts of the application.
module.exports = { createBooking, updateBooking, cancelBooking, retrieveBooking, bulkRetrieveBookings, searchAvailability,  listBookings};
