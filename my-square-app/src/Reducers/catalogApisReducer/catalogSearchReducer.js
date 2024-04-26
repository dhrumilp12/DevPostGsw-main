// Manages the state for searching catalog items. This reducer updates the state based on the search results, managing loading states and errors. It processes the search start, success (logging the results), and failure actions.
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
      console.log('Search Results:', action.payload);
    return {
      ...state,
      loading: false,
      catalogItems: action.payload,
      error:null,
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
