import {
  CREATE_CATALOG_START,
  CREATE_CATALOG_SUCCESS,
  CREATE_CATALOG_FAILURE,
} from '../../Actions/actionTypes';

const initialState = {
  loading: false,
  item: null,
  error: null,
};

const catalogReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CATALOG_START:
      return {
        ...state,
        loading: true,
      };
    case CREATE_CATALOG_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
        error: null,
      };
    case CREATE_CATALOG_FAILURE:
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
