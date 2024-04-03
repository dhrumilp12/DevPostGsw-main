// src/actions/bookingActions.js
import axios from 'axios';
import { CREATE_BOOKING_START, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE } from './actionTypes.js';

export const createBookingStart = () => ({
  type: CREATE_BOOKING_START,
});

export const createBookingSuccess = booking => ({
  type: CREATE_BOOKING_SUCCESS,
  payload: booking,
});

export const createBookingFailure = error => ({
  type: CREATE_BOOKING_FAILURE,
  payload: error,
});

export const createBooking = (bookingData) => async dispatch => {
  dispatch(createBookingStart());
  try {
    const response = await axios.post('/api/bookings/create-booking', bookingData);
    dispatch(createBookingSuccess(response.data));
  } catch (error) {
    dispatch(createBookingFailure(error.message));
  }
};
