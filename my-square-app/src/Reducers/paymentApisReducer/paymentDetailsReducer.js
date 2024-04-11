import {
    FETCH_PAYMENT_DETAILS_START,
    FETCH_PAYMENT_DETAILS_SUCCESS,
    FETCH_PAYMENT_DETAILS_FAILURE,
} from '../../Actions/actionTypes';

// In paymentDetailsReducer.js
const initialState = {
    loading: false,
    paymentDetails: {},
    error: null,
  };
  
  const paymentDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'FETCH_PAYMENT_DETAILS_START':
        return {
          ...state,
          loading: true,
        };
      case 'FETCH_PAYMENT_DETAILS_SUCCESS':
        return {
          ...state,
          loading: false,
          paymentDetails: action.payload,
        };
      case 'FETCH_PAYMENT_DETAILS_FAILURE':
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default paymentDetailsReducer;
  