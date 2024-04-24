
import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector  } from 'react-redux';
import {Container, Row, Col, Form, Button, Alert, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { registerUser, loginUser } from '../../Actions/customerApisAction/registerLoginAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is at the top level of your app, ideally in index.js
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [passwordValid, setPasswordValid] = useState(false);
  const { error, isAuthenticated } = useSelector(state => state.registerLogin);
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const passwordRequirements = useMemo(() => [
    { label: 'At least 8 characters', met: formData.password.length >= 8 },
    { label: 'At least one uppercase letter', met: /[A-Z]/.test(formData.password) },
    { label: 'At least one lowercase letter', met: /[a-z]/.test(formData.password) },
    { label: 'At least one number', met: /[0-9]/.test(formData.password) },
    { label: 'At least one special character', met: /[!@#$%^&*]/.test(formData.password) }
  ], [formData.password]);
  
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Redirects to the homepage route after successful signup/login
    }
    const intervalId = setInterval(() => {
      setBackgroundImageIndex((prevIndex) => (prevIndex + 1) % backgroundImageUrls.length);
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(intervalId);
  }, [isAuthenticated, navigate, backgroundImageUrls.length]);
  
  useEffect(() => {
    const passwordRequirementsMet = passwordRequirements.every(req => req.met);
    setPasswordValid(passwordRequirementsMet);
  }, [passwordRequirements]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isRegister && !passwordValid) {
      toast.error("Please make sure all password requirements are met.");
      return;
    }
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


   // Render password requirements list
   const renderPasswordRequirements = () => (
    <ul className="list-unstyled">
      {passwordRequirements.map((requirement, index) => (
        <li key={index} className="d-flex align-items-center">
          {requirement.met ? <span className="me-2 text-success">&#10003;</span> : <span className="me-2 text-danger">x</span>}
          {requirement.label}
        </li>
      ))}
    </ul>
  );


  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center" style={{ backgroundImage: `url("${backgroundImageUrls[backgroundImageIndex]}")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <ToastContainer position="top-center" autoClose={5000} />
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

            {isRegister ? <Form.Group className="mb-3">
          <Form.Control type="password" name="password" placeholder="Password" required onChange={handleChange} />
          <div style={{ fontSize: '0.9em', color: '#6c757d', marginTop: '5px' }}>
          {renderPasswordRequirements()}
          </div>
           </Form.Group> : <Form.Control type="password" name="password" placeholder="Password" required onChange={handleChange} />}

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
