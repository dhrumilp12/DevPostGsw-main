// src/reducers/catalogReducer.js
// Manages the state for fetching and sorting catalog items. This reducer handles the loading state, stores the fetched catalog, and manages errors. Additionally, it includes functionality to sort catalog items based on different criteria like name or price, which is triggered by a custom 'SORT_CATALOG' action.

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