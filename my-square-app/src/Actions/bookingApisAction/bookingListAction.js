import axios from 'axios';
import {
  FETCH_BOOKINGS_START,
  FETCH_BOOKINGS_SUCCESS,
  FETCH_BOOKINGS_FAILURE,
} from '../actionTypes';

export const fetchBookingsStart = () => ({
  type: FETCH_BOOKINGS_START,
});

export const fetchBookingsSuccess = (bookings) => ({
  type: FETCH_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const fetchBookingsFailure = (error) => ({
  type: FETCH_BOOKINGS_FAILURE,
  payload: error,
});

export const fetchBookings = () => async (dispatch) => {
  dispatch(fetchBookingsStart());
  try {
    const response = await axios.get('/api/bookings/list-bookings');
    dispatch(fetchBookingsSuccess(response.data));
  } catch (error) {
    dispatch(fetchBookingsFailure(error.message));
  }
};
