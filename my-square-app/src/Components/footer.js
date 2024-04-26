import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { useLocation } from 'react-router-dom';


const Footer = () => {
    const location = useLocation();
    const isRegisterLogin = location.pathname === '/registerLogin';

    if (isRegisterLogin) {
        return null; // Do not render the footer on the registerLogin page
    }
    return (
        <footer className="py-4 footer-style">
            <Container>
                <Row className="text-center text-md-left">
                    <Col md={4} className="mb-3">
                        <h5 className="section-title">Contact Us</h5>
                        <ul className="list-unstyled">
                            <li><strong>Address:</strong> 123 Example St, City, Country</li>
                            <li><strong>Phone:</strong> +1 234 567 8900</li>
                            <li><strong>Email:</strong> contact@example.com</li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5 className="section-title">Follow Us</h5>
                        <ul className="list-unstyled">
                            <li><FontAwesomeIcon icon={faFacebookF} /><a href="https://facebook.com/yourpage">Facebook</a></li>
                            <li><FontAwesomeIcon icon={faTwitter} /><a href="https://twitter.com/yourpage">Twitter</a></li>
                            <li><FontAwesomeIcon icon={faInstagram} /><a href="https://instagram.com/yourpage">Instagram</a></li>
                            <li><FontAwesomeIcon icon={faLinkedinIn} /><a href="https://linkedin.com/in/yourpage">LinkedIn</a></li>
                        </ul>
                    </Col>
                    <Col md={4} className="mb-3">
                        <h5 className="section-title">More Information</h5>
                        <ul className="list-unstyled">
                            <li><a href="/about">About Us</a></li>
                            <li><a href="/privacy">Privacy Policy</a></li>
                            <li><a href="/terms">Terms of Service</a></li>
                        </ul>
                    </Col>
                </Row>
                <div className="text-center mt-3">
                    <p className="copyright">© {new Date().getFullYear()} Your Company Name. All Rights Reserved.</p>
                </div>
            </Container>
            <style type="text/css">{`
            
            .footer-style {
                background-color: #1a2035;
                color: #b0b8c5;
                border-top: 3px solid #335C67;
                box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.3);
                margin-top: auto;
            }
            
            .footer-style a {
                color: #b0b8c5;
                transition: color 0.3s ease;
            }
            
            .footer-style a:hover {
                color: #17a2b8;
                text-decoration: none;
            }
            
            .section-title {
                color: #17a2b8;
                margin-bottom: 1rem;
            }
            
            ul.list-unstyled li strong {
                font-weight: 600;
            }
            
            ul.list-unstyled {
                padding-left: 0;
            }
            
            ul.list-unstyled li {
                padding: 0.25rem 0;
            }
            
            ul.list-unstyled a {
                display: inline-block;
                margin-left: 0.5rem;
            }
            
            .faFacebookF, .faTwitter, .faInstagram, .faLinkedinIn {
                margin-right: 8px;
            }
            
            .text-center {
                text-align: center;
            }
            
            .text-md-left {
                text-align: start;
            }
            
            @media (min-width: 768px) {
                .text-md-left {
                    text-align: left;
                }
            }
            `}</style>
        </footer>
    );
};

export default Footer;
