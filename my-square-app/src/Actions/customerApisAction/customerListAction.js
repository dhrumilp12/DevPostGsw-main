// src/actions/customerActions.js
import axios from 'axios';
import { FETCH_CUSTOMERS_START, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE } from '../actionTypes.js';

export const fetchCustomersStart = () => ({
  type: FETCH_CUSTOMERS_START,
});

export const fetchCustomersSuccess = customers => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  payload: customers,
});

export const fetchCustomersFailure = error => ({
  type: FETCH_CUSTOMERS_FAILURE,
  payload: error,
});

export const fetchCustomers = (cursor = '') => async dispatch => {
  dispatch(fetchCustomersStart());
  try {
    const response = await axios.get(`/api/customers/list-customers${cursor ? `?cursor=${cursor}` : ''}`);
    dispatch(fetchCustomersSuccess(response.data.customers)); // Assuming the response data has a `customers` field
    // If you want to handle pagination, you can also dispatch the cursor value here, for example:
    // dispatch(setNextPageCursor(response.data.cursor));
  } catch (error) {
    dispatch(fetchCustomersFailure(error.message));
  }
};
