// Action creators
import axios from 'axios';
import {FETCH_CUSTOMER_DETAILS_REQUEST, FETCH_CUSTOMER_DETAILS_FAILURE, FETCH_CUSTOMER_DETAILS_SUCCESS,} from '../actionTypes.js';
export const fetchCustomerDetailsRequest = () => ({
    type: FETCH_CUSTOMER_DETAILS_REQUEST,
  });
  
  export const fetchCustomerDetailsSuccess = (customer) => ({
    type: FETCH_CUSTOMER_DETAILS_SUCCESS,
    payload: customer,
  });
  
  export const fetchCustomerDetailsFailure = (error) => ({
    type: FETCH_CUSTOMER_DETAILS_FAILURE,
    payload: error,
  });
  
  // Async action creator for fetching customer details
  export const fetchCustomerDetails = (customerId) => {
    return async (dispatch) => {
      dispatch(fetchCustomerDetailsRequest());
      try {
        const response = await axios.get(`/api/customers/customer-details/${customerId}`);
        dispatch(fetchCustomerDetailsSuccess(response.data));
      } catch (error) {
        dispatch(fetchCustomerDetailsFailure(error.response?.data?.error || 'Unknown error'));
      }
    };
  };