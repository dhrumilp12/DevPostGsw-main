import './App.css';
import React from 'react';
import { Provider } from 'react-redux'; // Import Provider from react-redux
import store from './Store/store'; // Import the store you've created
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingForm from './Components/BookingForm';
import CustomerList from './Components/CustomerList';
import Inventory from './Components/Inventory';
import Payment from './Components/Payment';
import Navbar from './Components/Navbar';

const App = () => {
  return (
    <Provider store={store}> {/* Wrap your app in the Provider component */}
      <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<BookingForm />} />
          <Route path="/customers" element={<CustomerList />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/payments" element={<Payment />} /> 
        </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
