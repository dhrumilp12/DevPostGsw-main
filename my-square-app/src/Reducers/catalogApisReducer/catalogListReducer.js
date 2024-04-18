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
      case 'SORT_CATALOG':
        let sortedCatalog = [...state.catalog];
        if (action.payload === 'name') {
          sortedCatalog.sort((a, b) => (a.itemVariationData.name || "").localeCompare(b.itemVariationData.name || ""));
        } else if (action.payload === 'priceLowHigh') {
          sortedCatalog.sort((a, b) => {
            return (a.itemVariationData.priceMoney?.amount || 0) - (b.itemVariationData.priceMoney?.amount || 0);
          });
        } else if (action.payload === 'priceHighLow') {
          sortedCatalog.sort((a, b) => {
            return (b.itemVariationData.priceMoney?.amount || 0) - (a.itemVariationData.priceMoney?.amount || 0);
          });
        }
        return {
          ...state,
          catalog: sortedCatalog
        };
      
    default:
      return state;
  }
};

export default catalogReducer;