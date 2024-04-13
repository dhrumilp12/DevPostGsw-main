
import axios from 'axios';
import {
  BULK_RETRIEVE_BOOKINGS_START,
  BULK_RETRIEVE_BOOKINGS_SUCCESS,
  BULK_RETRIEVE_BOOKINGS_FAILURE
} from '../actionTypes';

export const bulkRetrieveBookings = (bookingIds) => async (dispatch) => {
  dispatch({ type: BULK_RETRIEVE_BOOKINGS_START });
  try {
    const response = await axios.post('/api/bookings/bulk-retrieve-bookings', { bookingIds });
    console.log('Response data:', response.data);
    dispatch({
      type: BULK_RETRIEVE_BOOKINGS_SUCCESS,
      payload: response.data
    });
  } catch (error) {
    dispatch({
      type: BULK_RETRIEVE_BOOKINGS_FAILURE,
      payload: error.response ? error.response.data : error.message
    });
  }
};