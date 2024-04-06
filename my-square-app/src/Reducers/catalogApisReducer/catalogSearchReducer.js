import {
    CATALOG_SEARCH_START,
    CATALOG_SEARCH_SUCCESS,
    CATALOG_SEARCH_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    catalogItems: [],
    loading: false,
    error: null,
  };
  
  const catalogSearchReducer = (state = initialState, action) => {
    switch (action.type) {
      case CATALOG_SEARCH_START:
        return {
          ...state,
          loading: true,
          error: null,
        };
      case CATALOG_SEARCH_SUCCESS:
        return {
          ...state,
          loading: false,
          catalogItems: action.payload,
        };
      case CATALOG_SEARCH_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default catalogSearchReducer;
  