// src/reducers/rootReducer.js
// Combines all application reducers using Redux's combineReducers method. This setup facilitates modular management of application state segmented into specific domains such as payments, bookings, inventory, loyalty points, and user management.

import { combineReducers } from 'redux';


import catalogListReducer from './catalogApisReducer/catalogListReducer';
import catalogCreateReducer from './catalogApisReducer/catalogCreateReducer';
import catalogDeleteItemReducer from './catalogApisReducer/catalogDeleteItem';
import catalogSearchReducer from './catalogApisReducer/catalogSearchReducer';
import catalogSearchItemReducer from './catalogApisReducer/catalogSearchItemReducer';
import catalogImageReducer from './catalogApisReducer/catalogImageReducer'; 

import paymentReducer from './paymentApisReducer/paymentFormReducer';
import paymentStatusReducer from './paymentApisReducer/paymentStatusReducer';
import paymentHistoryReducer from './paymentApisReducer/paymentHistoryReducer';

import customerListReducer from './customerApisReducer/customersListReducer';
import CustomerDetailsReducer from './customerApisReducer/customerDetailsReducer';
import customerUpdateReducer from './customerApisReducer/customerUpdateReducer';

import bookingReducer from './bookingApisReducer/bookingReducer';
import bookingUpdateReducer from './bookingApisReducer/bookingUpdateReducer';
import bookingCancelReducer from './bookingApisReducer/bookingCancelReducer';
import bookingRetriveReducer from './bookingApisReducer/bookingRetriveReducer';
import bookingsListReducer from './bookingApisReducer/bookingListReducer';
import searchAvailabilityReducer from './bookingApisReducer/bookingSearchAvailabilityReducer';
import bulkRetrieveBookingsReducer from './bookingApisReducer/bookingBulkRetriveReducer';

import inventoryCountsReducer from './inventoryApiReducer/inventoryBatchRetrieveReducer';
import inventoryAdjustmentReducer from './inventoryApiReducer/inventoryAdjustmentReducer';
import loyaltyAccountReducer from './loyaltyApiReducer/loyaltyAccountReducer';
import searchLoyaltyAccountsReducer from './loyaltyApiReducer/searchLoyaltyAccountReducer';
import retrieveLoyaltyAccountReducer from './loyaltyApiReducer/retrieveLoyaltyAccountReducer';
import accumulateLoyaltyPointsReducer from './loyaltyApiReducer/accumulateLoyaltyPointsReducer';
import adjustLoyaltyPointsReducer from './loyaltyApiReducer/adjustLoyaltyPointsReducer';

/*import adminPanelReducer from './adminPanelReducer';
import dashboardReducer from './dashboardReducer';
*/

//import shoppingCartReducer from './shoppingCartReducer';
import paymentDetailsReducer from './paymentApisReducer/paymentDetailsReducer';
import registerLogicReducer from './customerApisReducer/registerLogicReducer';


const rootReducer = combineReducers({
 

  catalogList: catalogListReducer,
  catalogCreate: catalogCreateReducer,
  catalogDeleteItem: catalogDeleteItemReducer,
  catalogSearch: catalogSearchReducer,
  catalogSearchItem: catalogSearchItemReducer,
  catalogImage: catalogImageReducer,
  
  payment: paymentReducer,
  paymentStatus: paymentStatusReducer,
  paymentHistory: paymentHistoryReducer,

  
  customers: customerListReducer,
  customerDetails: CustomerDetailsReducer,
  customerUpdate: customerUpdateReducer,

  booking: bookingReducer,
  bookingUpdate: bookingUpdateReducer,
  bookingCancel: bookingCancelReducer,
  bookingRetrive: bookingRetriveReducer,
  bookingsList: bookingsListReducer,
  bookingAvailabilitySearch: searchAvailabilityReducer,
  bulkRetrieveBookings: bulkRetrieveBookingsReducer,
  
  inventoryCounts: inventoryCountsReducer,
  inventoryAdjustment: inventoryAdjustmentReducer,
  loyaltyAccount: loyaltyAccountReducer,
  searchLoyaltyAccounts: searchLoyaltyAccountsReducer,
  retrieveLoyaltyAccount: retrieveLoyaltyAccountReducer,
  loyaltyPointsAccumulation: accumulateLoyaltyPointsReducer,
  adjustLoyaltyPoints: adjustLoyaltyPointsReducer,
 
 
 
  paymentDetails: paymentDetailsReducer,
  registerLogin: registerLogicReducer,
  customerList: customerListReducer,
});

export default rootReducer;