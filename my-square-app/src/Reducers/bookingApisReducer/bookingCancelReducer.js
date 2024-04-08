import {
    CANCEL_BOOKING_START,
    CANCEL_BOOKING_SUCCESS,
    CANCEL_BOOKING_FAILURE,
  } from '../../Actions/actionTypes.js';
  
  const initialState = {
    loading: false,
    booking: null,
    error: null,
  };
  
  const cancelBookingReducer = (state = initialState, action) => {
    switch (action.type) {
      case CANCEL_BOOKING_START:
        return {
          ...state,
          loading: true,
        };
      case CANCEL_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          booking: action.payload,
          error: null,
        };
      case CANCEL_BOOKING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default cancelBookingReducer;
  