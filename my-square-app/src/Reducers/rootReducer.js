// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import catalogReducer from './catalogReducer';
import inventoryReducer from './inventoryReducer';
import paymentReducer from './paymentFormReducer';
import paymentStatusReducer from './paymentStatusReducer';
import paymentHistoryReducer from './paymentHistoryReducer';
import customerReducer from './customersReducer';
import bookingReducer from './bookingReducer';
import loyaltyReducer from './loyaltyReducer';
import adminPanelReducer from './adminPanelReducer';
import dashboardReducer from './dashboardReducer';
import eventReducer from './eventPageReducer';
import orderConfirmationReducer from './orderConfirmationReducer';
import shoppingCartReducer from './shoppingCartReducer';
import paymentDetailsReducer from './paymentDetailsReducer';
import registerLogicReducer from './registerLogicReducer';

const rootReducer = combineReducers({
  catalog: catalogReducer,
  inventory: inventoryReducer,
  payment: paymentReducer,
  paymentStatus: paymentStatusReducer,
  paymentHistory: paymentHistoryReducer,
  customers: customerReducer,
  booking: bookingReducer,
  loyalty: loyaltyReducer,
  adminPanel: adminPanelReducer,
  dashboard: dashboardReducer,
  events: eventReducer,
  orderConfirmation: orderConfirmationReducer,
  shoppingCart: shoppingCartReducer,
  paymentDetails: paymentDetailsReducer,
  registerLogic: registerLogicReducer,
});

export default rootReducer;
