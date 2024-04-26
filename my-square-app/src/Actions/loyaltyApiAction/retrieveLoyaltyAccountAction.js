import axios from 'axios';
import {
  RETRIEVE_LOYALTY_ACCOUNT_START,
  RETRIEVE_LOYALTY_ACCOUNT_SUCCESS,
  RETRIEVE_LOYALTY_ACCOUNT_FAILURE,
} from '../actionTypes';

// Action to start the process of retrieving a loyalty account
export const retrieveLoyaltyAccountStart = () => ({
  type: RETRIEVE_LOYALTY_ACCOUNT_START,
});

// Action to handle successful retrieval of a loyalty account
export const retrieveLoyaltyAccountSuccess = (account) => ({
  type: RETRIEVE_LOYALTY_ACCOUNT_SUCCESS,
  payload: account,
});

// Action to handle failure in retrieving a loyalty account
export const retrieveLoyaltyAccountFailure = (error) => ({
  type: RETRIEVE_LOYALTY_ACCOUNT_FAILURE,
  payload: error,
});

// Thunk function to retrieve a loyalty account using account ID
export const retrieveLoyaltyAccount = (accountId) => async (dispatch) => {
  dispatch(retrieveLoyaltyAccountStart());
  try {
    const response = await axios.get(`/api/loyalty/accounts/${accountId}`);
    dispatch(retrieveLoyaltyAccountSuccess(response.data));
  } catch (error) {
    dispatch(retrieveLoyaltyAccountFailure(error.message));
  }
};
