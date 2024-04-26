import axios from 'axios';
import { CREATE_CATALOG_START, CREATE_CATALOG_SUCCESS, CREATE_CATALOG_FAILURE } from '../actionTypes';

// Action to start the creation process of a catalog item
export const createCatalogStart = () => ({
  type: CREATE_CATALOG_START,
});

// Action for successful catalog item creation
export const createCatalogSuccess = (catalogItem) => ({
  type: CREATE_CATALOG_SUCCESS,
  payload: catalogItem,
});

// Action for handling failures in catalog item creation
export const createCatalogFailure = (error) => ({
  type: CREATE_CATALOG_FAILURE,
  payload: error,
});

// Thunk function to create a new catalog item
export const createCatalog = (itemData) => async (dispatch) => {
  dispatch(createCatalogStart());
  try {
    const response = await axios.post('/api/catalogs/create-catalog', itemData);
    dispatch(createCatalogSuccess(response.data));
    return response.data;
  } catch (error) {
    dispatch(createCatalogFailure(error.response?.data?.error || 'Unknown error'));
    throw error;
  }
};