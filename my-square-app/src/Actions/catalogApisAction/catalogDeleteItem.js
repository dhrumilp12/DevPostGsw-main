import axios from 'axios';
import { DELETE_CATALOG_ITEM_START, DELETE_CATALOG_ITEM_SUCCESS, DELETE_CATALOG_ITEM_FAILURE } from '../actionTypes';

// Action to start the deletion process of a catalog item
export const deleteCatalogItemStart = () => ({
  type: DELETE_CATALOG_ITEM_START,
});

// Action for successful deletion of a catalog item
export const deleteCatalogItemSuccess = (deletedItemId) => ({
  type: DELETE_CATALOG_ITEM_SUCCESS,
  payload: deletedItemId,
});

// Action for handling failures in deleting a catalog item
export const deleteCatalogItemFailure = (error) => ({
  type: DELETE_CATALOG_ITEM_FAILURE,
  payload: error,
});

// Thunk function to delete a catalog item by ID
export const deleteCatalogItem = (itemId) => async (dispatch) => {
  dispatch(deleteCatalogItemStart());
  try {
    const response = await axios.delete(`/api/catalogs/delete/${itemId}`);
    dispatch(deleteCatalogItemSuccess(response.data.deleted_object_ids)); // We expect an array of deleted IDs
    alert('Item deleted successfully'); // Alert the user of successful deletion
  } catch (error) {
    dispatch(deleteCatalogItemFailure(error.response.data.error));
    alert('Failed to delete item'); // Alert the user of a failure
  }
};