// src/reducers/rootReducer.js
import { combineReducers } from 'redux';
import catalogReducer from './catalogReducer';
import inventoryReducer from './inventoryReducer';
import paymentReducer from './paymentApisReducer/paymentFormReducer';
import paymentStatusReducer from './paymentApisReducer/paymentStatusReducer';
import paymentHistoryReducer from './paymentApisReducer/paymentHistoryReducer';
import customerListReducer from './customerApisReducer/customersListReducer';
import CustomerDetailsReducer from './customerApisReducer/customerDetailsReducer';
import customerUpdateReducer from './customerApisReducer/customerUpdateReducer';
import bookingReducer from './bookingReducer';
import loyaltyReducer from './loyaltyReducer';
import adminPanelReducer from './adminPanelReducer';
import dashboardReducer from './dashboardReducer';
import eventReducer from './eventPageReducer';
import orderConfirmationReducer from './orderConfirmationReducer';
import shoppingCartReducer from './shoppingCartReducer';
import paymentDetailsReducer from './paymentApisReducer/paymentDetailsReducer';
import registerLogicReducer from './customerApisReducer/registerLogicReducer';


const rootReducer = combineReducers({
  catalog: catalogReducer,
  inventory: inventoryReducer,
  payment: paymentReducer,
  paymentStatus: paymentStatusReducer,
  paymentHistory: paymentHistoryReducer,
  customers: customerListReducer,
  customer: CustomerDetailsReducer,
  customerUpdate: customerUpdateReducer,
  booking: bookingReducer,
  loyalty: loyaltyReducer,
  adminPanel: adminPanelReducer,
  dashboard: dashboardReducer,
  events: eventReducer,
  orderConfirmation: orderConfirmationReducer,
  shoppingCart: shoppingCartReducer,
  paymentDetails: paymentDetailsReducer,
  registerLogic: registerLogicReducer,
  customerList: customerListReducer,
});

export default rootReducer;
