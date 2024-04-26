// Actions for batch retrieval of inventory counts.
import axios from 'axios';
import {
  BATCH_RETRIEVE_INVENTORY_COUNTS_START,
  BATCH_RETRIEVE_INVENTORY_COUNTS_SUCCESS,
  BATCH_RETRIEVE_INVENTORY_COUNTS_FAILURE,
} from '../actionTypes';

// Action to start the process of batch retrieving inventory counts
export const batchRetrieveInventoryCountsStart = () => ({
  type: BATCH_RETRIEVE_INVENTORY_COUNTS_START,
});

// Action for successful batch retrieval of inventory counts
export const batchRetrieveInventoryCountsSuccess = (counts) => ({
  type: BATCH_RETRIEVE_INVENTORY_COUNTS_SUCCESS,
  payload: counts,
});

// Action for handling failures in batch retrieving inventory counts
export const batchRetrieveInventoryCountsFailure = (error) => ({
  type: BATCH_RETRIEVE_INVENTORY_COUNTS_FAILURE,
  payload: error,
});

// Thunk function to retrieve inventory counts for specific item IDs
export const batchRetrieveInventoryCounts = (itemIds) => async (dispatch) => {
  dispatch(batchRetrieveInventoryCountsStart());
  try {
    const response = await axios.post('/api/inventory/batch-retrieve', { itemIds });
    dispatch(batchRetrieveInventoryCountsSuccess(response.data));
  } catch (error) {
    dispatch(batchRetrieveInventoryCountsFailure(error.message));
  }
};
