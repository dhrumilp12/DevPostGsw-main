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

export const cancelBooking = (bookingId) => async (dispatch) => {
  dispatch(cancelBookingStart());
  try {
    const response = await axios.post(`/api/bookings/cancel-booking/${bookingId}`);
    dispatch(cancelBookingSuccess(response.data));
  } catch (error) {
    dispatch(cancelBookingFailure(error.message));
  }
};
