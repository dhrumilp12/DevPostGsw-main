import {
    SEARCH_AVAILABILITY_START,
    SEARCH_AVAILABILITY_SUCCESS,
    SEARCH_AVAILABILITY_FAILURE,
  } from '../../Actions/actionTypes.js';
  
  const initialState = {
    availabilities: [],
    loading: false,
    error: null,
  };
  
  const searchAvailabilityReducer = (state = initialState, action) => {
    switch (action.type) {
      case SEARCH_AVAILABILITY_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case SEARCH_AVAILABILITY_SUCCESS:
        return {
          ...state,
          loading: false,
          availabilities: action.payload,
        };
      case SEARCH_AVAILABILITY_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default searchAvailabilityReducer;
  