import axios from 'axios';
import { 
  CATALOG_SEARCH_START, 
  CATALOG_SEARCH_SUCCESS, 
  CATALOG_SEARCH_FAILURE 
} from '../actionTypes';

export const catalogSearchStart = () => ({
  type: CATALOG_SEARCH_START,
});

export const catalogSearchSuccess = (catalogItems) => ({
  type: CATALOG_SEARCH_SUCCESS,
  payload: catalogItems,
});

export const catalogSearchFailure = (error) => ({
  type: CATALOG_SEARCH_FAILURE,
  payload: error,
});

export const catalogSearch = (query) => async (dispatch) => {
  dispatch(catalogSearchStart());
  try {
    // Use GET method and pass query as a query parameter
    const response = await axios.get(`/api/catalogs/search?q=${query}`);
    console.log("Fetched data:", response.data);  // Make sure this logs the expected array
    dispatch(catalogSearchSuccess(response.data));
  } catch (error) {
    console.error("Search error:", error);
    dispatch(catalogSearchFailure(error.message));
  }
};