// src/actions/customerUpdateActions.js
import axios from 'axios';
import {
  UPDATE_CUSTOMER_REQUEST,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAILURE,
} from '../actionTypes.js';

// Action to start the process of updating a customer
export const updateCustomerRequest = () => ({
  type: UPDATE_CUSTOMER_REQUEST,
});

// Action for successful update of a customer's details
export const updateCustomerSuccess = (customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
});

// Action for handling failures during customer update
export const updateCustomerFailure = (error) => ({
  type: UPDATE_CUSTOMER_FAILURE,
  payload: error,
});

// Thunk function to update a customer's details by customer ID
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