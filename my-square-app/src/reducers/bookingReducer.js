// reducers/bookingReducer.js
import {
    CREATE_BOOKING_START,
    CREATE_BOOKING_SUCCESS,
    CREATE_BOOKING_FAILURE,
    // Add other relevant action types if needed (e.g., FETCH_BOOKINGS_START, etc.)
} from '../action/bookingAction'; // Import your action types

const initialState = {
    loading: false,  // Track if a booking creation is in progress
    booking: null,   // Store the most recently created booking
    error: null      // Capture any errors during the process
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_BOOKING_START:
            return { ...state, loading: true, error: null };  // Reset any previous error
        case CREATE_BOOKING_SUCCESS:
            return { ...state, loading: false, booking: action.payload };
        case CREATE_BOOKING_FAILURE:
            return { ...state, loading: false, error: action.payload };
        // ... add cases for other actions if you have them ...
        default:
            return state; // Return the current state if no action matches
    }
};

export default bookingReducer;
