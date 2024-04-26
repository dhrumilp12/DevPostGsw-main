//Will work on it.
// Manages state for accumulating loyalty points. It updates state to indicate loading during processing, captures accumulated events on success, and stores any errors that occur.

import {
    ACCUMULATE_LOYALTY_POINTS_START,
    ACCUMULATE_LOYALTY_POINTS_SUCCESS,
    ACCUMULATE_LOYALTY_POINTS_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    events: [],
    error: null,
  };
  
  const accumulateLoyaltyPointsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ACCUMULATE_LOYALTY_POINTS_START:
        return {
          ...state,
          loading: true,
        };
      case ACCUMULATE_LOYALTY_POINTS_SUCCESS:
        return {
          ...state,
          loading: false,
          events: action.payload.events,
          error: null,
        };
      case ACCUMULATE_LOYALTY_POINTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default accumulateLoyaltyPointsReducer;
  