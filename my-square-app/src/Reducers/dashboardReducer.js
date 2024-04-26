//Not wroking, will work on it.
// Handles a variety of administrative actions such as fetching, creating, updating, and deleting users, as well as managing content. It manages separate loading and error states for users and content management.

import {
    FETCH_SUMMARY_START,
    FETCH_SUMMARY_SUCCESS,
    FETCH_SUMMARY_FAILURE,
    FETCH_ANALYTICS_START,
    FETCH_ANALYTICS_SUCCESS,
    FETCH_ANALYTICS_FAILURE,
  } from '../Actions/dashboardAction';
  
  const initialState = {
    summary: null,
    analytics: null,
    loadingSummary: false,
    loadingAnalytics: false,
    errorSummary: null,
    errorAnalytics: null,
  };
  
  const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SUMMARY_START:
        return { ...state, loadingSummary: true, errorSummary: null };
      case FETCH_SUMMARY_SUCCESS:
        return { ...state, summary: action.payload, loadingSummary: false };
      case FETCH_SUMMARY_FAILURE:
        return { ...state, errorSummary: action.payload, loadingSummary: false };
      case FETCH_ANALYTICS_START:
        return { ...state, loadingAnalytics: true, errorAnalytics: null };
      case FETCH_ANALYTICS_SUCCESS:
        return { ...state, analytics: action.payload, loadingAnalytics: false };
      case FETCH_ANALYTICS_FAILURE:
        return { ...state, errorAnalytics: action.payload, loadingAnalytics: false };
      default:
        return state;
    }
  };
  
  export default dashboardReducer;
  