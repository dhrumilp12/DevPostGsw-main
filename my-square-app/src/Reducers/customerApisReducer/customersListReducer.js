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
    default:
      return state;
  }
};

export default customerListReducer;
