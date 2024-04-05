// src/reducers/customerReducer.js
import {
    UPDATE_CUSTOMER_REQUEST,
    UPDATE_CUSTOMER_SUCCESS,
    UPDATE_CUSTOMER_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    customer: null,
    loading: false,
    error: null,
  };
  
  const customerReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CUSTOMER_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case UPDATE_CUSTOMER_SUCCESS:
        return {
          ...state,
          loading: false,
          customer: action.payload,
        };
      case UPDATE_CUSTOMER_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default customerReducer;
  