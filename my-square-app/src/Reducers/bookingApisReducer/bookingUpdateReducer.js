// Manages the state for updating a booking. It tracks the loading state, the booking being updated, and any errors that occur. The state is updated based on the start, success, and failure of a booking update operation.
import {
    UPDATE_BOOKING_START,
    UPDATE_BOOKING_SUCCESS,
    UPDATE_BOOKING_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    booking: null,
    error: null,
  };
  
  const bookingUpdateReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_BOOKING_START:
        return {
          ...state,
          loading: true,
          error: null
        };
      case UPDATE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          booking: action.payload,
          error: null
        };
      case UPDATE_BOOKING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bookingUpdateReducer;
  