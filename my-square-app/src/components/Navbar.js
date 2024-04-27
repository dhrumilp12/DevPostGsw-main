// NavigationBar provides navigation links, search functionality, and user account management.
// It includes dynamic theming, responsive design, and dropdowns for user actions and theme toggling.
// Integrates search with catalog actions and navigates based on authentication status.

import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Actions/customerApisAction/registerLoginAction';
import logo from '../assets/1.jpg'
import {catalogSearch} from '../Actions/catalogApisAction/catalogSearch';
import { fetchCustomerDetails } from '../Actions/customerApisAction/customerDetailsAction';  // Check the correct path
import { useTheme } from 'themeContext';

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expanded, setExpanded] = useState(false); 
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.registerLogin.isAuthenticated);
  const customerInfo = useSelector(state => state.registerLogin.user);  // Assuming user details are stored here
  const { theme, toggleTheme } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(catalogSearch(searchTerm));
      navigate(`/catalog-search?query=${searchTerm}`);
      setExpanded(false);  // Close navbar toggle after search
    }
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleProfileClick = () => {
    if (customerInfo && customerInfo.squareCustomerId) {
      dispatch(fetchCustomerDetails(customerInfo.squareCustomerId));  // Fetching customer details
      navigate(`/customerDetail/${customerInfo.squareCustomerId}`);  // Redirecting to profile page
    }
  };
  
  useEffect(() => {
    if (!isAuthenticated && location.pathname !== '/registerLogin') {
      navigate('/registerLogin', { replace: true });
    }
  }, [isAuthenticated, navigate, location.pathname]);

  if (location.pathname === '/registerLogin') {
    return null;
  }


  return (
    <Navbar expand="lg" variant="dark" className={`shadow navbar-modern ${theme}`} style={{ backgroundColor: theme === 'dark' ? '#1a2035' : '#f8f9fa' }}expanded={expanded} onToggle={() => setExpanded(!expanded)}>
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
         
            <Link to="/catalog-image" className="nav-link">Catalog Image</Link>
            <Link to="/customerList" className="nav-link">Customers List</Link>
            <Link to="/catalogCreate" className="nav-link">Create Catalog</Link>
            <Link to="/batch-retrieve-inventory-counts" className="nav-link">Inventory Counts</Link>
            <Link to="/search-availability" className="nav-link">Booking-Availables</Link>
            <Link to="/bookingList" className="nav-link">Booking List</Link>
            <Link to="/payment-history" className="nav-link">Payment History</Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Form className="d-flex"onSubmit={handleSearch}>
              <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              /> 
              <Button variant="outline-info"type="submit" className="text-white">
              <FaSearch />
            </Button>
            </Form>
            
            <NavDropdown 
              title={<FaUserCircle size="1.5em" />} 
              id="basic-nav-dropdown" 
              align="end" 
              className="ms-3"
            >
              <NavDropdown.Item onClick={handleProfileClick}>Profile</NavDropdown.Item>
              <NavDropdown.Item onClick={toggleTheme}>
                Toggle Theme
              </NavDropdown.Item>
              <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          </div>
        </Navbar.Collapse>
      </Container>

      {/* Enhanced Custom CSS */}
      <style type="text/css">{`
        .navbar-modern {
          background-color: #1a2035;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .navbar-modern .navbar-brand {
          font-size: 1.8em;
          color: #FFF;
          font-weight: bold;
          transition: transform 0.3s ease;
        }

        .navbar-modern .navbar-brand img {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border-radius: 5px; // Adds a slight rounding to the corners
          box-shadow: 2px 2px 10px rgba(0,0,0,0.3); // Adds a subtle shadow
        }

        .navbar-modern .navbar-brand img:hover {
          transform: scale(1.05); // Slightly enlarges the logo on hover
          box-shadow: 3px 3px 15px rgba(0,0,0,0.5); // Enhances the shadow on hover
        }
        
        .navbar-modern .nav-link {
          color: #b0b8c5;
          margin-right: 1rem;
          transition: color 0.3s ease;
        }
        
        .navbar-modern .nav-link:hover, .navbar-modern .nav-link:focus {
          color: #d1d9e6;
          text-decoration: none;
          color:#17a2b8;
        }
        
        .navbar-modern .form-control {
          background-color: #1a2035;
          border: 2px solid #2c303b;
          border-radius: 2rem;
          color: #FFF;
          transition: border-color 0.3s ease;
        }
        
        .navbar-modern .form-control:focus {
          border-color: #17a2b8;
          background-color: #2c303b;
          box-shadow: none;
          color:#17a2b8;
        }
        
        .navbar-modern .btn-outline-info {
          border: 2px solid #17a2b8;
          border-radius: 2rem;
          transition: all 0.3s ease;
        }
        
        .navbar-modern .btn-outline-info:hover {
          background-color: #17a2b8;
          border-color: #17a2b8;
        }
        
        .navbar-modern .dropdown-menu {
          background-color: #1a2035;
          border: none;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          border-radius: 0.5rem;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        
        .navbar-modern .dropdown-item {
          color: #c0cad8;
          transition: color 0.2s ease;
        }
        
        .navbar-modern .dropdown-item:hover, .navbar-modern .dropdown-item:focus, .navbar-toggler:focus {
          background-color: #1f2833;
          color:#17a2b8;
        }
        
        .navbar-modern .dropdown-item:active {
          background-color: #17a2b8;
          color: #FFF;
        }
        
        @media (max-width: 992px) {
          .navbar-modern .navbar-collapse {
            background-color: #1a2035;
          }
        
          .navbar-modern .nav-link {
            padding: 0.5rem 1rem;
          }
        
          .navbar-modern .dropdown-menu {
            background-color: #1a2035;
          }
        }
      `}</style>
    </Navbar>
  );
};

export default NavigationBar;