// Import the action types
import {
    PROCESS_PAYMENT_START,
    PROCESS_PAYMENT_SUCCESS,
    PROCESS_PAYMENT_FAILURE
  } from '../action/paymentActions';
  
  // Define the initial state
  const initialState = {
    loading: false,
    error: null,
    paymentInfo: null,
  };
  
  // Define the reducer function
  const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
      // Handle the start of payment processing
      case PROCESS_PAYMENT_START:
        return { ...state, loading: true, error: null }; // Start loading and clear errors
  
      // Handle the successful payment processing
      case PROCESS_PAYMENT_SUCCESS:
        return { ...state, loading: false, paymentInfo: action.payload, error: null }; // Stop loading, store payment info, clear errors
  
      // Handle the failed payment processing
      case PROCESS_PAYMENT_FAILURE:
        return { ...state, loading: false, paymentInfo: null, error: action.payload }; // Stop loading, clear payment info, store error
  
      // Return the current state for all other actions
      default:
        return state;
    }
  };
  
  // Export the reducer
  export default paymentReducer;
  