// src/actions/customerActions.js
import axios from 'axios';
import {
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
} from '../actionTypes.js';

export const updateCustomerRequest = () => ({
  type: UPDATE_CUSTOMER_REQUEST,
});

export const updateCustomerSuccess = (customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const updateCustomerFailure = (error) => ({
  type: UPDATE_CUSTOMER_FAILURE,
  payload: error,
});

export const updateCustomer = (customerId, customerData) => async (dispatch) => {
  dispatch(updateCustomerRequest());
  try {
    const response = await axios.put(`/api/customers/update-customer/${customerId}`, customerData);
    dispatch(updateCustomerSuccess(response.data));
  } catch (error) {
    dispatch(updateCustomerFailure(error.response?.data?.error || 'Unknown error'));
  }
};
