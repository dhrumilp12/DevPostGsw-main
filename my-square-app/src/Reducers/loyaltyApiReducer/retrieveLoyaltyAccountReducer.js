import {
    RETRIEVE_LOYALTY_ACCOUNT_START,
    RETRIEVE_LOYALTY_ACCOUNT_SUCCESS,
    RETRIEVE_LOYALTY_ACCOUNT_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    account: null,
    error: null,
  };
  
  const retrieveLoyaltyAccountReducer = (state = initialState, action) => {
    switch (action.type) {
      case RETRIEVE_LOYALTY_ACCOUNT_START:
        return { ...state, loading: true };
      case RETRIEVE_LOYALTY_ACCOUNT_SUCCESS:
        return { ...state, loading: false, account: action.payload };
      case RETRIEVE_LOYALTY_ACCOUNT_FAILURE:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export default retrieveLoyaltyAccountReducer;
  