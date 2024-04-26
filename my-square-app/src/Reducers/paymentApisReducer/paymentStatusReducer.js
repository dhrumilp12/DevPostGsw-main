// src/reducers/paymentStatusReducer.js
// Manages state related to the status of payment processing. It handles loading state, success status, and error management during payment processing. Updates state accordingly based on the lifecycle of a payment transaction: start, success, and failure.

import {
    PROCESS_PAYMENT_START,
    PROCESS_PAYMENT_SUCCESS,
    PROCESS_PAYMENT_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    error: null,
    success: false,
  };
  
  const paymentStatusReducer = (state = initialState, action) => {
    switch (action.type) {
      case PROCESS_PAYMENT_START:
        return {
          ...state,
          loading: true,
          error: null,
          success: false,
        };
      case PROCESS_PAYMENT_SUCCESS:
        return {
          ...state,
          loading: false,
          error: null,
          success: true,
        };
      case PROCESS_PAYMENT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
          success: false,
        };
      default:
        return state;
    }
  };
  
  export default paymentStatusReducer;
  