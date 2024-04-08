import {
    BATCH_ADJUST_INVENTORY_START,
    BATCH_ADJUST_INVENTORY_SUCCESS,
    BATCH_ADJUST_INVENTORY_FAILURE,
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
        };
      case BATCH_ADJUST_INVENTORY_SUCCESS:
        return {
          ...state,
          loading: false,
          counts: action.payload,
        };
      case BATCH_ADJUST_INVENTORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default inventoryAdjustmentReducer;
  