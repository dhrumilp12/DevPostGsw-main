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
        };
      case UPDATE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          booking: action.payload,
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
  