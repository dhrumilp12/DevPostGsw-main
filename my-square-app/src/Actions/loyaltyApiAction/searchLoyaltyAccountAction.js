import axios from 'axios';
import {
  SEARCH_LOYALTY_ACCOUNTS_START,
  SEARCH_LOYALTY_ACCOUNTS_SUCCESS,
  SEARCH_LOYALTY_ACCOUNTS_FAILURE,
} from '../actionTypes';

// Action to start the search for loyalty accounts
export const searchLoyaltyAccountsStart = () => ({
  type: SEARCH_LOYALTY_ACCOUNTS_START,
});

// Action for successful search of loyalty accounts
export const searchLoyaltyAccountsSuccess = (accounts) => ({
  type: SEARCH_LOYALTY_ACCOUNTS_SUCCESS,
  payload: accounts,
});

// Action for handling failures in searching for loyalty accounts
export const searchLoyaltyAccountsFailure = (error) => ({
  type: SEARCH_LOYALTY_ACCOUNTS_FAILURE,
  payload: error,
});

// Thunk function to search for loyalty accounts based on given criteria
export const searchLoyaltyAccounts = (searchCriteria) => async (dispatch) => {
  dispatch(searchLoyaltyAccountsStart());
  try {
    const response = await axios.post('/api/loyalty/accounts/search', searchCriteria);
    dispatch(searchLoyaltyAccountsSuccess(response.data));
  } catch (error) {
    dispatch(searchLoyaltyAccountsFailure(error.message));
  }
};
