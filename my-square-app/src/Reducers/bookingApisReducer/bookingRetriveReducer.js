//we are not using this since we are using "bookingBulkRetrive".
// Manages the retrieval of details for a specific booking. It maintains the state of the booking being retrieved, including loading states and any errors that occur during the retrieval process.

import {
    RETRIEVE_BOOKING_START,
    RETRIEVE_BOOKING_SUCCESS,
    RETRIEVE_BOOKING_FAILURE,
  } from '../../Actions/actionTypes.js';
  
  const initialState = {
    booking: {},
    loading: false,
    error: null,
  };
  
  const bookingDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case RETRIEVE_BOOKING_START:
        return {
          ...state,
          loading: true,
        };
      case RETRIEVE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          booking: action.payload,
        };
      case RETRIEVE_BOOKING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bookingDetailsReducer;
  