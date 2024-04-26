// Manages the state for deleting catalog items. This reducer handles the loading state, tracks the ID of the deleted item, and captures any errors during the deletion process. It updates the state based on the lifecycle of a catalog item deletion request: start, success, and failure.
import { DELETE_CATALOG_ITEM_START, DELETE_CATALOG_ITEM_SUCCESS, DELETE_CATALOG_ITEM_FAILURE } from '../../Actions/actionTypes';

const initialState = {
  loading: false,
  deletedItemId: null,
  error: null,
};

const catalogDeleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_CATALOG_ITEM_START:
      return {
        ...state,
        loading: true,
      };
    case DELETE_CATALOG_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        deletedItemId: action.payload,
        error: null,
      };
    case DELETE_CATALOG_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default catalogDeleteReducer;