// src/reducers/paymentFormReducer.js
// Manages state for processing payments. Tracks the loading state, the payment details upon successful transaction, and any errors encountered during the payment process. It responds to start, success, and failure actions related to payment processing.

import { PROCESS_PAYMENT_START, PROCESS_PAYMENT_SUCCESS, PROCESS_PAYMENT_FAILURE } from '../../Actions/actionTypes.js';

const initialState = {
  payment: null,
  loading: false,
  error: null,
};

const paymentReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROCESS_PAYMENT_START:
      return {
        ...state,
        loading: true,
      };
    case PROCESS_PAYMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        payment: action.payload,
      };
    case PROCESS_PAYMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default paymentReducer;
