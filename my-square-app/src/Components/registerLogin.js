import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { registerUser, loginUser } from '../Actions/registerLoginAction';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure this import is at the top level of your app, ideally in index.js

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
  const [error, setError] = useState(''); // Added error state for display purposes

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Reset error state on new submission
    setError('');

    if (isRegister) {
      // Here you would include validation and then dispatch or set error
      dispatch(registerUser({ ...formData, userType }));
    } else {
      // Here you would include validation and then dispatch or set error
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    }
  };

  return (
    <Container fluid className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <Row>
      <Col xs={12} md={8} lg={8} xl={12} className="mx-auto">
          <Form onSubmit={handleSubmit} className="border p-4 bg-white rounded-3 shadow">
            <Form.Group className="mb-3">
              <h1 className="text-center mb-4">{isRegister ? 'Create Account' : 'Sign In'}</h1>
              {error && <Alert variant="danger">{error}</Alert>} {/* Display error if exists */}
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
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="givenName" placeholder="First Name" required onChange={handleChange} />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control type="text" name="familyName" placeholder="Last Name" required onChange={handleChange} />
                </Form.Group>
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
              <Form.Control type="email" name="email" placeholder="Email" required onChange={handleChange} />
            </Form.Group>

            {isRegister && (
              <Form.Group className="mb-3">
                <Form.Control type="text" name="phoneNumber" placeholder="Phone Number" required onChange={handleChange} />
              </Form.Group>
            )}

            <Form.Group className="mb-3">
              <Form.Control type="password" name="password" placeholder="Password" required onChange={handleChange} />
            </Form.Group>

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
