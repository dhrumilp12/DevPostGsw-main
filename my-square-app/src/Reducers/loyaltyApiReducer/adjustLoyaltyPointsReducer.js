//Will work on it.
// Manages state for adjusting loyalty points for a customer. Tracks loading state, adjustments data, and errors. It responds to actions for starting adjustments, successfully adjusting points, and handling failures.

import {
    ADJUST_LOYALTY_POINTS_START,
    ADJUST_LOYALTY_POINTS_SUCCESS,
    ADJUST_LOYALTY_POINTS_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    error: null,
    data: null,
  };
  
  const adjustLoyaltyPointsReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADJUST_LOYALTY_POINTS_START:
        return {
          ...state,
          loading: true,
        };
      case ADJUST_LOYALTY_POINTS_SUCCESS:
        return {
          ...state,
          loading: false,
          data: action.payload,
        };
      case ADJUST_LOYALTY_POINTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adjustLoyaltyPointsReducer;
  