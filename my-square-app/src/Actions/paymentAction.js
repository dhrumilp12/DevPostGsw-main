// src/actions/paymentActions.js
import axios from 'axios';
import { PROCESS_PAYMENT_START, PROCESS_PAYMENT_SUCCESS, PROCESS_PAYMENT_FAILURE } from './actionTypes.js';

export const processPaymentStart = () => ({
  type: PROCESS_PAYMENT_START,
});

export const processPaymentSuccess = payment => ({
  type: PROCESS_PAYMENT_SUCCESS,
  payload: payment,
});

export const processPaymentFailure = error => ({
  type: PROCESS_PAYMENT_FAILURE,
  payload: error,
});

export const processPayment = (paymentData) => async dispatch => {
  dispatch(processPaymentStart());
  try {
    const response = await axios.post('/api/payments/process-payment', paymentData);
    dispatch(processPaymentSuccess(response.data));
  } catch (error) {
    dispatch(processPaymentFailure(error.message));
  }
};

