import axios from 'axios';

// Action Types
export const FETCH_ORDER_DETAILS_START = 'FETCH_ORDER_DETAILS_START';
export const FETCH_ORDER_DETAILS_SUCCESS = 'FETCH_ORDER_DETAILS_SUCCESS';
export const FETCH_ORDER_DETAILS_FAILURE = 'FETCH_ORDER_DETAILS_FAILURE';
export const CONFIRM_ORDER_START = 'CONFIRM_ORDER_START';
export const CONFIRM_ORDER_SUCCESS = 'CONFIRM_ORDER_SUCCESS';
export const CONFIRM_ORDER_FAILURE = 'CONFIRM_ORDER_FAILURE';
// Consider adding additional action types for post-purchase processes if needed

// Action Creators
const fetchOrderDetailsStart = () => ({
  type: FETCH_ORDER_DETAILS_START,
});

const fetchOrderDetailsSuccess = (orderDetails) => ({
  type: FETCH_ORDER_DETAILS_SUCCESS,
  payload: orderDetails,
});

const fetchOrderDetailsFailure = (error) => ({
  type: FETCH_ORDER_DETAILS_FAILURE,
  payload: error,
});

const confirmOrderStart = () => ({
  type: CONFIRM_ORDER_START,
});

const confirmOrderSuccess = (confirmationDetails) => ({
  type: CONFIRM_ORDER_SUCCESS,
  payload: confirmationDetails,
});

const confirmOrderFailure = (error) => ({
  type: CONFIRM_ORDER_FAILURE,
  payload: error,
});

// Async Action Creators
export const fetchOrderDetails = (orderId) => async (dispatch) => {
  dispatch(fetchOrderDetailsStart());
  try {
    const response = await axios.get(`/api/orders/${orderId}`);
    dispatch(fetchOrderDetailsSuccess(response.data));
  } catch (error) {
    dispatch(fetchOrderDetailsFailure(error.response ? error.response.data : error.message));
  }
};

export const confirmOrder = (orderId) => async (dispatch) => {
  dispatch(confirmOrderStart());
  try {
    const response = await axios.post(`/api/orders/confirm/${orderId}`);
    dispatch(confirmOrderSuccess(response.data));
    // Consider dispatching additional actions for post-purchase processes here
  } catch (error) {
    dispatch(confirmOrderFailure(error.response ? error.response.data : error.message));
  }
};

// Include additional async action creators for any post-purchase processes here
