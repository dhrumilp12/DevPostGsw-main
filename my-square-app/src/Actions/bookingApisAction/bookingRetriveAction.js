import axios from 'axios';
import {
  RETRIEVE_BOOKING_START,
  RETRIEVE_BOOKING_SUCCESS,
  RETRIEVE_BOOKING_FAILURE,
} from '../actionTypes';

export const retrieveBookingStart = () => ({
  type: RETRIEVE_BOOKING_START,
});

export const retrieveBookingSuccess = (booking) => ({
  type: RETRIEVE_BOOKING_SUCCESS,
  payload: booking,
});

export const retrieveBookingFailure = (error) => ({
  type: RETRIEVE_BOOKING_FAILURE,
  payload: error,
});

export const retrieveBooking = (bookingId) => async (dispatch) => {
  dispatch(retrieveBookingStart());
  try {
    const response = await axios.get(`/api/bookings/retrieve-booking/${bookingId}`);
    dispatch(retrieveBookingSuccess(response.data));
  } catch (error) {
    dispatch(retrieveBookingFailure(error.message));
  }
};
