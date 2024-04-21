import {
    BATCH_RETRIEVE_INVENTORY_COUNTS_START,
    BATCH_RETRIEVE_INVENTORY_COUNTS_SUCCESS,
    BATCH_RETRIEVE_INVENTORY_COUNTS_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    counts: [],
    loading: false,
    error: null,
  };
  
  const inventoryCountsReducer = (state = initialState, action) => {
    switch (action.type) {
      case BATCH_RETRIEVE_INVENTORY_COUNTS_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case BATCH_RETRIEVE_INVENTORY_COUNTS_SUCCESS:
        return {
          ...state,
          loading: false,
          counts: action.payload,
          error: null,
        };
      case BATCH_RETRIEVE_INVENTORY_COUNTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default inventoryCountsReducer;
  