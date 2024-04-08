import axios from 'axios';
import {
  BATCH_ADJUST_INVENTORY_START,
  BATCH_ADJUST_INVENTORY_SUCCESS,
  BATCH_ADJUST_INVENTORY_FAILURE,
} from '../actionTypes';

export const batchAdjustInventoryStart = () => ({
  type: BATCH_ADJUST_INVENTORY_START,
});

export const batchAdjustInventorySuccess = (counts) => ({
  type: BATCH_ADJUST_INVENTORY_SUCCESS,
  payload: counts,
});

export const batchAdjustInventoryFailure = (error) => ({
  type: BATCH_ADJUST_INVENTORY_FAILURE,
  payload: error,
});

export const batchAdjustInventory = (changes, locationId) => async (dispatch) => {
  dispatch(batchAdjustInventoryStart());
  try {
    const response = await axios.post('/api/inventory/batch-adjust', { changes, locationId });
    dispatch(batchAdjustInventorySuccess(response.data));
  } catch (error) {
    dispatch(batchAdjustInventoryFailure(error.message));
  }
};
