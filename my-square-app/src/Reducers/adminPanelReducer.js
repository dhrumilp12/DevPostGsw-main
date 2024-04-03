import {
    FETCH_USERS_START,
    FETCH_USERS_SUCCESS,
    FETCH_USERS_FAILURE,
    CREATE_USER_START,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAILURE,
    UPDATE_USER_START,
    UPDATE_USER_SUCCESS,
    UPDATE_USER_FAILURE,
    DELETE_USER_START,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAILURE,
    FETCH_CONTENT_START,
    FETCH_CONTENT_SUCCESS,
    FETCH_CONTENT_FAILURE,
    UPDATE_CONTENT_START,
    UPDATE_CONTENT_SUCCESS,
    UPDATE_CONTENT_FAILURE,
  } from '../Actions/actionTypes';
  
  const initialState = {
    users: [],
    content: [],
    loadingUsers: false,
    loadingContent: false,
    errorUsers: null,
    errorContent: null,
  };
  
  const adminPanelReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_USERS_START:
        return { ...state, loadingUsers: true, errorUsers: null };
      case FETCH_USERS_SUCCESS:
        return { ...state, users: action.payload, loadingUsers: false };
      case FETCH_USERS_FAILURE:
        return { ...state, errorUsers: action.payload, loadingUsers: false };
      case CREATE_USER_START:
        return { ...state, loadingUsers: true };
      case CREATE_USER_SUCCESS:
        return { ...state, users: [...state.users, action.payload], loadingUsers: false };
      case CREATE_USER_FAILURE:
        return { ...state, errorUsers: action.payload, loadingUsers: false };
      case UPDATE_USER_START:
        return { ...state, loadingUsers: true };
      case UPDATE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.map(user =>
            user.id === action.payload.id ? action.payload : user
          ),
          loadingUsers: false,
        };
      case UPDATE_USER_FAILURE:
        return { ...state, errorUsers: action.payload, loadingUsers: false };
      case DELETE_USER_START:
        return { ...state, loadingUsers: true };
      case DELETE_USER_SUCCESS:
        return {
          ...state,
          users: state.users.filter(user => user.id !== action.payload),
          loadingUsers: false,
        };
      case DELETE_USER_FAILURE:
        return { ...state, errorUsers: action.payload, loadingUsers: false };
      case FETCH_CONTENT_START:
        return { ...state, loadingContent: true, errorContent: null };
      case FETCH_CONTENT_SUCCESS:
        return { ...state, content: action.payload, loadingContent: false };
      case FETCH_CONTENT_FAILURE:
        return { ...state, errorContent: action.payload, loadingContent: false };
      case UPDATE_CONTENT_START:
        return { ...state, loadingContent: true };
      case UPDATE_CONTENT_SUCCESS:
        return {
          ...state,
          content: state.content.map(item =>
            item.id === action.payload.id ? action.payload : item
          ),
          loadingContent: false,
        };
      case UPDATE_CONTENT_FAILURE:
        return { ...state, errorContent: action.payload, loadingContent: false };
      default:
        return state;
    }
  };
  
  export default adminPanelReducer;
  