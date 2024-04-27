import axios from 'axios';
import {
  FETCH_CATALOG_ITEM_START,
  FETCH_CATALOG_ITEM_SUCCESS,
  FETCH_CATALOG_ITEM_FAILURE,
  FETCH_ITEM_VARIATION_START,
  FETCH_ITEM_VARIATION_SUCCESS,
  FETCH_ITEM_VARIATION_FAILURE
} from '../actionTypes';

// Action to start the fetch process for a catalog item
export const fetchCatalogItemStart = () => ({
  type: FETCH_CATALOG_ITEM_START,
});

// Action to handle successful fetch of a catalog item
export const fetchCatalogItemSuccess = (item) => ({
  type: FETCH_CATALOG_ITEM_SUCCESS,
  payload: item,
});

// Action to handle failure in fetching a catalog item
export const fetchCatalogItemFailure = (error) => ({
  type: FETCH_CATALOG_ITEM_FAILURE,
  payload: error,
});

// Action to start the fetch process for an item variation
export const fetchItemVariationStart = () => ({
  type: FETCH_ITEM_VARIATION_START
});

// Action to handle successful fetch of an item variation
export const fetchItemVariationSuccess = (variation) => ({
  type: FETCH_ITEM_VARIATION_SUCCESS,
  payload: variation
});

// Action to handle failure in fetching an item variation
export const fetchItemVariationFailure = (error) => ({
  type: FETCH_ITEM_VARIATION_FAILURE,
  payload: error
});

// Thunk function to fetch a catalog item by ID
export const fetchCatalogItem = (itemId) => async (dispatch) => {
  dispatch({ type: 'FETCH_CATALOG_ITEM_START' });
  try {
    const response = await axios.get(`/api/catalogs/search-item/${itemId}`);
    dispatch({ type: 'FETCH_CATALOG_ITEM_SUCCESS', payload: response.data });
  } catch (error) {
    dispatch({ type: 'FETCH_CATALOG_ITEM_FAILURE', payload: error.response?.data?.error || 'Failed to fetch item' });
  }
};

// Thunk function to fetch variations for a specific catalog item
export const fetchItemVariation = (itemId) => async (dispatch) => {
  dispatch(fetchItemVariationStart());
  try {
    const response = await axios.get(`/api/catalogs/search-item/${itemId}`);
    dispatch(fetchItemVariationSuccess(response.data));
  } catch (error) {
    dispatch(fetchItemVariationFailure(error.response?.data?.error || 'Failed to fetch item variation'));
  }
};