import {
    FETCH_SERVICE_DETAILS_START,
    FETCH_SERVICE_DETAILS_SUCCESS,
    FETCH_SERVICE_DETAILS_FAILURE,
    UPDATE_SERVICE_DETAILS_START,
    UPDATE_SERVICE_DETAILS_SUCCESS,
    UPDATE_SERVICE_DETAILS_FAILURE,
    DELETE_SERVICE_START,
    DELETE_SERVICE_SUCCESS,
    DELETE_SERVICE_FAILURE,
  } from './serviceAction';
  
  const initialState = {
    serviceDetails: null,
    loading: false,
    error: null,
  };
  
  const serviceReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_SERVICE_DETAILS_START:
        return { ...state, loading: true, error: null };
      case FETCH_SERVICE_DETAILS_SUCCESS:
        return { ...state, serviceDetails: action.payload, loading: false };
      case FETCH_SERVICE_DETAILS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      case UPDATE_SERVICE_DETAILS_START:
        return { ...state, loading: true };
      case UPDATE_SERVICE_DETAILS_SUCCESS:
        return { ...state, serviceDetails: action.payload, loading: false };
      case UPDATE_SERVICE_DETAILS_FAILURE:
        return { ...state, error: action.payload, loading: false };
      case DELETE_SERVICE_START:
        return { ...state, loading: true };
      case DELETE_SERVICE_SUCCESS:
        return { ...state, serviceDetails: null, loading: false };
      case DELETE_SERVICE_FAILURE:
        return { ...state, error: action.payload, loading: false };
      default:
        return state;
    }
  };
  
  export default serviceReducer;
  