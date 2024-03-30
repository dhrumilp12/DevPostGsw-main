// src/redux/reducers/customersReducer.js
import { FETCH_CUSTOMERS_START, FETCH_CUSTOMERS_SUCCESS, FETCH_CUSTOMERS_FAILURE  } from '../action/customerActions';

const initialState = {
    loading: false,
    customers: [],
    error: null 
};

const customersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CUSTOMERS_START:
            return { ...state, loading: true };
        case FETCH_CUSTOMERS_SUCCESS:
            return { ...state, loading: false, customers: action.payload, error: null }; 
        case FETCH_CUSTOMERS_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default customersReducer;
