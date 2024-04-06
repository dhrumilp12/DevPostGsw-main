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
    const response = await axios.post('/api/catalog/search', { query });
    dispatch(catalogSearchSuccess(response.data.objects));
  } catch (error) {
    dispatch(catalogSearchFailure(error.message));
  }
};
