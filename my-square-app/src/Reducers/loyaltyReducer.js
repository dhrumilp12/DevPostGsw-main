// src/reducers/loyaltyReducer.js
import { FETCH_LOYALTY_ACCOUNTS_START, FETCH_LOYALTY_ACCOUNTS_SUCCESS, FETCH_LOYALTY_ACCOUNTS_FAILURE } from '../Actions/actionTypes.js';

const initialState = {
  accounts: [],
  loading: false,
  error: null,
};

const loyaltyReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LOYALTY_ACCOUNTS_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_LOYALTY_ACCOUNTS_SUCCESS:
      return {
        ...state,
        loading: false,
        accounts: action.payload,
      };
    case FETCH_LOYALTY_ACCOUNTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default loyaltyReducer;
