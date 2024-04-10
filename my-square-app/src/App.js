import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterLogin from './Components/customerApisComponents/registerLogin.js';
import ProtectedRoute from './Components/protectedRoute';
import BookingForm from './Components/bookingApisComponent/bookingForm.js';
import UpdateBookingForm from './Components/bookingApisComponent/bookingUpdateForm';
import CancelBooking from './Components/bookingApisComponent/bookingCancel';
import BookingRetrive from './Components/bookingApisComponent/bookingRetrive';
import BookingsList from './Components/bookingApisComponent/bookingList';
import BookingSearchAvailabilityForm from './Components/bookingApisComponent/bookingSearchAvailability';
import BookingBulkRetrieveForm from './Components/bookingApisComponent/bookingBulkRetrive';

import BatchRetrieveInventoryCountsForm from './Components/inventoryApiComponent/inventoryBatchRetriveCount.js';
import BatchAdjustInventoryForm from './Components/inventoryApiComponent/inventoryBatchAdjust.js';


import CatalogDeleteItem from './Components/catalogApisComponent/catalogDeleteItem';
import CatalogList from './Components/catalogApisComponent/catalogList.js';
import CatalogCreate from './Components/catalogApisComponent/catalogCreate.js';
import CatalogSearch from './Components/catalogApisComponent/catalogSearch';
import CatalogSearchItem from './Components/catalogApisComponent/catalogSearchItem.js';
import catalogImage from './Components/catalogApisComponent/catalogImage'
import CustomerDetail from './Components/customerApisComponents/customerDetails.js';
import CustomerList from './Components/customerApisComponents/customerList';
import UpdateCustomer from './Components/customerApisComponents/customerUpdate.js';
import LoyaltyAccountForm from './Components/loyaltyApiComponent/createLoyaltyAccountForm.js';
import SearchLoyaltyAccountsForm from './Components/loyaltyApiComponent/searchLoyaltyAccount';
import RetrieveLoyaltyAccountForm from './Components/loyaltyApiComponent/retrieveLoyaltyAccountAction';
import AccumulateLoyaltyPointsForm from './Components/loyaltyApiComponent/accumulateLoyaltyPointsForm';
import AdjustLoyaltyPointsForm from './Components/loyaltyApiComponent/adjustLoyaltyPointsForm';
import Inventory from './Components/inventory';
import Loyalty from './Components/loyalty';
import PaymentForm from './Components/paymentApisComponents/paymentForm.js';
import PaymentStatus from './Components/paymentApisComponents/paymentStatus.js';
import PaymentHistory from './Components/paymentApisComponents/paymentHistory.js';
import PaymentDetail from './Components/paymentApisComponents/paymentDetails.js';
import Navbar from './Components/navbar';
import AdminPanel from './Components/adminPanel';
import Dashboard from './Components/dashboard';
import EventPage from './Components/eventPage';
import OrderConfirmation from './Components/orderConfirmation';
import ShoppingCart from './Components/shoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is at the top level of your app, ideally in index.js

function App() {
  const isAuthenticated = true;
  return (
    <Provider store={store}>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CatalogList />} />
        <Route path="/catalog-search" element={<CatalogSearch />} />
        <Route path="/catalogSearchItem/:itemId" element={<CatalogSearchItem />} />
        <Route path="/catalogCreate" element={<CatalogCreate />} />
        <Route path="/catalogDeleteItem/:itemId" element={<CatalogDeleteItem />} />
        
        <Route path="/registerLogin" element={<RegisterLogin />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/updateBooking/:bookingId" element={<UpdateBookingForm />} />
        <Route path="/cancelBooking/:bookingId" element={<CancelBooking />} />
        <Route path="/booking/:bookingId" element={<BookingRetrive />} />
        <Route path="/bookingList" element={<BookingsList />} />
        <Route path="/search-availability" element={<BookingSearchAvailabilityForm />} />
        <Route path="/bulk-retrieve-bookings" element={<BookingBulkRetrieveForm />} />
        
        <Route path="/batch-retrieve-inventory-counts" element={<BatchRetrieveInventoryCountsForm />} />
        <Route path="/batch-adjust-inventory" element={<BatchAdjustInventoryForm />} />

        <Route path="/customerDetail/:customerId" element={<CustomerDetail  />} />
        <Route path="/customerList" element={<CustomerList />} />
        <Route path="/update-customer/:customerId" element={<UpdateCustomer/>} />

        <Route path="/loyalty-Account" element={<LoyaltyAccountForm/>} />
        <Route path="/search-loyalty-accounts" element={<SearchLoyaltyAccountsForm />} />
        <Route path="/retrieveLoyaltyAccountForm" element={<RetrieveLoyaltyAccountForm/>} />
        <Route path="/accumulate-loyalty-points" element={<AccumulateLoyaltyPointsForm/>} />
        <Route path="/adjust-loyalty-points" element={<AdjustLoyaltyPointsForm />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/loyalty" element={<Loyalty />} />
        <Route path="/payment" element={<><PaymentForm /><PaymentStatus /></>} />
        <Route path="/admin" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AdminPanel /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard /></ProtectedRoute>} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        <Route path="/payment-history" element={<PaymentHistory />} />
        <Route path="/payment-detail/:paymentId" element={<PaymentDetail />} />
        <Route path="/catalogImage" element={<catalogImage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
