// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import catalogReducer from './catalogReducer';
import inventoryReducer from './inventoryReducer';
import paymentReducer from './paymentReducer';
import customerReducer from './customersReducer';
import bookingReducer from './bookingReducer';
import loyaltyReducer from './loyaltyReducer';
import oauthReducer from './oauthReducer';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  inventory: inventoryReducer,
  payment: paymentReducer,
  customers: customerReducer,
  booking: bookingReducer,
  loyalty: loyaltyReducer,
  auth: oauthReducer,
});

export default rootReducer;
