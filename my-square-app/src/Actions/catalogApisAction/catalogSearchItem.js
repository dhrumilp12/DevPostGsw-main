import axios from 'axios';
// Adjust the action types import path as needed
import {
  FETCH_CATALOG_ITEM_START,
  FETCH_CATALOG_ITEM_SUCCESS,
  FETCH_CATALOG_ITEM_FAILURE,
} from '../actionTypes';

export const fetchCatalogItemStart = () => ({
  type: FETCH_CATALOG_ITEM_START,
});

export const fetchCatalogItemSuccess = (item) => ({
  type: FETCH_CATALOG_ITEM_SUCCESS,
  payload: item,
});

export const fetchCatalogItemFailure = (error) => ({
  type: FETCH_CATALOG_ITEM_FAILURE,
  payload: error,
});

export const fetchCatalogItem = (itemId) => async (dispatch) => {
  dispatch(fetchCatalogItemStart());
  try {
    // Ensure this URL matches the backend route
    const response = await axios.get(`/api/catalogs/search-item/${itemId}`);
    dispatch(fetchCatalogItemSuccess(response.data));
  } catch (error) {
    dispatch(fetchCatalogItemFailure(error.message));
  }
};