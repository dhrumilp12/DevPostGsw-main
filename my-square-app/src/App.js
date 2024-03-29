import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingForm from './components/BookingForm';
import CustomerList from './components/CustomerList';
import Inventory from './components/Inventory';
import Payment from './components/Payment';

const App = () => {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<BookingForm />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/payments" element={<Payment />} /> 
          </Routes>
      </BrowserRouter>
  );
};



export default App;
