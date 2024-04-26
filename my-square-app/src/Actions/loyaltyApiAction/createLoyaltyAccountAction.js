import axios from 'axios';
import {
  CREATE_LOYALTY_ACCOUNT_START,
  CREATE_LOYALTY_ACCOUNT_SUCCESS,
  CREATE_LOYALTY_ACCOUNT_FAILURE,
} from '../actionTypes';

// Action to indicate the start of creating a loyalty account
export const createLoyaltyAccountStart = () => ({
  type: CREATE_LOYALTY_ACCOUNT_START,
});

// Action for handling successful creation of a loyalty account
export const createLoyaltyAccountSuccess = (account) => ({
  type: CREATE_LOYALTY_ACCOUNT_SUCCESS,
  payload: account,
});

// Action for handling failures in creating a loyalty account
export const createLoyaltyAccountFailure = (error) => ({
  type: CREATE_LOYALTY_ACCOUNT_FAILURE,
  payload: error,
});

// Thunk function to create a loyalty account with given account data
export const createLoyaltyAccount = (accountData) => async (dispatch) => {
  dispatch(createLoyaltyAccountStart());
  try {
    const response = await axios.post('/api/loyalty/accounts', accountData);
    dispatch(createLoyaltyAccountSuccess(response.data));
  } catch (error) {
    dispatch(createLoyaltyAccountFailure(error.message));
  }
};
