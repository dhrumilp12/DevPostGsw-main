import axios from 'axios';
import {
  CANCEL_BOOKING_START,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAILURE,
} from '../actionTypes';

// Action to signify the start of booking cancellation
export const cancelBookingStart = () => ({
  type: CANCEL_BOOKING_START,
});

// Action to handle successful booking cancellation
export const cancelBookingSuccess = (booking) => ({
  type: CANCEL_BOOKING_SUCCESS,
  payload: booking,
});

// Action to handle failure in booking cancellation
export const cancelBookingFailure = (error) => ({
  type: CANCEL_BOOKING_FAILURE,
  payload: error,
});

// Thunk function to cancel a booking by ID and version
export const cancelBooking = (bookingId, bookingVersion) => async (dispatch) => {
  dispatch(cancelBookingStart());
  console.log('Dispatching cancel with version:', bookingVersion); // Ensure logging is accurate
  try {
    const response = await axios.post(`/api/bookings/cancel-booking/${bookingId}`, {
      bookingVersion: bookingVersion  // No need to parse here; ensure it's done before dispatch
    });
    dispatch(cancelBookingSuccess(response.data));
  } catch (error) {
    console.error('Error cancelling booking:', error);
    dispatch(cancelBookingFailure(error.message));
  }
};


