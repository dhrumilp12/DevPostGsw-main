
// src/actions/catalogListActions.js
import axios from 'axios';
import { FETCH_CATALOG_START, FETCH_CATALOG_SUCCESS, FETCH_CATALOG_FAILURE } from '../actionTypes.js';

export const fetchCatalogStart = () => ({
  type: FETCH_CATALOG_START,
});

export const fetchCatalogSuccess = catalog => ({
  type: FETCH_CATALOG_SUCCESS,
  payload: catalog,
});

export const fetchCatalogFailure = error => ({
  type: FETCH_CATALOG_FAILURE,
  payload: error,
});

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

export const sortCatalog = (sortKey) => ({
  type: 'SORT_CATALOG',
  payload: sortKey,
});
