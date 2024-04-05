import React from 'react';
import { Navbar, Nav, Container, Form, FormControl, Button, NavDropdown } from 'react-bootstrap';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const NavigationBar = () => {
  return (
    <Navbar bg="dark" expand="lg" className="shadow-sm navbar-modern" variant="dark">
      <Container fluid>
        <Link to="/" className="navbar-brand">
          <strong>Your Brand</strong>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto my-2 my-lg-0">
            <Link to="/" className="nav-link">Catalog</Link>
            <Link to="/booking" className="nav-link">Booking</Link>
            <Link to="/customers" className="nav-link">Customers</Link>
            <Link to="/inventory" className="nav-link">Inventory</Link>
            <Link to="/loyalty" className="nav-link">Loyalty</Link>
            <Link to="/auth" className="nav-link">Auth</Link>
            <Link to="/payment" className="nav-link">Payment</Link>
          </Nav>
          <Form className="d-flex my-2 my-lg-0">
            <FormControl
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-primary" className="d-flex align-items-center">
              <FaSearch />
            </Button>
          </Form>
          <NavDropdown title={<FaUserCircle size="1.5em" />} id="basic-nav-dropdown" alignRight className="user-dropdown">
            <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Logout</NavDropdown.Item>
          </NavDropdown>
        </Navbar.Collapse>
      </Container>

      {/* Custom CSS */}
      <style type="text/css">
        {`
          .navbar-modern .navbar-brand {
            font-size: 1.5em;
            color: #ffffff; // Change to white for better contrast
          }

          .navbar-modern .nav-link {
            margin-right: 1rem; // Add spacing between links
            color: #ffffff; // Change to white for better contrast
          }

          .navbar-modern .nav-link:hover {
            color: #ffc107; // Bootstrap warning color for hover effect
          }

          .navbar-modern .form-control {
            max-width: 300px; // Increase width of the search input
          }

          .navbar-modern .btn-outline-primary {
            color: #ffffff; // Change to white for better contrast
          }

          .navbar-modern .btn-outline-primary:hover {
            color: #000000; // Change to black on hover for better visibility
            background-color: #ffc107; // Bootstrap warning color for hover effect
          }

          .navbar-modern .user-dropdown {
            margin-left: 1rem; // Add spacing before the user icon
          }

          @media (max-width: 992px) {
            .navbar-modern .navbar-collapse {
              background-color: #343a40; // Dark background for the collapsed navbar
            }
          }
        `}
      </style>
    </Navbar>
  );
};

export default NavigationBar;
