import axios from 'axios';
import {
  PROCESS_PAYMENT_START,
  PROCESS_PAYMENT_SUCCESS,
  PROCESS_PAYMENT_FAILURE,
  FETCH_PAYMENTS_HISTORY_START,
  FETCH_PAYMENTS_HISTORY_SUCCESS,
  FETCH_PAYMENTS_HISTORY_FAILURE,
  REFUND_PAYMENT_START,
  REFUND_PAYMENT_SUCCESS,
  REFUND_PAYMENT_FAILURE,
  FETCH_PAYMENT_DETAILS_START,
  FETCH_PAYMENT_DETAILS_SUCCESS,
  FETCH_PAYMENT_DETAILS_FAILURE
} from '../actionTypes.js';

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

export const processPayment = (paymentData) => async (dispatch) => {
  dispatch(processPaymentStart());
  try {
    const response = await axios.post('/api/payments/process-payment', paymentData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    dispatch(processPaymentSuccess(response.data));
  } catch (error) {
    dispatch(processPaymentFailure(error.response?.data?.errors || error.message));
  }
};


export const fetchPaymentsHistoryStart = () => ({
  type: FETCH_PAYMENTS_HISTORY_START,
});

export const fetchPaymentsHistorySuccess = payments => ({
  type: FETCH_PAYMENTS_HISTORY_SUCCESS,
  payload: payments,
});

export const fetchPaymentsHistoryFailure = error => ({
  type: FETCH_PAYMENTS_HISTORY_FAILURE,
  payload: error,
});

export const fetchPaymentsHistory = () => async dispatch => {
  dispatch(fetchPaymentsHistoryStart());
  try {
    const response = await axios.get('/api/payments/list-payments');
    dispatch(fetchPaymentsHistorySuccess(response.data));
  } catch (error) {
    dispatch(fetchPaymentsHistoryFailure(error.message));
  }
};

export const refundPaymentStart = () => ({
  type: REFUND_PAYMENT_START,
});

export const refundPaymentSuccess = payment => ({
  type: REFUND_PAYMENT_SUCCESS,
  payload: payment,
});

export const refundPaymentFailure = error => ({
  type: REFUND_PAYMENT_FAILURE,
  payload: error,
});

export const fetchPaymentDetailsStart = () => ({
  type: FETCH_PAYMENT_DETAILS_START,
});

export const fetchPaymentDetailsSuccess = paymentDetails => ({
  type: FETCH_PAYMENT_DETAILS_SUCCESS,
  payload: paymentDetails,
});

export const fetchPaymentDetailsFailure = error => ({
  type: FETCH_PAYMENT_DETAILS_FAILURE,
  payload: error,
});

export const fetchPaymentDetails = (paymentId) => async (dispatch) => {
  try {
    const response = await axios.get(`/api/payments/payment-details/${paymentId}`);
    dispatch({
      type: 'FETCH_PAYMENT_DETAILS_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    dispatch(fetchPaymentDetailsFailure(error.toString()));
  }
};