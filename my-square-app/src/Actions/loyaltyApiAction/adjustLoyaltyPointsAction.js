import axios from 'axios';
import {
  ADJUST_LOYALTY_POINTS_START,
  ADJUST_LOYALTY_POINTS_SUCCESS,
  ADJUST_LOYALTY_POINTS_FAILURE,
} from '../actionTypes';

export const adjustLoyaltyPointsStart = () => ({
  type: ADJUST_LOYALTY_POINTS_START,
});

export const adjustLoyaltyPointsSuccess = (data) => ({
  type: ADJUST_LOYALTY_POINTS_SUCCESS,
  payload: data,
});

export const adjustLoyaltyPointsFailure = (error) => ({
  type: ADJUST_LOYALTY_POINTS_FAILURE,
  payload: error,
});

export const adjustLoyaltyPoints = (accountId, adjustData) => async (dispatch) => {
  dispatch(adjustLoyaltyPointsStart());
  try {
    // Adjust this URL to your API endpoint
    const response = await axios.post(`/api/loyalty/accounts/${accountId}/adjust`, adjustData);
    dispatch(adjustLoyaltyPointsSuccess(response.data));
  } catch (error) {
    dispatch(adjustLoyaltyPointsFailure(error.message));
  }
};
