import {
    FETCH_ORDER_DETAILS_START,
    FETCH_ORDER_DETAILS_SUCCESS,
    FETCH_ORDER_DETAILS_FAILURE,
    CONFIRM_ORDER_START,
    CONFIRM_ORDER_SUCCESS,
    CONFIRM_ORDER_FAILURE,
  } from '../Actions/orderConfirmationAction';
  
  const initialState = {
    orderDetails: null,
    confirmationDetails: null,
    loading: false,
    error: null,
  };
  
  const orderConfirmationReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_ORDER_DETAILS_START:
        return { ...state, loading: true, error: null };
      case FETCH_ORDER_DETAILS_SUCCESS:
        return { ...state, orderDetails: action.payload, loading: false };
      case FETCH_ORDER_DETAILS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      case CONFIRM_ORDER_START:
        return { ...state, loading: true };
      case CONFIRM_ORDER_SUCCESS:
        return { ...state, confirmationDetails: action.payload, loading: false };
      case CONFIRM_ORDER_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default orderConfirmationReducer;
  