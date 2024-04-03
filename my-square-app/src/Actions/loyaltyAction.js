// src/actions/loyaltyActions.js
import axios from 'axios';
import { FETCH_LOYALTY_ACCOUNTS_START, FETCH_LOYALTY_ACCOUNTS_SUCCESS, FETCH_LOYALTY_ACCOUNTS_FAILURE } from './actionTypes.js';

export const fetchLoyaltyAccountsStart = () => ({
  type: FETCH_LOYALTY_ACCOUNTS_START,
});

export const fetchLoyaltyAccountsSuccess = accounts => ({
  type: FETCH_LOYALTY_ACCOUNTS_SUCCESS,
  payload: accounts,
});

export const fetchLoyaltyAccountsFailure = error => ({
  type: FETCH_LOYALTY_ACCOUNTS_FAILURE,
  payload: error,
});

export const fetchLoyaltyAccounts = () => async dispatch => {
  dispatch(fetchLoyaltyAccountsStart());
  try {
    const response = await axios.get('/api/loyalty/accounts');
    dispatch(fetchLoyaltyAccountsSuccess(response.data));
  } catch (error) {
    dispatch(fetchLoyaltyAccountsFailure(error.message));
  }
};
