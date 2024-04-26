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

// Thunk function to register a user with given user data
export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });
    try {
        const response = await axios.post('/api/customers/create-customer', userData);
        console.log("Registration response:", response.data);
        dispatch({ type: REGISTER_USER_SUCCESS, payload: {
                user: response.data,
                squareCustomerId: response.data.id
            }});
    } catch (error) {
        dispatch({ 
            type: REGISTER_USER_FAILURE, 
            payload: error.response ? error.response.data.error : error.message 
        });
    }
};

// Thunk function to log in a user, redirecting appropriately based on success or failure
export const loginUser = (userData, navigate) => async (dispatch) => {
    dispatch({ type: LOGIN_USER_REQUEST });
    try {
        const response = await axios.post('/api/customers/login', userData);
        dispatch({ 
            type: LOGIN_USER_SUCCESS, 
            payload: {
                user: response.data.customer,
                squareCustomerId: response.data.customer.id
            }
        });
        navigate('/'); // Redirect to the home page after successful login
      } catch (error) {
        dispatch({ type: LOGIN_USER_FAILURE, payload: error.response.data.error || 'Login failed. Please check your credentials.' });
        navigate('/registerLogin'); // Redirect to the signup page if login fails
      }
    };

    // Action to log out a user
    export const logout = () => {
        return {
            type: LOGOUT
        };
    };