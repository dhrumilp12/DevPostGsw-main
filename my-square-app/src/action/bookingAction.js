// actions/bookingActions.js
export const CREATE_BOOKING_START = 'CREATE_BOOKING_START';
export const CREATE_BOOKING_SUCCESS = 'CREATE_BOOKING_SUCCESS';
export const CREATE_BOOKING_FAILURE = 'CREATE_BOOKING_FAILURE';

export const createBookingStart = () => ({
    type: CREATE_BOOKING_START
});

export const createBookingSuccess = (bookingData) => ({
    type: CREATE_BOOKING_SUCCESS,
    payload: bookingData 
});

export const createBookingFailure = (error) => ({
    type: CREATE_BOOKING_FAILURE,
    payload: error 
});