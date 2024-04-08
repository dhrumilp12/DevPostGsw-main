import axios from 'axios';
import {
  UPDATE_BOOKING_START,
  UPDATE_BOOKING_SUCCESS,
  UPDATE_BOOKING_FAILURE,
} from '../actionTypes';

export const updateBookingStart = () => ({
  type: UPDATE_BOOKING_START,
});

export const updateBookingSuccess = (booking) => ({
  type: UPDATE_BOOKING_SUCCESS,
  payload: booking,
});

export const updateBookingFailure = (error) => ({
  type: UPDATE_BOOKING_FAILURE,
  payload: error,
});

export const updateBooking = (bookingId, bookingData) => async (dispatch) => {
  dispatch(updateBookingStart());
  try {
    const response = await axios.put(`/api/bookings/update-booking/${bookingId}`, {
      booking: bookingData,
    });
    dispatch(updateBookingSuccess(response.data));
  } catch (error) {
    dispatch(updateBookingFailure(error.response?.data?.error || 'Unknown error'));
  }
};
