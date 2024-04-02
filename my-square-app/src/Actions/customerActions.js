// src/actions/customerActions.js
export const FETCH_CUSTOMERS_START = 'FETCH_CUSTOMERS_START'; 
export const FETCH_CUSTOMERS_SUCCESS = 'FETCH_CUSTOMERS_SUCCESS'; 
export const FETCH_CUSTOMERS_FAILURE = 'FETCH_CUSTOMERS_FAILURE'; 

export const fetchCustomersStart = () => ({
    type: FETCH_CUSTOMERS_START
});

export const fetchCustomersSuccess = (customers) => ({
    type: FETCH_CUSTOMERS_SUCCESS,
    payload: customers
});

export const fetchCustomersFailure = (error) => ({
    type: FETCH_CUSTOMERS_FAILURE,
    payload: error
});
