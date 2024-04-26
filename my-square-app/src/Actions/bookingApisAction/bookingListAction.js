import axios from 'axios';
import {
  FETCH_BOOKINGS_START,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
} from '../actionTypes';

// Action to signify the start of bookings fetch
export const fetchBookingsStart = () => ({
  type: FETCH_BOOKINGS_START,
});

// Action to handle successful bookings fetch
export const fetchBookingsSuccess = (bookings) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: bookings,
});

// Action to handle failure in bookings fetch
export const fetchBookingsFailure = (error) => ({
  type: FETCH_BOOKINGS_FAILURE,
  payload: error,
});

// Thunk function to fetch bookings from API
export const fetchBookings = () => async (dispatch) => {
  dispatch(fetchBookingsStart());
  try {
    const response = await axios.get('/api/bookings/list-bookings');
    dispatch(fetchBookingsSuccess(response.data));
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message));
  }
};
