import axios from 'axios';
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
    const response = await axios.get(`/api/catalogs/Serach-item/${itemId}`);
    dispatch(fetchCatalogItemSuccess(response.data));
  } catch (error) {
    dispatch(fetchCatalogItemFailure(error.message));
  }
};
