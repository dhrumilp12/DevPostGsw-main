// src/reducers/paymentHistoryReducer.js
// Handles the state for fetching the history of payments. This reducer manages the loading state, stores an array of payment transactions, and handles errors. It processes actions related to the start, successful retrieval, and failure of fetching payment history.

import {
    FETCH_PAYMENTS_HISTORY_START,
    FETCH_PAYMENTS_HISTORY_SUCCESS,
    FETCH_PAYMENTS_HISTORY_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    payments: [],
    loading: false,
    error: null,
  };
  
  const paymentHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_PAYMENTS_HISTORY_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case FETCH_PAYMENTS_HISTORY_SUCCESS:
        return {
          ...state,
          loading: false,
          payments: action.payload,
          error: null,
        };
      case FETCH_PAYMENTS_HISTORY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default paymentHistoryReducer;
  