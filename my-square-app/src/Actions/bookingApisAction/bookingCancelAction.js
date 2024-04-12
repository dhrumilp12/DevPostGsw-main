import axios from 'axios';
import {
  CANCEL_BOOKING_START,
  CANCEL_BOOKING_SUCCESS,
  CANCEL_BOOKING_FAILURE,
} from '../actionTypes';

export const cancelBookingStart = () => ({
  type: CANCEL_BOOKING_START,
});

export const cancelBookingSuccess = (booking) => ({
  type: CANCEL_BOOKING_SUCCESS,
  payload: booking,
});

export const cancelBookingFailure = (error) => ({
  type: CANCEL_BOOKING_FAILURE,
  payload: error,
});

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


