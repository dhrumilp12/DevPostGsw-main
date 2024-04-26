// src/reducers/customerDetailsReducer.js
// Manages state for fetching individual customer details. This reducer handles loading states, the fetched customer data, and errors. It processes actions for starting the fetch, successfully receiving data, and handling any errors that occur during the fetch process.

import {
    FETCH_CUSTOMER_DETAILS_REQUEST,
    FETCH_CUSTOMER_DETAILS_SUCCESS,
    FETCH_CUSTOMER_DETAILS_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    customer: {},
    error: null,
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CUSTOMER_DETAILS_REQUEST:
        return {
          ...state,
          loading: true,
        };
      case FETCH_CUSTOMER_DETAILS_SUCCESS:
        return {
          ...state,
          loading: false,
          customer: action.payload,
          error: null,
        };
      case FETCH_CUSTOMER_DETAILS_FAILURE:
        return {
          ...state,
          loading: false,
          customer: {},
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default customerReducer;
  