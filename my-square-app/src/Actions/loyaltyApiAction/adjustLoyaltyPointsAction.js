import axios from 'axios';
import {
  ADJUST_LOYALTY_POINTS_START,
  ADJUST_LOYALTY_POINTS_SUCCESS,
  ADJUST_LOYALTY_POINTS_FAILURE,
} from '../actionTypes';

// Action to start the adjustment of loyalty points
export const adjustLoyaltyPointsStart = () => ({
  type: ADJUST_LOYALTY_POINTS_START,
});

// Action for successful adjustment of loyalty points
export const adjustLoyaltyPointsSuccess = (data) => ({
  type: ADJUST_LOYALTY_POINTS_SUCCESS,
  payload: data,
});

// Action for handling failures in adjusting loyalty points
export const adjustLoyaltyPointsFailure = (error) => ({
  type: ADJUST_LOYALTY_POINTS_FAILURE,
  payload: error,
});

// Thunk function to adjust loyalty points for a specific account
export const adjustLoyaltyPoints = (accountId, adjustData) => async (dispatch) => {
  dispatch(adjustLoyaltyPointsStart());
  try {
    const response = await axios.post(`/api/loyalty/accounts/${accountId}/adjust`, adjustData);
    dispatch(adjustLoyaltyPointsSuccess(response.data));
  } catch (error) {
    dispatch(adjustLoyaltyPointsFailure(error.message));
  }
};
