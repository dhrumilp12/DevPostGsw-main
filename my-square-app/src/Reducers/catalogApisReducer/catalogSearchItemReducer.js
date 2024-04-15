import {
  FETCH_CATALOG_ITEM_START,
  FETCH_CATALOG_ITEM_SUCCESS,
  FETCH_CATALOG_ITEM_FAILURE,
  FETCH_ITEM_VARIATION_START,
  FETCH_ITEM_VARIATION_SUCCESS,
  FETCH_ITEM_VARIATION_FAILURE
} from '../../Actions/actionTypes';


const initialState = {
  item: null,
  itemVariation: null,
  loading: false,
  error: null
};

const catalogSearchItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CATALOG_ITEM_START:
    case FETCH_ITEM_VARIATION_START:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_CATALOG_ITEM_SUCCESS:
      return {
        ...state,
        item: action.payload,
        loading: false
      };
    case FETCH_ITEM_VARIATION_SUCCESS:
      return {
        ...state,
        itemVariation: action.payload,
        loading: false
      };
    case FETCH_CATALOG_ITEM_FAILURE:
    case FETCH_ITEM_VARIATION_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default catalogSearchItemReducer;