// Actions related to batch adjusting inventory quantities.
import axios from 'axios';
import {
  BATCH_ADJUST_INVENTORY_START,
  BATCH_ADJUST_INVENTORY_SUCCESS,
  BATCH_ADJUST_INVENTORY_FAILURE,
  CLEAR_INVENTORY_ERRORS,
} from '../actionTypes';

// Action to clear any inventory-related errors
export const clearInventoryErrors = () => ({
  type: CLEAR_INVENTORY_ERRORS,
});

// Action to indicate the start of an inventory batch adjustment
export const batchAdjustInventoryStart = () => ({
  type: BATCH_ADJUST_INVENTORY_START,
});

// Action for successful batch adjustment of inventory
export const batchAdjustInventorySuccess = (counts) => ({
  type: BATCH_ADJUST_INVENTORY_SUCCESS,
  payload: counts,
});

// Action for handling failures in batch adjusting inventory
export const batchAdjustInventoryFailure = (error) => ({
  type: BATCH_ADJUST_INVENTORY_FAILURE,
  payload: error,
});

// Thunk function to perform batch inventory adjustments
export const batchAdjustInventory = (changes, locationId) => async (dispatch) => {
  dispatch(batchAdjustInventoryStart());
  try {
    const response = await axios.post('/api/inventory/batch-adjust', { changes, locationId });
    dispatch(batchAdjustInventorySuccess(response.data));
  } catch (error) {
    dispatch(batchAdjustInventoryFailure(error.message));
  }
};
