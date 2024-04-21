// src/reducers/catalogReducer.js
import { FETCH_CATALOG_START, FETCH_CATALOG_SUCCESS, FETCH_CATALOG_FAILURE } from '../../Actions/actionTypes';

const initialState = {
  catalog: [],
  loading: false,
  error: null,
};

const sortItems = (items, sortKey) => {
  return [...items].sort((a, b) => {
      switch (sortKey) {
          case 'name':
              return (a.itemVariationData?.name || "").localeCompare(b.itemVariationData?.name || "");
          case 'priceLowHigh':
              return (+a.itemVariationData.priceMoney?.amount || 0) - (+b.itemVariationData.priceMoney?.amount || 0);
          case 'priceHighLow':
              return (+b.itemVariationData.priceMoney?.amount || 0) - (+a.itemVariationData.priceMoney?.amount || 0);
          default:
              return 0;
      }
  });
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
    case 'SORT_CATALOG':
      return {
        ...state,
        catalog: sortItems(state.catalog, action.payload),
      };
      
    default:
      return state;
  }
};

export default catalogReducer;