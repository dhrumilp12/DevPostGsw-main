import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Actions/customerApisAction/registerLoginAction';
import logo from '../assets/1.jpg'
import {catalogSearch} from '../Actions/catalogApisAction/catalogSearch';
import { fetchCustomerDetails } from '../Actions/customerApisAction/customerDetailsAction';  // Check the correct path
const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.registerLogin.isAuthenticated);
  const customerInfo = useSelector(state => state.registerLogin.user);  // Assuming user details are stored here

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(catalogSearch(searchTerm));
    navigate(`/search-results?query=${searchTerm}`); // Navigate to a search results page or handle dynamically in the current page
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
    <Navbar expand="lg" variant="dark" className="shadow navbar-modern" style={{ backgroundColor: '#1a2035' }}>
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="Logo" style={{ height: '50px' }} />
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link to="/" className="nav-link">CatalogList</Link>
            <Link to="/booking" className="nav-link">Booking</Link>
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/loyalty" className="nav-link">Loyalty</Link>
            <Link to="/auth" className="nav-link">Auth</Link>
            <Link to="/payment" className="nav-link">Payment</Link>
          </Nav>
          <div className="d-flex align-items-center">
            <Form className="me-3"onSubmit={handleSearch}>
              <FormControl
               type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form>
            <Button variant="outline-info" className="text-white">
              <FaSearch />
            </Button>
            <NavDropdown 
              title={<FaUserCircle size="1.5em" />} 
              id="basic-nav-dropdown" 
              align="end" 
              className="ms-3"
            >
              <NavDropdown.Item onClick={handleProfileClick}>Profile</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="#settings">Settings</NavDropdown.Item>
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