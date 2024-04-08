import axios from 'axios';
import {
  CREATE_LOYALTY_ACCOUNT_START,
  CREATE_LOYALTY_ACCOUNT_SUCCESS,
  CREATE_LOYALTY_ACCOUNT_FAILURE,
} from '../actionTypes';

export const createLoyaltyAccountStart = () => ({
  type: CREATE_LOYALTY_ACCOUNT_START,
});

export const createLoyaltyAccountSuccess = (account) => ({
  type: CREATE_LOYALTY_ACCOUNT_SUCCESS,
  payload: account,
});

export const createLoyaltyAccountFailure = (error) => ({
  type: CREATE_LOYALTY_ACCOUNT_FAILURE,
  payload: error,
});

export const createLoyaltyAccount = (accountData) => async (dispatch) => {
  dispatch(createLoyaltyAccountStart());
  try {
    const response = await axios.post('/api/loyalty/accounts', accountData);
    dispatch(createLoyaltyAccountSuccess(response.data));
  } catch (error) {
    dispatch(createLoyaltyAccountFailure(error.message));
  }
};
