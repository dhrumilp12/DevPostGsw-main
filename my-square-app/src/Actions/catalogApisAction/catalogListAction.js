
// src/actions/catalogListActions.js
import axios from 'axios';
import { FETCH_CATALOG_START, FETCH_CATALOG_SUCCESS, FETCH_CATALOG_FAILURE } from '../actionTypes.js';

// Action to start the fetch process for catalog listings
export const fetchCatalogStart = () => ({
  type: FETCH_CATALOG_START,
});

// Action for successful fetch of catalog listings
export const fetchCatalogSuccess = catalog => ({
  type: FETCH_CATALOG_SUCCESS,
  payload: catalog,
});

// Action for handling failures in fetching catalog listings
export const fetchCatalogFailure = error => ({
  type: FETCH_CATALOG_FAILURE,
  payload: error,
});

// Action to sort catalog listings
export const sortCatalog = (sortKey) => ({
  type: 'SORT_CATALOG',
  payload: sortKey,
});

// Thunk function to fetch catalog listings
export const fetchCatalog = () => async dispatch => {
  dispatch(fetchCatalogStart());
  try {
    const response = await axios.get('/api/catalogs/list');
    console.log("Response data:", response.data);
    dispatch(fetchCatalogSuccess(response.data));
  } catch (error) {
    dispatch(fetchCatalogFailure(error.message));
  }
};


