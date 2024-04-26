// Manages state for adjusting inventory counts in batch mode. Handles loading state, error information, and the updated inventory counts after adjustments. It responds to start, success, and failure actions of inventory adjustments and provides a mechanism to clear any existing errors.
import {
    BATCH_ADJUST_INVENTORY_START,
    BATCH_ADJUST_INVENTORY_SUCCESS,
    BATCH_ADJUST_INVENTORY_FAILURE,
    CLEAR_INVENTORY_ERRORS,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    counts: [],
    loading: false,
    error: null,
  };
  
  const inventoryAdjustmentReducer = (state = initialState, action) => {
    switch (action.type) {
      case BATCH_ADJUST_INVENTORY_START:
        return {
          ...state,
          loading: true,
          error:null,
        };
      case BATCH_ADJUST_INVENTORY_SUCCESS:
        return {
          ...state,
          loading: false,
          counts: action.payload,
          error:null,
        };
      case BATCH_ADJUST_INVENTORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
        case CLEAR_INVENTORY_ERRORS:
          return {
            ...state,
            error: null,
          };
        default:
          return state;
      }
  };
  
  export default inventoryAdjustmentReducer;
  