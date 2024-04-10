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