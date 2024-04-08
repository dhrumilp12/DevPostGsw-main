import axios from 'axios';
import {
  BULK_RETRIEVE_BOOKINGS_START,
  BULK_RETRIEVE_BOOKINGS_SUCCESS,
  BULK_RETRIEVE_BOOKINGS_FAILURE,
} from '../actionTypes';

export const bulkRetrieveBookingsStart = () => ({
  type: BULK_RETRIEVE_BOOKINGS_START,
});

export const bulkRetrieveBookingsSuccess = (bookings) => ({
  type: BULK_RETRIEVE_BOOKINGS_SUCCESS,
  payload: bookings,
});

export const bulkRetrieveBookingsFailure = (error) => ({
  type: BULK_RETRIEVE_BOOKINGS_FAILURE,
  payload: error,
});

export const bulkRetrieveBookings = (bookingIds) => async (dispatch) => {
  dispatch(bulkRetrieveBookingsStart());
  try {
    const response = await axios.post('/api/bookings/bulk-retrieve', { booking_ids: bookingIds });
    dispatch(bulkRetrieveBookingsSuccess(response.data.bookings));
  } catch (error) {
    dispatch(bulkRetrieveBookingsFailure(error.message));
  }
};
