
// Manages authentication states including registration and login processes. This reducer tracks user authentication status, loading states, and errors. It handles actions related to user registration, login, and logout, updating the state accordingly for each scenario, including tracking the authenticated user's details and their Square customer ID.

import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT
} from '../../Actions/actionTypes';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  squareCustomerId: null,
};

const registerLogicReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        squareCustomerId: action.payload.squareCustomerId,
      };
    case REGISTER_USER_FAILURE:
    case LOGIN_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        isAuthenticated: false
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        squareCustomerId: null
      };
    default:
      return state;
  }
};

export default registerLogicReducer;
