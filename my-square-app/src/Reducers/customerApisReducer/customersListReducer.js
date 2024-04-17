import { FETCH_CUSTOMERS_START, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE } from '../../Actions/actionTypes';

const initialState = {
  customers: [],
  loading: false,
  error: null,
};

const customerListReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CUSTOMERS_START:
      console.log("State before FETCH_CUSTOMERS_START:", state);
      return {
        ...state,
        loading: true,
        error: null,
      };
      case FETCH_CUSTOMERS_SUCCESS:
        console.log("State before FETCH_CUSTOMERS_SUCCESS:", state);
        return {
          ...state,
          loading: false,
          customers: action.payload,
        };
      
    case FETCH_CUSTOMERS_FAILURE:
      console.log("State before FETCH_CUSTOMERS_FAILURE:", state);
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      case 'SORT_CATALOG':
      let sortedCatalog = [...state.catalog];
      if (action.payload === 'name') {
        sortedCatalog.sort((a, b) => a.itemVariationData.name.localeCompare(b.itemVariationData.name));
      } else if (action.payload === 'priceLowHigh') {
        sortedCatalog.sort((a, b) => a.itemVariationData.priceMoney.amount - b.itemVariationData.priceMoney.amount);
      } else if (action.payload === 'priceHighLow') {
        sortedCatalog.sort((a, b) => b.itemVariationData.priceMoney.amount - a.itemVariationData.priceMoney.amount);
      }
      return {
        ...state,
        catalog: sortedCatalog
      };
    default:
      return state;
  }
};

export default customerListReducer;
