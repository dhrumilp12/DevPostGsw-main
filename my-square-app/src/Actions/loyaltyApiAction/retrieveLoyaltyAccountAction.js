import axios from 'axios';
import {
  RETRIEVE_LOYALTY_ACCOUNT_START,
  RETRIEVE_LOYALTY_ACCOUNT_SUCCESS,
  RETRIEVE_LOYALTY_ACCOUNT_FAILURE,
} from '../actionTypes';

export const retrieveLoyaltyAccountStart = () => ({
  type: RETRIEVE_LOYALTY_ACCOUNT_START,
});

export const retrieveLoyaltyAccountSuccess = (account) => ({
  type: RETRIEVE_LOYALTY_ACCOUNT_SUCCESS,
  payload: account,
});

export const retrieveLoyaltyAccountFailure = (error) => ({
  type: RETRIEVE_LOYALTY_ACCOUNT_FAILURE,
  payload: error,
});

export const retrieveLoyaltyAccount = (accountId) => async (dispatch) => {
  dispatch(retrieveLoyaltyAccountStart());
  try {
    const response = await axios.get(`/api/loyalty/accounts/${accountId}`);
    dispatch(retrieveLoyaltyAccountSuccess(response.data));
  } catch (error) {
    dispatch(retrieveLoyaltyAccountFailure(error.message));
  }
};
