// reducers/index.js
import { combineReducers } from 'redux';
import bookingReducer from './bookingReducer';
import customerReducer from './customersReducer';
import inventoryReducer from './inventoryReducer';
import paymentReducer from './paymentReducer';

const rootReducer = combineReducers({
    bookings: bookingReducer,
    customers: customerReducer,
    inventory: inventoryReducer,
    payments: paymentReducer
});

export default rootReducer;
