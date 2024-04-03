// src/reducers/inventoryReducer.js
import { FETCH_INVENTORY_START, FETCH_INVENTORY_SUCCESS, FETCH_INVENTORY_FAILURE } from '../Actions/actionTypes.js';

const initialState = {
  inventory: [],
  loading: false,
  error: null,
};

const inventoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INVENTORY_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_INVENTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        inventory: action.payload,
      };
    case FETCH_INVENTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default inventoryReducer;
