import React from 'react';
import { Provider } from 'react-redux';
import store from './Store/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterLogin from './Components/registerLogin.js';
import ProtectedRoute from './Components/protectedRoute';
import BookingForm from './Components/bookingForm';
import Catalog from './Components/catalog';
import CustomerDetail from './Components/customerDetails';
import Inventory from './Components/inventory';
import Loyalty from './Components/loyalty';
import PaymentForm from './Components/paymentForm';
import PaymentStatus from './Components/paymentStatus';
import PaymentHistory from './Components/paymentHistory';
import PaymentDetail from './Components/paymentDetails';
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
        <Route path="/" element={<Catalog />} />
        <Route path="/registerLogin" element={<RegisterLogin />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/customerDetail/:customerId" element={<CustomerDetail  />} />
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
        {/* Add more routes as needed */}
      </Routes>
    </Router>
    </Provider>
  );
}

export default App;
