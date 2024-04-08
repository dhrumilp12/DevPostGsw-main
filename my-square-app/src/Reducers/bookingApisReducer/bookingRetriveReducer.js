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
  