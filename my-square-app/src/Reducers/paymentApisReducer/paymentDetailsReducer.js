import { createReducer } from '@reduxjs/toolkit';
import {
    FETCH_PAYMENT_DETAILS_START,
    FETCH_PAYMENT_DETAILS_SUCCESS,
    FETCH_PAYMENT_DETAILS_FAILURE,
} from '../../Actions/actionTypes';

const initialState = {
    data: null,
    loading: false,
    error: null,
  };
  
  // Assuming you are using Redux Toolkit, the `createReducer` function allows you to write a reducer that handles actions with a map/object notation
  // Replace 'createReducer' with the actual import if you are using Redux Toolkit or any other utility function to create reducers
  const paymentDetailsReducer = createReducer(initialState, (builder) => {
    builder
      .addCase(FETCH_PAYMENT_DETAILS_START, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(FETCH_PAYMENT_DETAILS_SUCCESS, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(FETCH_PAYMENT_DETAILS_FAILURE, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  });
  
  export default paymentDetailsReducer;