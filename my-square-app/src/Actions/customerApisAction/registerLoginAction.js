import axios from 'axios';
import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT
} from '../actionTypes';

export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
        const response = await axios.post('/api/customers/create-customer', userData);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ 
            type: REGISTER_USER_FAILURE, 
            payload: error.response ? error.response.data.error : error.message 
        });
    }
};

export const loginUser = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
        const response = await axios.post('/api/customers/login', userData);
        dispatch({ type: LOGIN_USER_SUCCESS, payload: response.data });
        navigate('/'); // Redirect to the home page after successful login
      } catch (error) {
        dispatch({ type: LOGIN_USER_FAILURE, payload: error.response.data.error || 'Login failed. Please check your credentials.' });
        navigate('/registerLogin'); // Redirect to the signup page if login fails
      }
    };

    export const logout = () => {
        return {
            type: LOGOUT
        };
    };