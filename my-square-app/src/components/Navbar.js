import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleOutsideClick = (event) => {
            if (isMobileMenuOpen && !event.target.closest('.navbar')) {
                setIsMobileMenuOpen(false);
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => document.removeEventListener('click', handleOutsideClick);
    }, [isMobileMenuOpen]);

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <NavLink to="/" activeClassName="active">App Name</NavLink>
            </div>
            <button
                className="navbar-toggle"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle navigation"
            >
                {/* SVG for the toggle icon */}
                <svg viewBox="0 0 100 80" width="40" height="40" fill="#fff">
                    <rect width="100" height="10"></rect>
                    <rect y="30" width="100" height="10"></rect>
                    <rect y="60" width="100" height="10"></rect>
                </svg>
            </button>
            <ul className={`navbar-links ${isMobileMenuOpen ? 'active' : ''}`}>
                <li>
                    <NavLink to="/" activeClassName="active">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/services" activeClassName="active">Services</NavLink>
                </li>
                <li>
                    <NavLink to="/book" activeClassName="active">Book Appointment</NavLink>
                </li>
                <li>
                    <NavLink to="/bookings" activeClassName="active">My Bookings</NavLink>
                </li>
                <li>
                    <NavLink to="/contact" activeClassName="active">Contact Us</NavLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
