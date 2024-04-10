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
  console.log("Updating customer with ID:", customerId, "Data:", customerData); // Log the payload
  try {
    const response = await axios.put(`/api/customers/update-customer/${customerId}`, customerData);
    if (response.data.errors) {
      console.error("Square API errors:", response.data.errors); // Log any errors from the Square API
    }
    dispatch(updateCustomerSuccess(response.data));
  } catch (error) {
    console.error("Error updating customer:", error); // Log any errors from the request
    dispatch(updateCustomerFailure(error.response?.data?.error || 'Unknown error'));
  }
};

