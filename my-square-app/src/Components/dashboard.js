//will work on it.
// Dashboard provides a central view for displaying summary and analytics data fetched from the server.
// It initiates fetch actions on mount and handles loading and error states for both summary and analytics data.
// The component is designed to display high-level statistics and trends to the user.

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSummary, fetchAnalytics } from '../Actions/dashboardAction';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { summary, analytics, loadingSummary, loadingAnalytics, errorSummary, errorAnalytics } = useSelector(state => ({
    summary: state.dashboard.summary,
    analytics: state.dashboard.analytics,
    loadingSummary: state.dashboard.loadingSummary,
    loadingAnalytics: state.dashboard.loadingAnalytics,
    errorSummary: state.dashboard.errorSummary,
    errorAnalytics: state.dashboard.errorAnalytics,
  }));

  useEffect(() => {
    dispatch(fetchSummary());
    dispatch(fetchAnalytics());
  }, [dispatch]);

  return (
    <div>
      <h1>Dashboard</h1>
      <div>
        <h2>Summary</h2>
        {loadingSummary && <div>Loading summary...</div>}
        {errorSummary && <div>Error: {errorSummary}</div>}
        {!loadingSummary && summary && (
          <div>
            {/* Display summary data here */}
          </div>
        )}
      </div>
      <div>
        <h2>Analytics</h2>
        {loadingAnalytics && <div>Loading analytics...</div>}
        {errorAnalytics && <div>Error: {errorAnalytics}</div>}
        {!loadingAnalytics && analytics && (
          <div>
            {/* Display analytics data here */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
