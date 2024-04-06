// src/reducers/catalogReducer.js
import { FETCH_CATALOG_START, FETCH_CATALOG_SUCCESS, FETCH_CATALOG_FAILURE } from '../../Actions/actionTypes';

const initialState = {
  catalog: [],
  loading: false,
  error: null,
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATALOG_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false,
        catalog: action.payload,
      };
    case FETCH_CATALOG_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default catalogReducer;
