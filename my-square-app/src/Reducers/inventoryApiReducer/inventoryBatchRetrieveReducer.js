// Handles state for batch retrieval of inventory counts. This reducer manages loading states, the retrieved inventory counts, and errors. It updates state based on the lifecycle of inventory counts retrieval: start, success, and failure.
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
  