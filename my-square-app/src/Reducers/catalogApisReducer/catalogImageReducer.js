// Manages the state for creating and updating catalog images. This reducer tracks loading states, stores created and updated image details, and handles errors for both creating and updating actions. It processes requests, successes, and failures for both creating and updating catalog images.
import {
    CREATE_CATALOG_IMAGE_REQUEST,
    CREATE_CATALOG_IMAGE_SUCCESS,
    CREATE_CATALOG_IMAGE_FAILURE,
    UPDATE_CATALOG_IMAGE_REQUEST,
    UPDATE_CATALOG_IMAGE_SUCCESS,
    UPDATE_CATALOG_IMAGE_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    loading: false,
    error: null,
    createdImage: null,
    updatedImage: null,
  };
  
  export const catalogImageReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CATALOG_IMAGE_REQUEST:
      case UPDATE_CATALOG_IMAGE_REQUEST:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CREATE_CATALOG_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          createdImage: action.payload,
        };
      case UPDATE_CATALOG_IMAGE_SUCCESS:
        return {
          ...state,
          loading: false,
          updatedImage: action.payload,
        };
      case CREATE_CATALOG_IMAGE_FAILURE:
      case UPDATE_CATALOG_IMAGE_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default catalogImageReducer;