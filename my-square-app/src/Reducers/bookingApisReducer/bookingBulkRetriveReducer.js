// Handles the state for bulk retrieval of bookings. This reducer manages the bookings array, loading states, and any errors that occur during the bulk retrieval process. It responds to three actions: start, success, and failure of bulk booking retrieval.
import {
  BULK_RETRIEVE_BOOKINGS_START,
  BULK_RETRIEVE_BOOKINGS_SUCCESS,
  BULK_RETRIEVE_BOOKINGS_FAILURE,
} from '../../Actions/actionTypes';

const initialState = {
  bookings: null,
  loading: false,
  error: null,
};

export default function bulkRetrieveBookingsReducer(state = initialState, action) {
  switch (action.type) {
    case BULK_RETRIEVE_BOOKINGS_START:
      return { ...state, loading: true, error: null };
    case BULK_RETRIEVE_BOOKINGS_SUCCESS:
      return { ...state, loading: false, bookings: action.payload, error: null };
    case BULK_RETRIEVE_BOOKINGS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}
