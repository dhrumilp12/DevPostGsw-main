// src/actions/dashboardActions.js
import axios from 'axios';

// Define dashboard-related action types
export const FETCH_SUMMARY_START = 'FETCH_SUMMARY_START';
export const FETCH_SUMMARY_SUCCESS = 'FETCH_SUMMARY_SUCCESS';
export const FETCH_SUMMARY_FAILURE = 'FETCH_SUMMARY_FAILURE';

export const FETCH_ANALYTICS_START = 'FETCH_ANALYTICS_START';
export const FETCH_ANALYTICS_SUCCESS = 'FETCH_ANALYTICS_SUCCESS';
export const FETCH_ANALYTICS_FAILURE = 'FETCH_ANALYTICS_FAILURE';

// Action creators for fetching summary data
const fetchSummaryStart = () => ({
  type: FETCH_SUMMARY_START,
});

const fetchSummarySuccess = (summaryData) => ({
  type: FETCH_SUMMARY_SUCCESS,
  payload: summaryData,
});

const fetchSummaryFailure = (error) => ({
  type: FETCH_SUMMARY_FAILURE,
  payload: error,
});

// Action creators for fetching analytics data
const fetchAnalyticsStart = () => ({
  type: FETCH_ANALYTICS_START,
});

const fetchAnalyticsSuccess = (analyticsData) => ({
  type: FETCH_ANALYTICS_SUCCESS,
  payload: analyticsData,
});

const fetchAnalyticsFailure = (error) => ({
  type: FETCH_ANALYTICS_FAILURE,
  payload: error,
});

// Async action creator for fetching summary
export const fetchSummary = () => async (dispatch) => {
  dispatch(fetchSummaryStart());
  try {
    // Replace with the actual API call to your backend
    const response = await axios.get('/api/dashboard/summary');
    dispatch(fetchSummarySuccess(response.data));
  } catch (error) {
    dispatch(fetchSummaryFailure(error.toString()));
  }
};

// Async action creator for fetching dashboard analytics
export const fetchAnalytics = () => async (dispatch) => {
  dispatch(fetchAnalyticsStart());
  try {
    // Replace with the actual API call to your backend
    const response = await axios.get('/api/dashboard/analytics');
    dispatch(fetchAnalyticsSuccess(response.data));
  } catch (error) {
    dispatch(fetchAnalyticsFailure(error.toString()));
  }
};
