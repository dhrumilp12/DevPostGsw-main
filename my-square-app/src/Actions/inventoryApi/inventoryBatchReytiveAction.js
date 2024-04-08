import axios from 'axios';
import {
  BATCH_RETRIEVE_INVENTORY_COUNTS_START,
  BATCH_RETRIEVE_INVENTORY_COUNTS_SUCCESS,
  BATCH_RETRIEVE_INVENTORY_COUNTS_FAILURE,
} from '../actionTypes';

export const batchRetrieveInventoryCountsStart = () => ({
  type: BATCH_RETRIEVE_INVENTORY_COUNTS_START,
});

export const batchRetrieveInventoryCountsSuccess = (counts) => ({
  type: BATCH_RETRIEVE_INVENTORY_COUNTS_SUCCESS,
  payload: counts,
});

export const batchRetrieveInventoryCountsFailure = (error) => ({
  type: BATCH_RETRIEVE_INVENTORY_COUNTS_FAILURE,
  payload: error,
});

export const batchRetrieveInventoryCounts = (itemIds) => async (dispatch) => {
  dispatch(batchRetrieveInventoryCountsStart());
  try {
    const response = await axios.post('/api/inventory/batch-retrieve', { itemIds });
    dispatch(batchRetrieveInventoryCountsSuccess(response.data));
  } catch (error) {
    dispatch(batchRetrieveInventoryCountsFailure(error.message));
  }
};
