import {
  FETCH_CATALOG_ITEM_START,
  FETCH_CATALOG_ITEM_SUCCESS,
  FETCH_CATALOG_ITEM_FAILURE,
} from '../../Actions/actionTypes';

const initialState = {
  item: null,
  loading: false,
  error: null,
};


const catalogSearchItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATALOG_ITEM_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATALOG_ITEM_SUCCESS:
      return {
        ...state,
        loading: false,
        item: action.payload,
        
        
      };
    case FETCH_CATALOG_ITEM_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default catalogSearchItemReducer;