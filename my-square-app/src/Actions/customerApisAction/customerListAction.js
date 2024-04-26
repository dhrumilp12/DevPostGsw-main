// src/actions/customerActions.js
import axios from 'axios';
import { FETCH_CUSTOMERS_START, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE } from '../actionTypes.js';

// Action to indicate the start of fetching customers
export const fetchCustomersStart = () => ({
  type: FETCH_CUSTOMERS_START,
});

// Action to handle the successful fetching of customers
export const fetchCustomersSuccess = customers => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  payload: customers,
});

// Action to handle errors during fetching of customers
export const fetchCustomersFailure = error => ({
  type: FETCH_CUSTOMERS_FAILURE,
  payload: error,
});

// Thunk action to fetch customers, optionally using a cursor for pagination
export const fetchCustomers = (cursor = '') => async dispatch => {
  dispatch(fetchCustomersStart());
  try {
    const response = await axios.get(`/api/customers/list-customers${cursor ? `?cursor=${cursor}` : ''}`);
    console.log("Response data:", response.data);
   
    dispatch(fetchCustomersSuccess(response.data));

  } catch (error) {
    dispatch(fetchCustomersFailure(error.message));
  }
};