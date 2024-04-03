// src/actions/inventoryActions.js
import axios from 'axios';
import { FETCH_INVENTORY_START, FETCH_INVENTORY_SUCCESS, FETCH_INVENTORY_FAILURE } from './actionTypes.js';

export const fetchInventoryStart = () => ({
  type: FETCH_INVENTORY_START,
});

export const fetchInventorySuccess = inventory => ({
  type: FETCH_INVENTORY_SUCCESS,
  payload: inventory,
});

export const fetchInventoryFailure = error => ({
  type: FETCH_INVENTORY_FAILURE,
  payload: error,
});

export const fetchInventory = () => async dispatch => {
  dispatch(fetchInventoryStart());
  try {
    const response = await axios.get('/api/inventory/list');
    dispatch(fetchInventorySuccess(response.data));
  } catch (error) {
    dispatch(fetchInventoryFailure(error.message));
  }
};
