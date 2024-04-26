import axios from 'axios';
import { 
  CATALOG_SEARCH_START, 
  CATALOG_SEARCH_SUCCESS, 
  CATALOG_SEARCH_FAILURE 
} from '../actionTypes';

// Action to start the catalog search process
export const catalogSearchStart = () => ({
  type: CATALOG_SEARCH_START,
});

// Action for successful catalog search
export const catalogSearchSuccess = (catalogItems) => ({
  type: CATALOG_SEARCH_SUCCESS,
  payload: catalogItems,
});

// Action for handling failures in catalog search
export const catalogSearchFailure = (error) => ({
  type: CATALOG_SEARCH_FAILURE,
  payload: error,
});

// Thunk function to perform a catalog search with a query
export const catalogSearch = (query) => async (dispatch) => {
  dispatch(catalogSearchStart());
  try {
    // Use GET method and pass query as a query parameter
    const response = await axios.get(`/api/catalogs/search?q=${query}`);
    console.log("Fetched data:", response.data);  // Log the fetched data
    dispatch(catalogSearchSuccess(response.data));
  } catch (error) {
    console.error("Search error:", error);
    dispatch(catalogSearchFailure(error.message));
  }
};