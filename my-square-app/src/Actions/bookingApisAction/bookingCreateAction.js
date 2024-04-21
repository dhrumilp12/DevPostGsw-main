// bookingCreateAction.js
import axios from 'axios';
import { CREATE_BOOKING_START, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE } from '../actionTypes';


// Add detailed logging in your bookingCreateAction.js
export const createBooking = (bookingData) => async (dispatch) => {
  dispatch({ type: CREATE_BOOKING_START });
  try {
    const response = await axios.post('/api/bookings/create-booking', bookingData);
    if (response.status >= 200 && response.status < 300) {
      dispatch({ type: CREATE_BOOKING_SUCCESS, payload: response.data });
    } else {
      console.log("Error response:", response);
      throw new Error('An unexpected error occurred');
    }
  } catch (error) {
    console.error("Error making API call:", error.response || error.message);
    dispatch({
      type: CREATE_BOOKING_FAILURE,
      payload: error.response ? error.response.data.message : error.message
    });
  }
};

