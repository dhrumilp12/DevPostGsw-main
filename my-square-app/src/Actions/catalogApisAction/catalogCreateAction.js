import axios from 'axios';
import { CREATE_CATALOG_START, CREATE_CATALOG_SUCCESS, CREATE_CATALOG_FAILURE } from '../actionTypes';

export const createCatalogStart = () => ({
  type: CREATE_CATALOG_START,
});

export const createCatalogSuccess = (catalogItem) => ({
  type: CREATE_CATALOG_SUCCESS,
  payload: catalogItem,
});

export const createCatalogFailure = (error) => ({
  type: CREATE_CATALOG_FAILURE,
  payload: error,
});

export const createCatalog = (itemData) => async (dispatch) => {
  dispatch(createCatalogStart());
  try {
    const response = await axios.post('/api/catalogs/create-catalog', itemData);
    dispatch(createCatalogSuccess(response.data));
  } catch (error) {
    dispatch(createCatalogFailure(error.response?.data?.error || 'Unknown error'));
  }
};
