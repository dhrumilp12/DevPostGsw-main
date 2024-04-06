import axios from 'axios';

import { UPDATE_CATALOG_ITEM_START, UPDATE_CATALOG_ITEM_SUCCESS, UPDATE_CATALOG_ITEM_FAILURE } from '../actionTypes.js';


// Action Creators
export const updateCatalogItemStart = () => ({
  type: UPDATE_CATALOG_ITEM_START,
});

export const updateCatalogItemSuccess = (item) => ({
  type: UPDATE_CATALOG_ITEM_SUCCESS,
  payload: item,
});

export const updateCatalogItemFailure = (error) => ({
  type: UPDATE_CATALOG_ITEM_FAILURE,
  payload: error,
});

// Thunk Action Creator
export const updateCatalogItem = (itemId, itemData) => async (dispatch) => {
  dispatch(updateCatalogItemStart());
  try {
    const response = await axios.put(`/api/catalogs/update-catalog/${itemId}`, itemData);
    dispatch(updateCatalogItemSuccess(response.data));
  } catch (error) {
    dispatch(updateCatalogItemFailure(error.message));
  }
};
