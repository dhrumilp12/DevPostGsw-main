import axios from 'axios';
import { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from './actionTypes.js';

export const authStart = () => ({
  type: AUTH_START,
});

export const authSuccess = (user, accessToken) => ({ // Include accessToken
  type: AUTH_SUCCESS,
  payload: { user, accessToken }, // Store access token
});

export const authFailure = (error) => ({
  type: AUTH_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const authenticateUser = () => async (dispatch) => {
  dispatch(authStart());
  try {
    // Redirect the user to the Square OAuth URL
    window.location.href = '/api/oauthRoutes/auth/square'; 
  } catch (error) {
    dispatch(authFailure('Authentication failed'));
  }
};

export const handleOAuthCallback = (code) => async (dispatch) => {
  try {
    const response = await axios.post('/api/oauthRoutes/exchange-code', { code });
    const { access_token, refresh_token, ...user } = response.data;
    dispatch(authSuccess(user, access_token)); // Send accessToken

    // Store access_token and other data securely (using localStorage or similar)
    localStorage.setItem('accessToken', access_token);
  } catch (error) {
    dispatch(authFailure(error.message));
  }
};

// New action to fetch protected data
export const fetchData = () => async (dispatch, getState) => {
  try {
    const accessToken = getState().auth.accessToken; // Get accessToken from state
    const response = await axios.get('/api/protected/data', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    console.log('Fetched Data:', response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
