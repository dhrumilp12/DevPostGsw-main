import {
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILURE,
  LOGIN_USER
} from '../Actions/actionTypes';

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
      return {
        ...state,
        loading: true,
        error: null,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
        isAuthenticated: true,
        squareCustomerId: action.payload.squareCustomerId,
      };
    case REGISTER_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case LOGIN_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
      };
    default:
      return state;
  }
};

export default registerLogicReducer;
