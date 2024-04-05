import {
    FETCH_PAYMENT_DETAILS_START,
    FETCH_PAYMENT_DETAILS_SUCCESS,
    FETCH_PAYMENT_DETAILS_FAILURE,
} from '../../Actions/actionTypes';

const initialState = {
    paymentDetails: {},
    loading: false,
    error: null,
};

const paymentDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PAYMENT_DETAILS_START:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case FETCH_PAYMENT_DETAILS_SUCCESS:
            return {
                ...state,
                loading: false,
                paymentDetails: action.payload,
            };
        case FETCH_PAYMENT_DETAILS_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};

export default paymentDetailsReducer;
