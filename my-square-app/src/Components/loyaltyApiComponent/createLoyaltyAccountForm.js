// CreateLoyaltyAccountForm allows users to create a new loyalty account using a phone number and a loyalty program ID.
// Submits this information through the createLoyaltyAccount action and handles loading and error states.

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLoyaltyAccount } from '../../Actions/loyaltyApiAction/createLoyaltyAccountAction';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

const CreateLoyaltyAccountForm = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [programId, setProgramId] = useState('');

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.loyaltyAccountCreate);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createLoyaltyAccount({ mapping: { phone_number: phoneNumber }, program_id: programId }));
  };

  return (
    <Container>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <h2 className="text-center mb-4">Create Loyalty Account</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Enter phone number"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Program ID</Form.Label>
              <Form.Control
                type="text"
                value={programId}
                onChange={(e) => setProgramId(e.target.value)}
                placeholder="Enter program ID"
              />
            </Form.Group>
            <Button type="submit" variant="primary" className="w-100" disabled={loading}>
              Create Account
            </Button>
          </Form>
          {error && <div className="error">{error}</div>}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateLoyaltyAccountForm;
