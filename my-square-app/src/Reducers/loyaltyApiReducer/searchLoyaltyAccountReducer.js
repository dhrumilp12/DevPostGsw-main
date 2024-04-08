import {
    SEARCH_LOYALTY_ACCOUNTS_START,
    SEARCH_LOYALTY_ACCOUNTS_SUCCESS,
    SEARCH_LOYALTY_ACCOUNTS_FAILURE
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    accounts: [],
    error: null
  };
  
  const searchLoyaltyAccountsReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_LOYALTY_ACCOUNTS_START:
        return {
          ...state,
          loading: true
        };
      case SEARCH_LOYALTY_ACCOUNTS_SUCCESS:
        return {
          ...state,
          loading: false,
          accounts: action.payload
        };
      case SEARCH_LOYALTY_ACCOUNTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default searchLoyaltyAccountsReducer;
  