import {
    REGISTER_USER_REQUEST,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER
  } from '../actionTypes';

export const registerUser = (userData) => async (dispatch) => {
    dispatch({ type: REGISTER_USER_REQUEST });

    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(userData) 
        });

        if (!response.ok) {
            throw new Error('Registration failed');
        }

        const registeredUserData = await response.json();
        dispatch({ type: REGISTER_USER_SUCCESS, payload: registeredUserData });
    } catch (error) {
        dispatch({ type: REGISTER_USER_FAILURE, payload: error.message }); 
    }
};

export const loginUser = (userData) => {
    return {
        type: LOGIN_USER,
        payload: userData
    };
};