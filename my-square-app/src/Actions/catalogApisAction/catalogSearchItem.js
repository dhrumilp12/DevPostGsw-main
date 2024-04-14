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
  dispatch({ type: 'FETCH_CATALOG_ITEM_START' });
  try {
    const response = await axios.get(`http://localhost:3000/api/catalogs/search-item/${itemId}`);
    dispatch({ type: 'FETCH_CATALOG_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CATALOG_ITEM_FAILURE', payload: error.response?.data?.error || 'Failed to fetch item' });
  }
};