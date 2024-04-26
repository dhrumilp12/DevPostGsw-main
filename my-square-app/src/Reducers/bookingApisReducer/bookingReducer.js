// src/reducers/bookingReducer.js
// This reducer is responsible for creating new bookings. It manages the current booking being created, loading states, and potential errors. It also handles clearing errors explicitly through the CLEAR_BOOKING_ERROR action.
import { CREATE_BOOKING_START, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE,CLEAR_BOOKING_ERROR } from '../../Actions/actionTypes.js';

const initialState = {
  booking: null,
  loading: false,
  error: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_BOOKING_START:
      return {
        ...state,
        loading: true,
        error: null,
        booking: null, // Reset the booking state on new submission
      };
      case CREATE_BOOKING_SUCCESS:
        return {
          ...state,
          loading: false,
          booking: action.payload,
          error: null,
        };
      case CREATE_BOOKING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          booking: null,
        };
      case CLEAR_BOOKING_ERROR:
  return {
    ...state,
    error: null,};
    default:
      return state;
  }
};

export default bookingReducer;
