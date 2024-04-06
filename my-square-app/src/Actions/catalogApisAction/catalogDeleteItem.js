import axios from 'axios';
import { DELETE_CATALOG_ITEM_START, DELETE_CATALOG_ITEM_SUCCESS, DELETE_CATALOG_ITEM_FAILURE } from '../actionTypes';

export const deleteCatalogItemStart = () => ({
  type: DELETE_CATALOG_ITEM_START,
});

export const deleteCatalogItemSuccess = (deletedItemId) => ({
  type: DELETE_CATALOG_ITEM_SUCCESS,
  payload: deletedItemId,
});

export const deleteCatalogItemFailure = (error) => ({
  type: DELETE_CATALOG_ITEM_FAILURE,
  payload: error,
});

export const deleteCatalogItem = (itemId) => async (dispatch) => {
  dispatch(deleteCatalogItemStart());
  try {
    const response = await axios.delete(`/api/catalogs/delete/${itemId}`);
    dispatch(deleteCatalogItemSuccess(response.data.deletedItemId));
  } catch (error) {
    dispatch(deleteCatalogItemFailure(error.message));
  }
};
