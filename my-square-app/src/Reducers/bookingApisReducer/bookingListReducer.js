import {
    FETCH_BOOKINGS_START,
    FETCH_BOOKINGS_SUCCESS,
    FETCH_BOOKINGS_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    bookings: [],
    loading: false,
    error: null,
  };
  
  const bookingsListReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BOOKINGS_START:
        return {
          ...state,
          loading: true,
        };
      case FETCH_BOOKINGS_SUCCESS:
        return {
          ...state,
          loading: false,
          bookings: action.payload,
        };
      case FETCH_BOOKINGS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default bookingsListReducer;
  