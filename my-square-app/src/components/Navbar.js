import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Catalog</Link></li>
        <li><Link to="/booking">Booking</Link></li>
        <li><Link to="/customers">Customers</Link></li>
        <li><Link to="/inventory">Inventory</Link></li>
        <li><Link to="/loyalty">Loyalty</Link></li>
        <li><Link to="/auth">Auth</Link></li>
        <li><Link to="/payment">Payment</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
