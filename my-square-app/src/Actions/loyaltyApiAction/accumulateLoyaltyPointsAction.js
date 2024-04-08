import axios from 'axios';
import {
  ACCUMULATE_LOYALTY_POINTS_START,
  ACCUMULATE_LOYALTY_POINTS_SUCCESS,
  ACCUMULATE_LOYALTY_POINTS_FAILURE,
} from '../actionTypes';

export const accumulateLoyaltyPointsStart = () => ({
  type: ACCUMULATE_LOYALTY_POINTS_START,
});

export const accumulateLoyaltyPointsSuccess = (data) => ({
  type: ACCUMULATE_LOYALTY_POINTS_SUCCESS,
  payload: data,
});

export const accumulateLoyaltyPointsFailure = (error) => ({
  type: ACCUMULATE_LOYALTY_POINTS_FAILURE,
  payload: error,
});

export const accumulateLoyaltyPoints = (accountId, accumulateData) => async (dispatch) => {
  dispatch(accumulateLoyaltyPointsStart());
  try {
    const response = await axios.post(`/api/loyalty/accounts/${accountId}/accumulate`, accumulateData);
    dispatch(accumulateLoyaltyPointsSuccess(response.data));
  } catch (error) {
    dispatch(accumulateLoyaltyPointsFailure(error.message));
  }
};
