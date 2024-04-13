import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';
//import { useDispatch } from 'react-redux';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // const dispatch = useDispatch(); // Uncomment when needed


  const handleLogout = () => {
    // Optional: dispatch a logout action if you manage authentication state in Redux
    // dispatch({ type: 'LOGOUT' });
    navigate('/registerLogin');
  };
  // Do not display the navbar on the RegisterLogin page
  if (location.pathname === '/registerLogin') {
    return null;
  }

  return (
    <Navbar expand="lg" variant="dark" className="shadow navbar-modern" style={{ backgroundColor: '#1a2035' }}>
      <Container fluid>
        <Link to="/" className="navbar-brand">Your Brand</Link>
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
            <Form className="me-3">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
            </Form>
            <Button variant="outline-info" className="text-white">
              <FaSearch />
            </Button>
            <NavDropdown 
              title={<FaUserCircle size="1.5em" />} 
              id="basic-nav-dropdown" 
              align="end" 
              className="ms-3" // Add margin-left to NavDropdown for spacing
            >
            <NavDropdown.Item as={Link} to="#profile">Profile</NavDropdown.Item>
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
        
        .navbar-modern .navbar-brand:hover {
          transform: scale(1.1);
          text-decoration: none;
          color:#17a2b8;
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
          background-color: #2c303b;
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
        
        .navbar-modern .dropdown-item:hover, .navbar-modern .dropdown-item, .navbar-toggler:focus {
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