import axios from 'axios';
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
} from './actionTypes';

// Fetch users action creators
export const fetchUsersStart = () => ({ type: FETCH_USERS_START });
export const fetchUsersSuccess = (users) => ({ type: FETCH_USERS_SUCCESS, payload: users });
export const fetchUsersFailure = (error) => ({ type: FETCH_USERS_FAILURE, payload: error });

// Create user action creators
export const createUserStart = () => ({ type: CREATE_USER_START });
export const createUserSuccess = (user) => ({ type: CREATE_USER_SUCCESS, payload: user });
export const createUserFailure = (error) => ({ type: CREATE_USER_FAILURE, payload: error });

// Update user action creators
export const updateUserStart = () => ({ type: UPDATE_USER_START });
export const updateUserSuccess = (user) => ({ type: UPDATE_USER_SUCCESS, payload: user });
export const updateUserFailure = (error) => ({ type: UPDATE_USER_FAILURE, payload: error });

// Delete user action creators
export const deleteUserStart = () => ({ type: DELETE_USER_START });
export const deleteUserSuccess = (userId) => ({ type: DELETE_USER_SUCCESS, payload: userId });
export const deleteUserFailure = (error) => ({ type: DELETE_USER_FAILURE, payload: error });

// Fetch content action creators
export const fetchContentStart = () => ({ type: FETCH_CONTENT_START });
export const fetchContentSuccess = (content) => ({ type: FETCH_CONTENT_SUCCESS, payload: content });
export const fetchContentFailure = (error) => ({ type: FETCH_CONTENT_FAILURE, payload: error });

// Update content action creators
export const updateContentStart = () => ({ type: UPDATE_CONTENT_START });
export const updateContentSuccess = (content) => ({ type: UPDATE_CONTENT_SUCCESS, payload: content });
export const updateContentFailure = (error) => ({ type: UPDATE_CONTENT_FAILURE, payload: error });

// Async action creators
export const fetchUsers = () => async (dispatch) => {
  dispatch(fetchUsersStart());
  try {
    const response = await axios.get('/api/admin/users');
    dispatch(fetchUsersSuccess(response.data));
  } catch (error) {
    dispatch(fetchUsersFailure(error.toString()));
  }
};

export const createUser = (userData) => async (dispatch) => {
  dispatch(createUserStart());
  try {
    const response = await axios.post('/api/admin/users', userData);
    dispatch(createUserSuccess(response.data));
  } catch (error) {
    dispatch(createUserFailure(error.toString()));
  }
};

export const updateUser = (userId, userData) => async (dispatch) => {
  dispatch(updateUserStart());
  try {
    const response = await axios.put(`/api/admin/users/${userId}`, userData);
    dispatch(updateUserSuccess(response.data));
  } catch (error) {
    dispatch(updateUserFailure(error.toString()));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(deleteUserStart());
  try {
    await axios.delete(`/api/admin/users/${userId}`);
    dispatch(deleteUserSuccess(userId));
  } catch (error) {
    dispatch(deleteUserFailure(error.toString()));
  }
};

export const fetchContent = () => async (dispatch) => {
  dispatch(fetchContentStart());
  try {
    const response = await axios.get('/api/admin/content');
    dispatch(fetchContentSuccess(response.data));
  } catch (error) {
    dispatch(fetchContentFailure(error.toString()));
  }
};

export const updateContent = (contentId, contentData) => async (dispatch) => {
  dispatch(updateContentStart());
  try {
    const response = await axios.put(`/api/admin/content/${contentId}`, contentData);
    dispatch(updateContentSuccess(response.data));
  } catch (error) {
    dispatch(updateContentFailure(error.toString()));
  }
};
