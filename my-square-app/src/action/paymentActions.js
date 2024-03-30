// src/actions/paymentActions.js 
export const PROCESS_PAYMENT_START = 'PROCESS_PAYMENT_START';
export const PROCESS_PAYMENT_SUCCESS = 'PROCESS_PAYMENT_SUCCESS';
export const PROCESS_PAYMENT_FAILURE = 'PROCESS_PAYMENT_FAILURE';

export const processPaymentStart = () => ({
    type: PROCESS_PAYMENT_START
});

export const processPaymentSuccess = (paymentInfo) => ({
    type: PROCESS_PAYMENT_SUCCESS,
    payload: paymentInfo 
});

export const processPaymentFailure = (error) => ({
    type: PROCESS_PAYMENT_FAILURE,
    payload: error 
});