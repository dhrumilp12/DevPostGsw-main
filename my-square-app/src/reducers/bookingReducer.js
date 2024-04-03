// src/reducers/bookingReducer.js
import { CREATE_BOOKING_START, CREATE_BOOKING_SUCCESS, CREATE_BOOKING_FAILURE } from '../Actions/actionTypes.js';

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
      };
    case CREATE_BOOKING_SUCCESS:
      return {
        ...state,
        loading: false,
        booking: action.payload,
      };
    case CREATE_BOOKING_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default bookingReducer;
