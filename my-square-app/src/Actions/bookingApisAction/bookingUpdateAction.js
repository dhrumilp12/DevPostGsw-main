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
    const response = await axios.put(`/api/bookings/update-booking/${bookingId}`, { booking: bookingData });
    if (response.status === 200) {
      dispatch(updateBookingSuccess(response.data));
      return Promise.resolve("Booking updated successfully!");
    } else {
      throw new Error('The server responded with an error.');
    }
  } catch (error) {
    const errorMessage = error.response?.data?.errors[0]?.detail || "Failed to update the booking due to an unknown error.";
    dispatch(updateBookingFailure(errorMessage));
    return Promise.reject(errorMessage); // Make sure to reject the promise with the error message
  }
};
