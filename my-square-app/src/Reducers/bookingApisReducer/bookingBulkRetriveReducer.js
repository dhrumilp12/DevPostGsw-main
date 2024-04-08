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
  
  const bulkRetrieveBookingsReducer = (state = initialState, action) => {
    switch (action.type) {
      case BULK_RETRIEVE_BOOKINGS_START:
        return { ...state, loading: true, error: null };
      case BULK_RETRIEVE_BOOKINGS_SUCCESS:
        return { ...state, loading: false, bookings: action.payload };
      case BULK_RETRIEVE_BOOKINGS_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default bulkRetrieveBookingsReducer;
  