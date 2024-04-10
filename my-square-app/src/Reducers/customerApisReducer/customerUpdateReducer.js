// src/reducers/customerReducer.js
import {
    UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILURE,
  } from '../../Actions/actionTypes';
  
 // src/reducers/customerReducer.js
const initialState = {
  customer: null,
  loading: false,
  error: null,
  success: false, // Add success property
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_CUSTOMER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
        success: false, // Reset success to false on request
      };
    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        loading: false,
        customer: action.payload,
        success: true, // Set success to true on success
      };
    case UPDATE_CUSTOMER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false, // Reset success to false on failure
      };
    default:
      return state;
  }
};

export default customerReducer;
