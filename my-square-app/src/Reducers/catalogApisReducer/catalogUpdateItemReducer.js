import {
    UPDATE_CATALOG_ITEM_START,
    UPDATE_CATALOG_ITEM_SUCCESS,
    UPDATE_CATALOG_ITEM_FAILURE,
  } from '../../Actions/actionTypes';
  
  const initialState = {
    item: {},
    loading: false,
    error: null,
  };
  
  export const catalogUpdateItemReducer = (state = initialState, action) => {
    switch (action.type) {
      case UPDATE_CATALOG_ITEM_START:
        return {
          ...state,
          loading: true,
        };
      case UPDATE_CATALOG_ITEM_SUCCESS:
        return {
          ...state,
          loading: false,
          item: action.payload,
        };
      case UPDATE_CATALOG_ITEM_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload,
        };
      default:
        return state;
    }
  };
  