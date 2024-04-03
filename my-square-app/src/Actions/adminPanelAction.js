import axios from 'axios';

// User management action types
export const FETCH_USERS_START = 'FETCH_USERS_START';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';
export const CREATE_USER_START = 'CREATE_USER_START';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_FAILURE = 'CREATE_USER_FAILURE';
export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';
export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAILURE = 'DELETE_USER_FAILURE';

// Content management action types
export const FETCH_CONTENT_START = 'FETCH_CONTENT_START';
export const FETCH_CONTENT_SUCCESS = 'FETCH_CONTENT_SUCCESS';
export const FETCH_CONTENT_FAILURE = 'FETCH_CONTENT_FAILURE';
export const UPDATE_CONTENT_START = 'UPDATE_CONTENT_START';
export const UPDATE_CONTENT_SUCCESS = 'UPDATE_CONTENT_SUCCESS';
export const UPDATE_CONTENT_FAILURE = 'UPDATE_CONTENT_FAILURE';


// Define action creators for user management
const fetchUsersStart = () => ({
  type: FETCH_USERS_START,
});

const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});

const createUserStart = () => ({
  type: CREATE_USER_START,
});

const createUserSuccess = (user) => ({
  type: CREATE_USER_SUCCESS,
  payload: user,
});

const createUserFailure = (error) => ({
  type: CREATE_USER_FAILURE,
  payload: error,
});

// ... (similarly define start/success/failure action creators for update and delete)

// Async action creators for user management
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

// ... (implement update and delete action creators using PUT and DELETE HTTP methods)

// Async action creators for content management
const fetchContentStart = () => ({
  type: FETCH_CONTENT_START,
});

const fetchContentSuccess = (content) => ({
  type: FETCH_CONTENT_SUCCESS,
  payload: content,
});

const fetchContentFailure = (error) => ({
  type: FETCH_CONTENT_FAILURE,
  payload: error,
});

// Define action creators for fetching and updating content
export const fetchContent = () => async (dispatch) => {
  dispatch(fetchContentStart());
  try {
    const response = await axios.get('/api/admin/content');
    dispatch(fetchContentSuccess(response.data));
  } catch (error) {
    dispatch(fetchContentFailure(error.toString()));
  }
};

const updateContentStart = () => ({
  type: UPDATE_CONTENT_START,
});

const updateContentSuccess = (content) => ({
  type: UPDATE_CONTENT_SUCCESS,
  payload: content,
});

const updateContentFailure = (error) => ({
  type: UPDATE_CONTENT_FAILURE,
  payload: error,
});

export const updateContent = (contentData) => async (dispatch) => {
  dispatch(updateContentStart());
  try {
    const response = await axios.put(`/api/admin/content/${contentData.id}`, contentData);
    dispatch(updateContentSuccess(response.data));
  } catch (error) {
    dispatch(updateContentFailure(error.toString()));
  }
};

// Add any additional action creators needed for your admin panel functionality
