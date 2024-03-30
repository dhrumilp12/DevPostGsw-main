//paymentReducer.js
import { PROCESS_PAYMENT_START, PROCESS_PAYMENT_SUCCESS, PROCESS_PAYMENT_FAILURE } from '../action/paymentActions';

const initialState = {
    loading: false,
    error: null,
    // Add a property to hold payment info after a successful transaction (if needed)
};

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case PROCESS_PAYMENT_START:
            return { ...state, loading: true }; 
        case PROCESS_PAYMENT_SUCCESS:
            return { ...state, loading: false, error: null };  // You might add paymentInfo here
        case PROCESS_PAYMENT_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

export default paymentReducer;
