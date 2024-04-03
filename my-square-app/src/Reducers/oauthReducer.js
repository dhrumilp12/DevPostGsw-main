// src/reducers/oauthReducer.js
import { AUTH_START, AUTH_SUCCESS, AUTH_FAILURE, LOGOUT } from '../Actions/actionTypes.js';

const initialState = {
  user: null,
  isAuthenticated: false,
  accessToken: null,
  loading: false,
  error: null,
};

const oauthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_START:
      return {
        ...state,
        loading: true,
        
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
        accessToken: action.payload.accessToken,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
        accessToken: null, // Reset access token on failure
      };
    case LOGOUT:
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        accessToken: null,
      };
    default:
      return state;
  }
};

export default oauthReducer;
