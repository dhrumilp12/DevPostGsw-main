import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import {Container, Row, Col, Form, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { registerUser, loginUser } from '../../Actions/customerApisAction/registerLoginAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is at the top level of your app, ideally in index.js
import { useNavigate } from 'react-router-dom';

const RegisterLogin = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [userType, setUserType] = useState('buyer');
  const [formData, setFormData] = useState({
    givenName: '',
    familyName: '',
    companyName: '',
    email: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    locality: '',
    administrativeDistrictLevel1: '',
    postalCode: '',
    country: '',
    password: ''
  });
  
  const [backgroundImageIndex, setBackgroundImageIndex] = useState(0);
  const backgroundImageUrls = [
    "https://source.unsplash.com/random/1920x1080?concert",
    "https://source.unsplash.com/random/1920x1080?festival",
    "https://source.unsplash.com/random/1920x1080?live-music"
  ];
  const { error } = useSelector((state) => state.registerLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook
  const { isAuthenticated } = useSelector((state) => state.registerLogin);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirects to the homepage route after successful signup/login
    }
    const intervalId = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % backgroundImageUrls.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId);
  }, [isAuthenticated, navigate, backgroundImageUrls.length]);
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = isRegister ? registerUser : loginUser;
    dispatch(action(formData)).then(() => {
      if (isAuthenticated) navigate('/');
    }).catch((error) => {
      console.error("Login/Registration failed:", error);
    });
  };
  
  const renderTooltip = (message) => (
    <Tooltip>{message}</Tooltip>
  );

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("${backgroundImageUrls[backgroundImageIndex]}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
    <Row>
      <Col xs={12} md={8} lg={8} xl={12} className="mx-auto">
        <Form onSubmit={handleSubmit} className="p-4 rounded-3 shadow" style={{ backgroundColor: 'rgba(26,32,53, 0.8)' }}>
        <Form.Group className="mb-3">
          <h1 className="text-center mb-4 text-white">{isRegister ? 'Create Account' : 'Sign In'}</h1>
          {error && <Alert variant="danger">{error}</Alert>}
          </Form.Group>

            {isRegister && (
              <Form.Group className="mb-3">
                <Form.Select name="userType" value={userType} onChange={(e) => setUserType(e.target.value)} required>
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                </Form.Select>
              </Form.Group>
            )}

            {userType === 'buyer' && isRegister && (
              <>
                <OverlayTrigger placement="right" overlay={renderTooltip("Please enter your first name")}>
              <Form.Group className="mb-3">
                <Form.Control type="text" name="givenName" placeholder="First Name" required onChange={handleChange} />
              </Form.Group>
            </OverlayTrigger>

               <OverlayTrigger placement="right" overlay={renderTooltip("Please enter your last name")}>
              <Form.Group className="mb-3">
                <Form.Control type="text" name="familyName" placeholder="Last Name" required onChange={handleChange} />
              </Form.Group>
            </OverlayTrigger>
              </>
            )}

            {userType === 'seller' && isRegister && (
              <>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="companyName" placeholder="Company Name" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="addressLine1" placeholder="Address Line 1" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="addressLine2" placeholder="Address Line 2" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="locality" placeholder="City" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="administrativeDistrictLevel1" placeholder="State/Province" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="country" placeholder="Country" onChange={handleChange} />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3">
              <Form.Control type="email" name="emailAddress" placeholder="Email" required onChange={handleChange} />
            </Form.Group>

            {isRegister && (
              <Form.Group className="mb-3">
                <Form.Control type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} />
              </Form.Group>
            )}

            <OverlayTrigger placement="right" overlay={renderTooltip("Create a secure password")}>
              <Form.Group className="mb-3">
                <Form.Control type="password" name="password" placeholder="Password" required onChange={handleChange} />
              </Form.Group>
            </OverlayTrigger>

            {!isRegister && (
              <Form.Group className="mb-3 text-center">
               
              </Form.Group>
            )}

            <Button variant="primary" type="submit" className="w-100 mb-3">
              {isRegister ? 'Sign Up' : 'Sign In'}
            </Button>

            <div className="text-center">
              <Button variant="link" onClick={() => setIsRegister(!isRegister)}>
                {isRegister ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterLogin;

