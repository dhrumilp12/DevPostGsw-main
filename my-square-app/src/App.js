import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BookingForm from './Components/bookingForm';
import Catalog from './Components/catalog';
import Customers from './Components/customers';
import Inventory from './Components/inventory';
import Loyalty from './Components/loyalty';
import Auth from './Components/oauth';
import PaymentForm from './Components/paymentForm';
import Navbar from './Components/navbar';
import AdminPanel from './Components/adminPanel';
import Dashboard from './Components/dashboard';
import EventPage from './Components/eventPage';
import OrderConfirmation from './Components/orderConfirmation';
import ShoppingCart from './Components/shoppingCart';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Catalog />} />
        <Route path="/booking" element={<BookingForm />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/inventory" element={<Inventory />} />
        <Route path="/loyalty" element={<Loyalty />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/events" element={<EventPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/shopping-cart" element={<ShoppingCart />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
