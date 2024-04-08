import axios from 'axios';
import {
  SEARCH_LOYALTY_ACCOUNTS_START,
  SEARCH_LOYALTY_ACCOUNTS_SUCCESS,
  SEARCH_LOYALTY_ACCOUNTS_FAILURE,
} from '../actionTypes';

// Action to start the search
export const searchLoyaltyAccountsStart = () => ({
  type: SEARCH_LOYALTY_ACCOUNTS_START,
});

// Action called if the search is successful
export const searchLoyaltyAccountsSuccess = (accounts) => ({
  type: SEARCH_LOYALTY_ACCOUNTS_SUCCESS,
  payload: accounts,
});

// Action called if the search fails
export const searchLoyaltyAccountsFailure = (error) => ({
  type: SEARCH_LOYALTY_ACCOUNTS_FAILURE,
  payload: error,
});

// Async action to perform the search
export const searchLoyaltyAccounts = (searchCriteria) => async (dispatch) => {
  dispatch(searchLoyaltyAccountsStart());
  try {
    const response = await axios.post('/api/loyalty/accounts/search', searchCriteria);
    dispatch(searchLoyaltyAccountsSuccess(response.data));
  } catch (error) {
    dispatch(searchLoyaltyAccountsFailure(error.message));
  }
};
