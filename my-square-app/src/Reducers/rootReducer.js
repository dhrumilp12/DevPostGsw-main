// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import catalogReducer from './catalogReducer';
import inventoryReducer from './inventoryReducer';
import paymentReducer from './paymentReducer';
import customerReducer from './customersReducer';
import bookingReducer from './bookingReducer';
import loyaltyReducer from './loyaltyReducer';
import oauthReducer from './oauthReducer';
import adminPanelReducer from './adminPanelReducer';
import dashboardReducer from './dashboardReducer';
import eventReducer from './eventReducer';
import orderConfirmationReducer from './orderConfirmationReducer';
import shoppingCartReducer from './shoppingCartReducer';


const rootReducer = combineReducers({
  catalog: catalogReducer,
  inventory: inventoryReducer,
  payment: paymentReducer,
  customers: customerReducer,
  booking: bookingReducer,
  loyalty: loyaltyReducer,
  auth: oauthReducer,
  adminPanel: adminPanelReducer,
  dashboard: dashboardReducer,
  events: eventReducer,
  orderConfirmation: orderConfirmationReducer,
  shoppingCart: shoppingCartReducer,
});

export default rootReducer;
