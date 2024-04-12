// bookingCreateAction.js
import axios from 'axios';
import { CREATE_BOOKING_START, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE } from '../actionTypes';


export const createBooking = (bookingData) => async (dispatch) => {
  dispatch({ type: CREATE_BOOKING_START });
  try {
    const response = await axios.post('/api/bookings/create-booking', bookingData);
    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: CREATE_BOOKING_SUCCESS, payload: response.data });
    } else {
      throw new Error('An unexpected error occurred');
    }
  } catch (error) {
    let errorMessage = 'An unexpected error occurred';
    if (error.response && error.response.data && error.response.data.message) {
      errorMessage = error.response.data.message;
    } else if (error.message) {
      errorMessage = error.message;
    }
    dispatch({ type: CREATE_BOOKING_FAILURE, payload: errorMessage });
  }
};
