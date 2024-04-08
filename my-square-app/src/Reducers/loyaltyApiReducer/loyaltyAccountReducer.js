import {
    CREATE_LOYALTY_ACCOUNT_START,
    CREATE_LOYALTY_ACCOUNT_SUCCESS,
    CREATE_LOYALTY_ACCOUNT_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loyaltyAccount: null,
    loading: false,
    error: null,
  };
  
  const loyaltyAccountReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_LOYALTY_ACCOUNT_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_LOYALTY_ACCOUNT_SUCCESS:
        return {
          ...state,
          loading: false,
          loyaltyAccount: action.payload,
        };
      case CREATE_LOYALTY_ACCOUNT_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default loyaltyAccountReducer;
  