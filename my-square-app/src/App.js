import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import {store, persistor} from './Store/store';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from './Components/themeContext';
import BookingForm from './Components/bookingApisComponent/bookingForm.js';
import UpdateBookingForm from './Components/bookingApisComponent/bookingUpdateForm';
import CancelBooking from './Components/bookingApisComponent/bookingCancel';
//import BookingRetrive from './Components/bookingApisComponent/bookingRetrive'; we are not using this, since we are using booking bulk Retrive
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
import CatalogImageForm from './Components/catalogApisComponent/catalogImageForm';

import CustomerDetail from './Components/customerApisComponents/customerDetails.js';
import CustomerList from './Components/customerApisComponents/customerList';
import UpdateCustomer from './Components/customerApisComponents/customerUpdate.js';
import RegisterLogin from './Components/customerApisComponents/registerLogin.js';

import TeamMembers from './Components/teamMembers';
import LocationsComponent from './Components/locationId';

import LoyaltyAccountForm from './Components/loyaltyApiComponent/createLoyaltyAccountForm.js';
import SearchLoyaltyAccountsForm from './Components/loyaltyApiComponent/searchLoyaltyAccount';
import RetrieveLoyaltyAccountForm from './Components/loyaltyApiComponent/retrieveLoyaltyAccountAction';
import AccumulateLoyaltyPointsForm from './Components/loyaltyApiComponent/accumulateLoyaltyPointsForm';
import AdjustLoyaltyPointsForm from './Components/loyaltyApiComponent/adjustLoyaltyPointsForm';

import PaymentForm from './Components/paymentApisComponents/paymentForm.js';
import PaymentStatus from './Components/paymentApisComponents/paymentStatus.js';
import PaymentHistory from './Components/paymentApisComponents/paymentHistory.js';
import PaymentDetails from './Components/paymentApisComponents/paymentDetails.js';
import Navbar from './Components/Navbar';
import Footer from './Components/footer';


//import ShoppingCart from './Components/shoppingCart';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is at the top level of your app, ideally in index.js
import './App.css';
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.registerLogin.isAuthenticated);
  console.log('isAuthenticated:', isAuthenticated);
  return isAuthenticated ? children : <Navigate to="/registerLogin" replace />;
};



function App() {
  useEffect(() => {
    document.body.style.backgroundColor = '#b0b8c5';
    
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <Router>
      <ThemeProvider>
      <div className="site-container">
        <Navbar />
        <div className="content-wrap">
        <Routes>
          
          <Route path="/" element={<ProtectedRoute><CatalogList /></ProtectedRoute>} />
          <Route path="/catalog-search" element={<CatalogSearch />} />
          <Route path="/catalogSearchItem/:itemId" element={<CatalogSearchItem />} />
          <Route path="/catalogCreate" element={<CatalogCreate />} />
          <Route path="/catalogDeleteItem/:itemId" element={<CatalogDeleteItem />} />
          <Route path="/catalog-image" element={<CatalogImageForm />} />

          <Route path="/booking" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
          <Route path="/updateBooking/:bookingId" element={<ProtectedRoute><UpdateBookingForm /></ProtectedRoute>} />
          <Route path="/cancelBooking/:bookingId" element={<ProtectedRoute><CancelBooking /></ProtectedRoute>} />
          <Route path="/bookingList" element={<ProtectedRoute><BookingsList /></ProtectedRoute>} />
          <Route path="/search-availability" element={<ProtectedRoute><BookingSearchAvailabilityForm /></ProtectedRoute>} />
          <Route path="/bulk-retrieve-bookings" element={<ProtectedRoute><BookingBulkRetrieveForm /></ProtectedRoute>} />

          <Route path="/batch-retrieve-inventory-counts" element={<ProtectedRoute><BatchRetrieveInventoryCountsForm /></ProtectedRoute>} />
          <Route path="/batch-adjust-inventory" element={<ProtectedRoute><BatchAdjustInventoryForm /></ProtectedRoute>} />

          <Route path="/registerLogin" element={<RegisterLogin />} />
          <Route path="/customerDetail/:customerId" element={<ProtectedRoute><CustomerDetail /></ProtectedRoute>} />
          <Route path="/customerList" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
          <Route path="/update-customer/:customerId" element={<ProtectedRoute><UpdateCustomer /></ProtectedRoute>} />

          <Route path="/team-members" element={<protectedRoute><TeamMembers /></protectedRoute>} />
          <Route path="/locationId" element={<protectedRoute><LocationsComponent /></protectedRoute>} />
          <Route path="/loyalty-Account" element={<ProtectedRoute><LoyaltyAccountForm /></ProtectedRoute>} />
          <Route path="/search-loyalty-accounts" element={<ProtectedRoute><SearchLoyaltyAccountsForm /></ProtectedRoute>} />
          <Route path="/retrieveLoyaltyAccountForm" element={<ProtectedRoute><RetrieveLoyaltyAccountForm /></ProtectedRoute>} />
          <Route path="/accumulate-loyalty-points" element={<ProtectedRoute><AccumulateLoyaltyPointsForm /></ProtectedRoute>} />
          <Route path="/adjust-loyalty-points" element={<ProtectedRoute><AdjustLoyaltyPointsForm /></ProtectedRoute>} />

          <Route path="/payment" element={<ProtectedRoute><><PaymentForm /><PaymentStatus /></></ProtectedRoute>} />

          
          <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
          <Route path="/payment-detail/:paymentId" element={<ProtectedRoute><PaymentDetails /></ProtectedRoute>} />
          {/* Add more routes as needed */}
        </Routes>
        </div>
        <Footer />
        </div>
        </ThemeProvider>
      </Router>
    </PersistGate>
  </Provider>
  );
}

export default App;