import axios from 'axios';
import {
  ACCUMULATE_LOYALTY_POINTS_START,
  ACCUMULATE_LOYALTY_POINTS_SUCCESS,
  ACCUMULATE_LOYALTY_POINTS_FAILURE,
} from '../actionTypes';

// Action to start the accumulation of loyalty points
export const accumulateLoyaltyPointsStart = () => ({
  type: ACCUMULATE_LOYALTY_POINTS_START,
});

// Action for successful accumulation of loyalty points
export const accumulateLoyaltyPointsSuccess = (data) => ({
  type: ACCUMULATE_LOYALTY_POINTS_SUCCESS,
  payload: data,
});

// Action for handling failures in accumulating loyalty points
export const accumulateLoyaltyPointsFailure = (error) => ({
  type: ACCUMULATE_LOYALTY_POINTS_FAILURE,
  payload: error,
});

// Thunk function to accumulate loyalty points for a specific account
export const accumulateLoyaltyPoints = (accountId, accumulateData) => async (dispatch) => {
  dispatch(accumulateLoyaltyPointsStart());
  try {
    const response = await axios.post(`/api/loyalty/accounts/${accountId}/accumulate`, accumulateData);
    dispatch(accumulateLoyaltyPointsSuccess(response.data));
  } catch (error) {
    dispatch(accumulateLoyaltyPointsFailure(error.message));
  }
};
